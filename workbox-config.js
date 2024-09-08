module.exports = {
	globDirectory: 'web-build/',
	globPatterns: [
		'**/*.{js,html,png,ico,json}'
	],
	swDest: 'web-build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};