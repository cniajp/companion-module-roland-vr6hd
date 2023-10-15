// Roland-P20HD

const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const constants = require('./src/constants')
const utils = require('./src/utils')

class vr6hdInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...constants,
			...utils
		})

		this.socket = undefined;

		this.INTERVAL = null; //used for polling device for feedbacks

		this.MODEL = '';
		this.VERSION = '';
	}

	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}

		if (this.INTERVAL !== undefined) {
			clearInterval(this.INTERVAL)
			delete this.INTERVAL
		}
	}

	async init(config) {
		this.updateStatus('connecting')
		this.configUpdated(config)
	}

	async configUpdated(config) {
		// polling is running and polling has been de-selected by config change
		if (this.INTERVAL !== undefined) {
			clearInterval(this.INTERVAL)
			delete this.INTERVAL
		}
		this.config = config
		
		this.initActions()
		this.initFeedbacks()
		this.initVariables()
		this.initPresets()

		this.init_tcp()
	}
	
}

runEntrypoint(vr6hdInstance, UpgradeScripts)
