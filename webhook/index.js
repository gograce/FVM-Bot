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
const { getReq } = require("./api");

const app = express();

// Create GET request
app.get("/", async (req, res) => {
	try {
		// const response = await postCmd("/intro");
		console.log("got it");
		res.status(200).send("fuck you");
	} catch (err) {
		console.log(err.message);
		res.status(200).send("fuck");
	}
});

// Initialize server
app.listen(5000, () => {
	console.log("Running on port 5000.");
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
			setInterval(async () => {
				const response = await getReq();
				console.log("ping sent");
			}, 60000);

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
					if (
						reqsArray.length > 0 &&
						reqsArray.includes(chat.fromDID)
					) {
						await approveAndSendIntroMsg(chat, pvtKey);
					} else {
						const response = await decryptConversation({
							messages: [chat],
							connectedUser: chatUser,
							pgpPrivateKey: pvtKey,
							env: "prod",
						});
						fetchResAndSend(
							chat,
							response[0].messageContent,
							pvtKey
						);
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
});

module.exports = app;
