const { combineRgb } = require('@companion-module/base')

module.exports = {
	// ##########################
	// #### Define Feedbacks ####
	// ##########################
	initFeedbacks: function () {
		let self = this;
		let feedbacks = {};

		const foregroundColor = combineRgb(255, 255, 255) // White
		const backgroundColorRed = combineRgb(255, 0, 0) // Red
		const backgroundColorGreen = combineRgb(0, 255, 0) // Green
		const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

		/*feedbacks.tally = {
			type: 'boolean',
			label: 'Tally State',
			description: 'Indicate if Input Channel is in Preview or Program',
			style: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: self.TALLYDATA[0].id,
					choices: self.TALLYDATA
				},
				{
					type: 'dropdown',
					label: 'Indicate in X State',
					id: 'state',
					default: 'program',
					choices: [
						{ id: 'preview', label: 'Preview' },
						{ id: 'program', label: 'Program' }
					]
				}
			],
			callback: function (feedback, bank) {
				let opt = feedback.options;

				let tallyObj = self.TALLYDATA.find((obj) => obj.id == opt.input);

				if (tallyObj) {
					if ((tallyObj.status == 1 || tallyObj.status == 3) && opt.state == 'program') {
						return true;
					}

					if (tallyObj.status == 2 && opt.state == 'preview') {
						return true;
					}
				}

				return false
			}
		}*/

		this.setFeedbackDefinitions(feedbacks);
	}
}
