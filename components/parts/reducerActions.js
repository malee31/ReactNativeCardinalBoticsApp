export const setErrorMessage = msg => {
	return {
		type: 'ERROR_MESSAGE',
		msg
	}
};

export const dismissError = () => {
	return {
		type: 'ERROR_DISMISS'
	};
}