import React from "react";
import { Chat } from "@pushprotocol/uiweb";
import { useAccount } from "wagmi";
import { BOT_ADDRESS, PLACEHOLDER_ACCOUNT, PUSH_API_KEY } from "../../config";

function Home() {
	const { address } = useAccount();
	return (
		<div>
			<div className="max-w-screen-xl py-10 sm:py-12 px-5 sm:px-8 m-auto flex flex-col">
				<div className="flex justify-between max-[900px]:flex-col">
					<img src="fvmbot.png" className="h-[41rem] w-[29rem]" />
					<div className="max-w-[44.5rem] bg-[#474B4F] w-full ml-4 rounded-xl border border-[#23263b] drop-shadow-lg px-8 py-12">
						<div className="text-4xl font-medium text-white pb-5">
							FVM Bot
						</div>
						<div className="text-xl font-bold text-[#99A0AA] pb-10">
							Bot Address:{" "}
							<span className="text-white">{BOT_ADDRESS}</span>
						</div>
						<div className="text-3xl font-bold text-white pb-4">
							How To Use?
						</div>
						<div className="text-xl font-bold text-[#99A0AA] pb-3">
							1. Connect Your Wallet.
						</div>
						<div className="text-xl font-bold text-[#99A0AA] pb-3">
							2. Send "/intro" in the Chat to get to know about
							the BOT.
						</div>
						<div className="text-xl font-bold text-[#99A0AA] pb-10">
							3. Send "/list" in the Chat to know about all
							commands.
						</div>
						<div className="text-3xl font-bold text-white pb-4">
							Where Can I Use?
						</div>
						<div className="text-xl font-bold text-[#99A0AA] pb-3">
							1. Use in this Webpage.
						</div>
						<div className="text-xl font-bold text-[#99A0AA] pb-3">
							2. Use on any protocol that supports Push Chat.
						</div>
					</div>
				</div>
			</div>
			<Chat
				account={address || PLACEHOLDER_ACCOUNT}
				supportAddress={BOT_ADDRESS}
				apiKey={PUSH_API_KEY}
				env="prod"
				greetingMsg="Send /intro to start :)"
			/>
		</div>
	);
}

export default Home;
