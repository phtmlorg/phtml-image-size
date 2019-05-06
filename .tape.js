module.exports = {
	'basic': {
		message: 'supports basic usage'
	},
	'basic:size:auto': {
		message: 'supports { size: "auto" } usage',
		options: {
			size: 'auto'
		},
		expect: 'basic.expect.html'
	},
	'basic:size:intrinsic': {
		message: 'supports { size: "intrinsic" } usage',
		options: {
			size: 'intrinsic'
		}
	},
	'basic:size:remove': {
		message: 'supports { size: "remove" } usage',
		options: {
			size: 'remove'
		}
	},
	'basic:intrinsicsize:auto': {
		message: 'supports { intrinsicsize: "auto" } usage',
		options: {
			intrinsicsize: 'auto'
		},
		expect: 'basic.expect.html'
	},
	'basic:intrinsicsize:ignore': {
		message: 'supports { intrinsicsize: "ignore" } usage',
		options: {
			intrinsicsize: 'ignore'
		}
	},
	'basic:path': {
		message: 'supports { path: "subdir" } usage',
		options: {
			path: './test/subdir'
		}
	}
};
