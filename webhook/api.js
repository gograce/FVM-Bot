const axios = require("axios");
const { SERVER_BASE_URL, SERVER_BASE_URL_GET } = require("./config");

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

const getReq = async () => {
	try {
		const response = await axios.get(SERVER_BASE_URL_GET, {
			headers: {
				accept: "text/plain",
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (err) {
		console.error(err.message);
	}
};

module.exports = {
	postCmd,
	getReq,
};
