module.exports = {
	// ##########################
	// #### Instance Actions ####
	// ##########################
	initActions: function () {
		let self = this;
		let actions = {};

		actions.run_macro = {
			name: 'Run Macro',
			options:
			[
				{
					type: 'number',
					label: 'Macro',
					id: 'macro',
					tooltip: '(1-100)',
					min: 1,
					max: 100,
					default: 1,
					step: 1,
					required: true,
					range: false
				}
			],
			callback: async function(action) {
				let options = action.options;
				let macro = options.macro;
				let macroZero = macro - 1;
				let value = macroZero.toString(16).padStart(2, '0').toUpperCase();

				let address = '500504';
				self.sendCommand(address, value);
			}
		}

		actions.input_assign = {
			name: 'Assign Input',
			options:
			[
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: self.CHOICES_INPUTS[0].id,
					choices: self.CHOICES_INPUTS
				},
				{
					type: 'dropdown',
					label: 'Input Type',
					id: 'assign',
					default: self.CHOICES_INPUTSASSIGN[0].id,
					choices: self.CHOICES_INPUTSASSIGN
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '00' + options.input.toString(16).padStart(2, '0').toUpperCase();
				let value = options.assign.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.output_assign = {
			name: 'Assign Output',
			options:
			[
				{
					type: 'dropdown',
					label: 'Output',
					id: 'output',
					default: self.CHOICES_OUTPUTS[0].id,
					choices: self.CHOICES_OUTPUTS
				},
				{
					type: 'dropdown',
					label: 'Type',
					id: 'assign',
					default: self.CHOICES_OUTPUTSASSIGN[0].id,
					choices: self.CHOICES_OUTPUTSASSIGN
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00';
				
				address += '00' + options.output.toString(16).padStart(2, '0').toUpperCase();

				let value = options.assign.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.aux_assign = {
			name: 'Assign Aux',
			options:
			[
				{
					type: 'dropdown',
					label: 'Input Type',
					id: 'assign',
					default: self.CHOICES_INPUTSAUXASSIGN[0].id,
					choices: self.CHOICES_INPUTSAUXASSIGN
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '00' + '11';

				let value = options.assign.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.pnpkey_enable = {
			name: 'PnP & Key Enable/Disable',
			options:
			[
				{
					type: 'dropdown',
					label: 'PnP/Key',
					id: 'pinp',
					default: self.CHOICES_PINPDSK[0].id,
					choices: self.CHOICES_PINPDSK
				},
				{
					type: 'dropdown',
					label: 'Enable/Disable',
					id: 'enable',
					default: 1,
					choices: [
						{ id: 0, label: 'Disable'},
						{ id: 1, label: 'Enable'}
					]
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '00' + options.pinp.toString(16).padStart(2, '0').toUpperCase();

				let value = options.enable.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.set_transition_type = {
			name: 'Set Transition Type',
			options:
			[
				{
					type: 'dropdown',
					label: 'Transition Type',
					id: 'type',
					default: self.CHOICES_TRANSITION_TYPES[0].id,
					choices: self.CHOICES_TRANSITION_TYPES
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '14' + '00';

				let value = options.type.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.set_mix_type = {
			name: 'Set Mix Type',
			options:
			[
				{
					type: 'dropdown',
					label: 'Mix Type',
					id: 'type',
					default: self.CHOICES_MIX_TYPES[0].id,
					choices: self.CHOICES_MIX_TYPES
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '14' + '01';

				let value = options.type.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.set_wipe_type = {
			name: 'Set Wipe Type',
			options:
			[
				{
					type: 'dropdown',
					label: 'Wipe Type',
					id: 'type',
					default: self.CHOICES_WIPE_TYPES[0].id,
					choices: self.CHOICES_WIPE_TYPES
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '14' + '03';

				let value = options.type.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.set_wipe_direction = {
			name: 'Set Wipe Direction',
			options:
			[
				{
					type: 'dropdown',
					label: 'Wipe Direction',
					id: 'direction',
					default: self.CHOICES_WIPE_DIRECTIONS[0].id,
					choices: self.CHOICES_WIPE_DIRECTIONS
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '14' + '05';

				let value = options.direction.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		/*actions.press_and_release_switch = {
			label: 'Press and Release Panel Switch',
			options:
			[
				{
					type: 'dropdown',
					label: 'Switch',
					id: 'switch',
					default: self.CHOICES_SWITCHES[0].id,
					choices: self.CHOICES_SWITCHES
				}
			],
			callback: async function(action) {
				let options = action.options;
				self.sendCommand(options.switch, '01');
				setTimeout(function() {
					self.sendCommand(options.switch, '00');
				}, 200);
			}
		};

		actions.press_switch = {
			label: 'Press Panel Switch (Don\'t Release)',
			options:
			[
				{
					type: 'dropdown',
					label: 'Switch',
					id: 'switch',
					default: self.CHOICES_SWITCHES[0].id,
					choices: self.CHOICES_SWITCHES
				}
			],
			callback: async function(action) {
				let options = action.options;
				self.sendCommand(options.switch, '01');
			}
		};

		actions.release_switch = {
			label: 'Release Panel Switch',
			options:
			[
				{
					type: 'dropdown',
					label: 'Switch',
					id: 'switch',
					default: self.CHOICES_SWITCHES[0].id,
					choices: self.CHOICES_SWITCHES
				}
			],
			callback: async function(action) {
				let options = action.options;
				self.sendCommand(options.switch, '00');
			}
		};*/

		actions.set_pinp_source = {
			name: 'Set PnP & Key Source',
			options:
			[
				{
					type: 'dropdown',
					label: 'PnP/Key',
					id: 'pinp',
					default: self.CHOICES_PINP_KEYS[0].id,
					choices: self.CHOICES_PINP_KEYS
				},
				{
					type: 'dropdown',
					label: 'Input Type',
					id: 'assign',
					default: self.CHOICES_PINP_KEYS_INPUTSASSIGN[0].id,
					choices: self.CHOICES_PINP_KEYS_INPUTSASSIGN
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.pinp.toString(16).padStart(2, '0').toUpperCase() + '03';
				let value = options.assign.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.set_pinp_type = {
			name: 'Set PnP & Key Type',
			options:
			[
				{
					type: 'dropdown',
					label: 'PnP/Key',
					id: 'pinp',
					default: self.CHOICES_PINP_KEYS[0].id,
					choices: self.CHOICES_PINP_KEYS
				},
				{
					type: 'dropdown',
					label: 'Key Type',
					id: 'key',
					default: self.CHOICES_PINP_TYPES[0].id,
					choices: self.CHOICES_PINP_TYPES
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.pinp.toString(16).padStart(2, '0').toUpperCase() + '04';
				let value = options.key.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.set_dsk_key_source = {
			name: 'Set DSK Key Source',
			options:
			[
				{
					type: 'dropdown',
					label: 'DSK',
					id: 'dsk',
					default: self.CHOICES_DSK[0].id,
					choices: self.CHOICES_DSK
				},
				{
					type: 'dropdown',
					label: 'Input Type',
					id: 'assign',
					default: self.CHOICES_PINP_KEYS_INPUTSASSIGN[0].id,
					choices: self.CHOICES_PINP_KEYS_INPUTSASSIGN
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.dsk.toString(16).padStart(2, '0').toUpperCase() + '04';
				let value = options.assign.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.set_dsk_fill_source = {
			name: 'Set DSK Fill Source',
			options:
			[
				{
					type: 'dropdown',
					label: 'DSK',
					id: 'dsk',
					default: self.CHOICES_DSK[0].id,
					choices: self.CHOICES_DSK
				},
				{
					type: 'dropdown',
					label: 'Input Type',
					id: 'assign',
					default: self.CHOICES_PINP_KEYS_INPUTSASSIGN[0].id,
					choices: self.CHOICES_PINP_KEYS_INPUTSASSIGN
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.dsk.toString(16).padStart(2, '0').toUpperCase() + '05';
				let value = options.assign.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.set_dsk_type = {
			name: 'Set DSK Key Type',
			options:
			[
				{
					type: 'dropdown',
					label: 'DSK',
					id: 'dsk',
					default: self.CHOICES_DSK[0].id,
					choices: self.CHOICES_DSK
				},
				{
					type: 'dropdown',
					label: 'Key Type',
					id: 'key',
					default: self.CHOICES_DSK_TYPES[0].id,
					choices: self.CHOICES_DSK_TYPES
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.dsk.toString(16).padStart(2, '0').toUpperCase() + '06';
				let value = options.key.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.select_pgm = {
			name: 'Select PGM Source',
			options:
			[
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: self.CHOICES_PINP_KEYS_INPUTSASSIGN[0].id,
					choices: self.CHOICES_PINP_KEYS_INPUTSASSIGN
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '1B' + '00';
				let value = options.input.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.select_pvw = {
			name: 'Select PVW Source',
			options:
			[
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: self.CHOICES_PINP_KEYS_INPUTSASSIGN[0].id,
					choices: self.CHOICES_PINP_KEYS_INPUTSASSIGN
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + '1B' + '01';
				let value = options.input.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.load_memory_trigger = {
			name: 'Load Memory Trigger',
			options:
			[
				{
					type: 'dropdown',
					label: 'Memory',
					id: 'memory',
					default: self.CHOICES_MEMORY[0].id,
					choices: self.CHOICES_MEMORY
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '0A' + '00' + '00';
				let value = options.memory.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.save_memory_trigger = {
			name: 'Save Memory Trigger',
			options:
			[
				{
					type: 'dropdown',
					label: 'Memory',
					id: 'memory',
					default: self.CHOICES_MEMORY[0].id,
					choices: self.CHOICES_MEMORY
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '0A' + '00' + '01';
				let value = options.memory.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.initialize_memory_trigger = {
			name: 'Initialize Memory Trigger',
			options:
			[
				{
					type: 'dropdown',
					label: 'Memory',
					id: 'memory',
					default: self.CHOICES_MEMORY[0].id,
					choices: self.CHOICES_MEMORY
				}
			],
			callback: async function(action) {
				let options = action.options;
				let address = '0A' + '00' + '02';
				let value = options.memory.toString(16).padStart(2, '0').toUpperCase();
				self.sendCommand(address, value);
			}
		};

		actions.camera_control_pan = {
			name: 'Camera Control - Pan',
			options:
			[
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: self.CHOICES_CAMERAS[0].id,
					choices: self.CHOICES_CAMERAS
				},
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'direction',
					default: self.CHOICES_CAMERA_PAN[0].id,
					choices: self.CHOICES_CAMERA_PAN
				},
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.camera + '22';
				let value = options.direction;
				self.sendCommand(address, value);
			}
		};

		actions.camera_control_tilt = {
			name: 'Camera Control - Tilt',
			options:
			[
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: self.CHOICES_CAMERAS[0].id,
					choices: self.CHOICES_CAMERAS
				},
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'direction',
					default: self.CHOICES_CAMERA_TILT[0].id,
					choices: self.CHOICES_CAMERA_TILT
				},
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.camera + '23';
				let value = options.direction;
				self.sendCommand(address, value);
			}
		};

		actions.camera_control_pt_speed = {
			name: 'Camera Control - Pan/Tilt Speed',
			options:
			[
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: self.CHOICES_CAMERAS[0].id,
					choices: self.CHOICES_CAMERAS
				},
				{
					type: 'dropdown',
					label: 'Speed',
					id: 'speed',
					default: self.CHOICES_CAMERA_PAN_TILT_SPEED[0].id,
					choices: self.CHOICES_CAMERA_PAN_TILT_SPEED
				},
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.camera + '24';
				let value = options.speed;
				self.sendCommand(address, value);
			}
		};

		actions.camera_control_zoom = {
			name: 'Camera Control - Zoom',
			options:
			[
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: self.CHOICES_CAMERAS[0].id,
					choices: self.CHOICES_CAMERAS
				},
				{
					type: 'dropdown',
					label: 'Zoom',
					id: 'zoom',
					default: self.CHOICES_CAMERA_ZOOM[0].id,
					choices: self.CHOICES_CAMERA_ZOOM
				},
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.camera + '25';
				let value = options.zoom;
				self.sendCommand(address, value);
			}
		};

		actions.camera_control_focus = {
			name: 'Camera Control - Focus',
			options:
			[
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: self.CHOICES_CAMERAS[0].id,
					choices: self.CHOICES_CAMERAS
				},
				{
					type: 'dropdown',
					label: 'Focus',
					id: 'focus',
					default: self.CHOICES_CAMERA_FOCUS[0].id,
					choices: self.CHOICES_CAMERA_FOCUS
				},
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.camera + '26';
				let value = options.focus;
				self.sendCommand(address, value);
			}
		};

		actions.camera_control_autofocus = {
			name: 'Camera Control - Auto Focus',
			options:
			[
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: self.CHOICES_CAMERAS[0].id,
					choices: self.CHOICES_CAMERAS
				},
				{
					type: 'dropdown',
					label: 'Auto Focus',
					id: 'autofocus',
					default: '00',
					choices: [
						{ id: '00', label: 'Off'},
						{ id: '01', label: 'On'}
					]
				},
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.camera + '27';
				let value = options.autofocus;
				self.sendCommand(address, value);
			}
		};

		actions.camera_control_exposure = {
			name: 'Camera Control - Exposure',
			options:
			[
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: self.CHOICES_CAMERAS[0].id,
					choices: self.CHOICES_CAMERAS
				},
				{
					type: 'dropdown',
					label: 'Exposure',
					id: 'exposure',
					default: self.CHOICES_CAMERA_EXPOSURE[0].id,
					choices: self.CHOICES_CAMERA_EXPOSURE
				},
			],
			callback: async function(action) {
				let options = action.options;
				let address = '00' + options.camera + '28';
				let value = options.exposure;
				self.sendCommand(address, value);
			}
		};

		this.setActionDefinitions(actions);
	}
}