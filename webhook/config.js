const botAddr = "0x7B2880C0aC607cFea7cE67DAb0F8f562Cee73f76";

// must be botAddr's key (bot's key)
const botAccPvtKey = process.env.PRIVATE_KEY;

const SERVER_BASE_URL = "https://bot-gograce.vercel.app/api";

const SERVER_BASE_URL_GET = "https://bot-gograce.vercel.app";

module.exports = {
	botAddr,
	botAccPvtKey,
	SERVER_BASE_URL,
	SERVER_BASE_URL_GET,
};
