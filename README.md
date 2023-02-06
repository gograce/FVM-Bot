<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://storage.googleapis.com/ethglobal-api-production/projects%2F23bdw%2Fimages%2FScreenshot%202023-02-06%20at%2012.31.39%20AM.png" alt="Logo" width="80" height="120">
  </a>

  <h3 align="center">FVM Bot</h3>

  <p align="center">
    <a href="https://fvm-bot-frontend-44feb6.spheron.app/">View Demo</a>
    ·
    <a href="https://github.com/gograce/FVM-Bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/gograce/FVM-Bot/issues">Request Feature</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project
FVM Bot is a simple chat Bot built on top of Filecoin HyperSpace Network which uses Filecoin RPC Providers (glif) and Zondax API under the hood and uses PUSH Chat for accessing the bot in a decentralized manner.

The project is split into 3 main parts

Backend Server - Built using bulletproof Nodejs using typescript. The role of the backend server is to define various bot commands such as /latestBlock - To get latest Block of the HyperSpace Network or /accTx - To get all the transactions of an Fil Account or /ethToFil - To convert a eth address to its corresponding FIL address etc. The backend server uses rpc providers (glif) and Zondax APIs to fulfil these command requests.

WebHook - The webhook is the key element which connects to the PUSH CHAT sockets and keeps on listening for the chat / intents coming to the BOT_ADDRESS. As soon as any chat is detected it is decrypted and the msg is sent to backend server for getting the result for this chat. The webhook then gets the result of this msg/command from backend, encrypts it and push it to PUSH CHAT.

Frontend - A simple react frontend is also created with uses PUSH CHAT UI to demonstrate the working of the bot. Pls note that this bot can be interacted from any frontend with uses PUSH Chat.



## Built With
Backend Server - The is a nodeJS server built using Typescript. The api endpoints are created using express. The server utilize the Filecoin HyperSpace RPC (glif & chainStack) and Zondax Beryx API for fulfilling various requests. Zondax apis made it very easy to get data related to accounts & other functionalities which are not present in the RPCs. Also the Hyperspace RPCs being evm compatible were similar to any other rpc and very easy to integrate.

Webhook - This is a simple webhook built using JavaScript which utilize the PUSH CHAT sdk. It connects to the PUSH CHAT sockets using socket.io and listen to the chats received on the BOT_ADDRESS. While implementing this sdk and encrypting/decrypting chat messages with pgpKeys we realized that PUSH CHAT is super secure and is one of the easiest way to enable decentralized communication. We also utlilized some of the common web3 libraries such as Crypto-JS, @metamask/eth-sig-util etc.

Frontend - This is a simple 1 page web page built using ReactJs and deployed on Spheron Network enabling decentralized deployment. This frontend allows to connect to a web3 wallet using metamask / rainbow / wallet Connect / Coinbase Wallet. It also uses PUSH UI WEB for interacting with PUSH CHAT


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


<!-- Made By -->
## Made By
This project is made as a part of <a href="https://ethglobal.com/events/spacewarp">FVM SpaceWarp Hackathon</a> by <a href="https://github.com/gograce">Grace</a> & <a href="https://github.com/0xAnonAssassin">0xAnonAssassin</a>
