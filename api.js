const axios = require("axios");
const { SERVER_BASE_URL } = require("./config");

const postCmd = async (commandMsg) => {
	try {
		const response = await axios.post(SERVER_BASE_URL, {
			command: commandMsg,
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	postCmd,
};
