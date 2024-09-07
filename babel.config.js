module.exports = function(api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			// Note: Setup instructions say to keep this as the last plugin
			"react-native-reanimated/plugin"
		],
		env: {
			production: {
				plugins: [
					"react-native-paper/babel",
					// In case web support fails: https://docs.expo.dev/versions/latest/sdk/reanimated/#web-support
					// Note: Setup instructions say to keep this as the last plugin
					"react-native-reanimated/plugin"
				],
			},
		},
	};
};