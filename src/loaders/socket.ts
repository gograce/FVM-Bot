import { io } from 'socket.io-client';
import * as PushAPI from '@pushprotocol/restapi';
import { getPgpKey, getRequestsAddrArray, approveAndSendIntroMsg, fetchResAndSend } from '../helpers/chat';
import config from '../config';
import { decryptConversation } from '../helpers/crypto';

const botAddr = config.botAddr;

export default async () => {
  try {
    let pvtKey = await getPgpKey();
    let chatUser = await PushAPI.user.get({
      account: '0x7B2880C0aC607cFea7cE67DAb0F8f562Cee73f76',
      env: 'prod',
    });
    const socket = io('https://backend.epns.io', {
      query: {
        did: `eip155:${botAddr}`,
        mode: 'chat',
      },
      autoConnect: true,
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
    });

    socket.on('connect', async () => {
      console.log(socket.connected); // true
    });

    socket.on('CHATS', async (chat) => {
      try {
        if (pvtKey === '') {
          pvtKey = await getPgpKey();
        }
        if (Object.keys(chatUser).length == 0) {
          chatUser = await PushAPI.user.get({
            account: botAddr,
            env: 'prod',
          });
        }

        const responseReqs = await PushAPI.chat.requests({
          pgpPrivateKey: pvtKey,
          account: botAddr,
          env: 'prod',
        });
        const reqsArray: any = getRequestsAddrArray(responseReqs);
        if (reqsArray.length > 0 && reqsArray.includes(chat.fromDID)) {
          await approveAndSendIntroMsg(chat, pvtKey);
        } else {
          const response = await decryptConversation({
            messages: [chat],
            connectedUser: chatUser,
            pgpPrivateKey: pvtKey,
            env: 'prod',
          });
          fetchResAndSend(chat, response[0].messageContent, pvtKey);
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('disconnect', (reason) => {
      console.log(reason);
      // if (reason === "io server disconnect") {
      setTimeout(() => {
        socket.connect();
      }, 1000);
      // }
    });

    socket.on('connect_error', () => {
      console.log('connect_error');
      socket.io.opts.transports = ['polling', 'websocket'];
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });
  } catch (err) {
    console.log(err);
  }
};
