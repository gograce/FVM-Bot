import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
	getDefaultWallets,
	RainbowKitProvider,
	midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	bsc,
	gnosis,
	avalanche,
	fantom,
	filecoin,
	filecoinHyperspace,
} from "@wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

const { chains, provider } = configureChains(
	[
		mainnet,
		polygon,
		optimism,
		arbitrum,
		avalanche,
		bsc,
		gnosis,
		fantom,
		filecoin,
		filecoinHyperspace as any,
	],
	[
		alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY! }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "Push FVM Bot",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const App = () => {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				coolMode
				chains={chains}
				theme={midnightTheme()}
			>
				<Header />
				<Home />
			</RainbowKitProvider>
		</WagmiConfig>
	);
};

export default App;
