import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
	return (
		<div className="flex justify-between shadow-[0_12px_15px_0_rgb(0,0,0,0.25)] border-solid border-[#000]">
			<div className="pt-5 pb-4 pl-4 text-lg text-white font-semibold">
				FVM Bot
			</div>
			<div className="pt-5 pb-4 pr-4">
				<ConnectButton showBalance={false} />
			</div>
		</div>
	);
};

export default Header;
