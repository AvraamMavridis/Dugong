module.exports = {
	extends: [ 'avraam', 'plugin:react/recommended' ],
	globals: {
		React: false,
		ReactDOM: false
	},
	rules: {
		'class-methods-use-this': 0,
		'consistent-return': 0,
		'no-return-assign': 0,
        'max-len': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-void': 0,
        'no-shadow': 0,
	}
};