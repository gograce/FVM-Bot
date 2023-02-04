import * as mmSDK from '@metamask/eth-sig-util'
import * as PushAPI from "@pushprotocol/restapi";
import config from "../config";
import Logger from '../loaders/logger';
import { Container } from 'typedi';
import QueryService from '../services/query';

/**
 * 
 * @returns bot's pgp private key
 */
export const getPgpKey = async () => {
	try {
		const user = await PushAPI.user.get({
			account: config.botAddr,
			env: "prod",
		});
		const decryptedPvtKey = mmSDK.decrypt({
			encryptedData: JSON.parse(user.encryptedPrivateKey),
			privateKey: config.botAccPvtKey,
		});
		return decryptedPvtKey;
	} catch (err) {
		console.log(err);
	}
};

/**
 * 
 * @param requests 
 * @returns requests array of raw addresses
 */
export const getRequestsAddrArray = (requests: { fromDID: any; }[]) => {
	try {
		const simplifiedReq = requests.map((obj: { fromDID: any; }) => obj.fromDID);
		return simplifiedReq;
	} catch (err) {
		Logger.error(err);
	}
};

export const sendMsg = (msg: string, receiver: any, pvtKey: any) => {
	try {
		PushAPI.chat.send({
			messageContent: msg,
			receiverAddress: receiver,
			account: config.botAddr,
			pgpPrivateKey: pvtKey,
			apiKey: process.env.PUSH_CHAT_API_KEY,
			env: "prod",
		});
	} catch (err) {
		Logger.error(err);
	}
};

export const approveAndSendIntroMsg = async (chatMsg: { fromDID: any; }, pvtKey: any) => {
	try {
        const queryInstance:any = Container.get(QueryService);
        const res = await queryInstance.solveQuery('/intro');
		PushAPI.chat.approve({
			account: config.botAddr,
			senderAddress: chatMsg.fromDID,
		});
		sendMsg(res.result, chatMsg.fromDID, pvtKey);
	} catch (err) {
		Logger.error(err);
	}
};

export const fetchResAndSend = async (chatMsg: { fromDID: any; }, msgContent: any, pvtKey: any) => {
	try {
        const queryInstance:any = Container.get(QueryService);
        const resultFromServer = await queryInstance.solveQuery(msgContent);
		let messageContent = "";
		if (resultFromServer.success) {
			messageContent = resultFromServer.result;
		} else {
			messageContent = resultFromServer.err;
		}
		sendMsg(messageContent, chatMsg.fromDID, pvtKey);
	} catch (err) {
		Logger.error(err);
	}
};

