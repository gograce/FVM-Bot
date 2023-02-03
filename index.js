require("dotenv").config();
const { io } = require("socket.io-client");
const PushAPI = require("@pushprotocol/restapi");
const {
	getPgpKey,
	getRequestsAddrArray,
	approveAndSendIntroMsg,
	fetchResAndSend,
} = require("./helpers");
const { botAddr } = require("./config");
const { decryptConversation } = require("./decrypt");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("Express on Vercel");
});

app.listen(5000, () => {
	console.log("Running on port 5000.");
});

let pvtKey = "",
	chatUser = {};
(async function () {
	pvtKey = await getPgpKey();
	chatUser = await PushAPI.user.get({
		account: botAddr,
		env: "prod",
	});
})();

const main = () => {
	try {
		const socket = io("https://backend.epns.io", {
			query: {
				did: `eip155:${botAddr}`,
				mode: "chat",
			},
			autoConnect: true,
			transports: ["websocket", "polling"],
			reconnectionAttempts: 5,
		});

		socket.on("connect", async () => {
			console.log(socket.connected); // true
		});

		socket.on("CHATS", async (chat) => {
			try {
				if (pvtKey === "") {
					pvtKey = await getPgpKey();
				}
				if (Object.keys(chatUser).length == 0) {
					chatUser = await PushAPI.user.get({
						account: botAddr,
						env: "prod",
					});
				}

				const responseReqs = await PushAPI.chat.requests({
					pgpPrivateKey: pvtKey,
					account: botAddr,
					env: "prod",
				});
				const reqsArray = getRequestsAddrArray(responseReqs);
				if (reqsArray.length > 0 && reqsArray.includes(chat.fromDID)) {
					await approveAndSendIntroMsg(chat, pvtKey);
				} else {
					const response = await decryptConversation({
						messages: [chat],
						connectedUser: chatUser,
						pgpPrivateKey: pvtKey,
						env: "prod",
					});
					fetchResAndSend(chat, response[0].messageContent, pvtKey);
				}
			} catch (err) {
				console.log(err.message);
			}
		});

		socket.on("disconnect", (reason) => {
			console.log(reason);
			// if (reason === "io server disconnect") {
			setTimeout(() => {
				socket.connect();
			}, 1000);
			// }
		});

		socket.on("connect_error", () => {
			console.log("connect_error");
			socket.io.opts.transports = ["polling", "websocket"];
			setTimeout(() => {
				socket.connect();
			}, 1000);
		});
	} catch (err) {
		console.log(err);
	}
};

main();

// Export the Express API
module.exports = app;
