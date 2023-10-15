const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls a Roland VR-6HD',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 6,
				default: '192.168.0.1',
				regex: Regex.IP
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				width: 6,
				default: '0000'
			},
			/*{
				type: 'number',
				id: 'poll_interval',
				label: 'Polling Interval (ms), set to 0 to disable polling',
				min: 50,
				max: 30000,
				default: 1000,
				width: 3,
			}*/
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			},
			{
				type: 'static-text',
				id: 'info3',
				width: 12,
				label: ' ',
				value: `
				<div class="alert alert-info">
					<div>
						Enabling Verbose Logging will push all incoming and outgoing data to the log, which is helpful for debugging.
					</div>
				</div>
				`,
				isVisible: (configValues) => configValues.verbose === true,
			},
		]
	}
}