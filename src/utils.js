const { InstanceStatus, TCPHelper } = require('@companion-module/base')

module.exports = {
	init_tcp: function() {
		let self = this;

		if (self.socket !== undefined) {
			self.socket.destroy();
			delete self.socket;
		}
	
		if (self.config.port === undefined) {
			self.config.port = 8023;
		}
	
		if (self.config.host) {
			self.log('info', `Opening connection to ${self.config.host}:${self.config.port}`);
	
			self.socket = new TCPHelper(self.config.host, self.config.port);
	
			self.socket.on('error', function (err) {
				if (self.config.verbose) {
					self.log('warn', 'Error: ' + err);
				}
	
				clearInterval(self.INTERVAL);
				self.handleError(err);
			});
	
			self.socket.on('connect', function () {
				self.updateStatus(InstanceStatus.Ok);
			});
	
			self.socket.on('data', function(buffer) {
				let indata = buffer.toString('utf8');
	
				//update feedbacks and variables
				self.updateData(indata);
			});
	
		}
	},
	
	handleError: function(err) {
		let self = this;
	
		let error = err.toString();
		let printedError = false;
	
		Object.keys(err).forEach(function(key) {
			if (key === 'code') {
				if (err[key] === 'ECONNREFUSED') {
					error = 'Unable to communicate with Device. Connection refused. Is this the right IP address? Is it still online?';
					self.log('error', error);
					self.updateStatus(InstanceStatus.Error);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
				else if (err[key] === 'ETIMEDOUT') {
					error = 'Unable to communicate with Device. Connection timed out. Is this the right IP address? Is it still online?';
					self.log('error', error);
					self.updateStatus(InstanceStatus.Error);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
				else if (err[key] === 'ECONNRESET') {
					error = 'The connection was reset. Check the log for more error information.';
					self.log('error', error);
					self.updateStatus(InstanceStatus.Error);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
			}
		});
	
		if (!printedError) {
			self.log('error', `Error: ${error}`);
		}
	},

	sendCommand: function(address, value) {
		let self = this;
	
		let cmd = 'DTH:' + address + ',' + value + ';\n';
		self.sendRawCommand(cmd);
	},
	
	requestData: function(command) {
		let self = this;
	
		let cmd = 'RQH:' + command + ';\n';
		self.sendRawCommand(cmd);
	},
	
	sendRawCommand: function(command) {
		let self = this;
	
		if (!command.indexOf(';')) {
			command = command + ';';
		}
	
		let cmd = command + '\n';
	
		if (self.config.verbose) {
			self.log('debug', 'Sending: ' + cmd);
		}
		
		if (self.socket !== undefined && self.socket.isConnected) {	
			self.socket.send(cmd);
		}
		else {
			if (self.config.verbose) {
				self.log('warn', 'Unable to send: Socket not connected.');
			}
		}
	},

	updateData: function(data) {
		let self = this;
	
		if (self.config.verbose) {
			self.log('debug', data);
		}
	
		if(data.trim() =='Enter password:') {
			self.updateStatus(InstanceStatus.UnknownWarning, 'Authenticating');
			self.log('info', 'Sending passcode: ' + self.config.password);
			self.socket.send(self.config.password + '\n');
		}
		else if (data.trim() == 'Welcome to VR-6HD.') {
			self.updateStatus(InstanceStatus.Ok);
			self.log('info', 'Authenticated.');
			self.sendRawCommand('VER'); //request version info
			//self.startInterval(); //request tally states
			//self.subscribeToTally(); //request tally changes
		}
		else if (data.trim() == 'ERR:0;') {
			//an error with something that it received
		}
		else {
			//do stuff with the data
			try {
				if (data.indexOf(';')) {
					let dataGroups = data.trim().split(';');
	
					for (let j = 0; j < dataGroups.length; j++) {
						dataGroups[j] = dataGroups[j].trim();
						if (dataGroups[j] !== 'ACK' && dataGroups[j] !== '') {
							let dataSet = dataGroups[j].trim().split(':');
							if (Array.isArray(dataSet)) {
								let dataPrefix = '';
								
								if (dataSet[0] !== undefined) {
									dataPrefix = dataSet[0].toString().trim();
								}
	
								let dataSuffix = '';
								
								if (dataSet.length > 1) {
									if (dataSet[1].toString().indexOf(',')) {
										dataSuffix = dataSet[1].toString().split(',');
	
										if (dataPrefix.indexOf('VER') > -1) {
											self.MODEL = dataSuffix[0].toString();
											self.VERSION = dataSuffix[1].toString();
										}
						
										if (dataPrefix.indexOf('DTH') > -1) {
											if (dataSuffix[0].length === 6) {
												let params = dataSuffix[0];
												let param1 = params[0] + params[1];
												let param2 = params[2] + params[3];
												let param3 = params[4] + params[5];
				
												let value = dataSuffix[1];
						
												/*if (param1 == '0C' && param2 == '00') { //tally message
													self.updateTally(param3, value);
												}*/
	
												if (param1 == '0C' && param2 == '00' && param3 == '00') { //subscribe tally message
													let index = 0;
													let halfLength = value.length / 2;
													for (let t = 0; t < halfLength; t++) {
														let input = halfLength - (halfLength - t)
														  input = input.toString(16).padStart(2, '0').toUpperCase();
	
														let tallyState = value[index] + value[index + 1];
														tallyState = tallyState.toString(16).padStart(2, '0').toUpperCase();
	
														self.updateTally(input, tallyState);
	
														index = index + 2;
													}
												}
											}
										}
									}
								}
								else {
									//likely just ERR:0;
								}						
							}
						}
					}
				
					//now update feedbacks and variables
					self.checkFeedbacks();
					self.checkVariables();
				}
			}
			catch(error) {
				self.log('error', 'Error parsing incoming data: ' + error);
				self.log('error', 'Data: ' + data);
			}
		}
	}
}