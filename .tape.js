module.exports = {
	'basic': {
		message: 'supports basic usage'
	},
	'basic:override': {
		message: 'supports { override: true } usage',
		options: {
			override: true
		}
	},
	'basic:override:auto': {
		message: 'supports { override: "auto" } usage',
		options: {
			override: 'auto'
		}
	}
};
