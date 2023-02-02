const mmSDK = require("@metamask/eth-sig-util");
const PushAPI = require("@pushprotocol/restapi");
const { postCmd } = require("./api");
const { botAddr, botAccPvtKey } = require("./config");

// return botAddr's pgp key (bot's key)
const getPgpKey = async () => {
	try {
		const user = await PushAPI.user.get({
			account: botAddr,
			env: "prod",
		});
		console.log(botAccPvtKey);
		const decryptedPvtKey = mmSDK.decrypt({
			encryptedData: JSON.parse(user.encryptedPrivateKey),
			privateKey: botAccPvtKey,
		});
		return decryptedPvtKey;
	} catch (err) {
		console.log(err.message);
	}
};

// return requests array of raw addresses
const getRequestsAddrArray = (requests) => {
	try {
		const simplifiedReq = requests.map((obj) => obj.fromDID);
		return simplifiedReq;
	} catch (err) {
		console.log(err.message);
	}
};

const sendMsg = (msg, receiver, pvtKey) => {
	try {
		PushAPI.chat.send({
			messageContent: msg,
			receiverAddress: receiver,
			account: botAddr,
			pgpPrivateKey: pvtKey,
			apiKey: process.env.PUSH_CHAT_API_KEY,
			env: "prod",
		});
	} catch (err) {
		console.log(err.message);
	}
};

const approveAndSendIntroMsg = async (chatMsg, pvtKey) => {
	try {
		const res = await postCmd("/intro");
		PushAPI.chat.approve({
			account: botAddr,
			senderAddress: chatMsg.fromDID,
		});
		sendMsg(res.result, chatMsg.fromDID, pvtKey);
	} catch (err) {
		console.log(err.message);
	}
};

const fetchResAndSend = async (chatMsg, msgContent, pvtKey) => {
	try {
		const resultFromServer = await postCmd(msgContent);
		let messageContent = "";
		if (resultFromServer.success) {
			messageContent = resultFromServer.result;
		} else {
			messageContent = resultFromServer.err;
		}
		sendMsg(messageContent, chatMsg.fromDID, pvtKey);
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = {
	getPgpKey,
	getRequestsAddrArray,
	approveAndSendIntroMsg,
	sendMsg,
	fetchResAndSend,
};
