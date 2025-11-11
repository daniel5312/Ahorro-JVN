"use client";

import { createConfig, http } from "wagmi";
import { celo, astar } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [astar, celo],
  connectors: [injected()], // 👈 esto permite usar Metamask, Privy u otros inyectados
  transports: {
    [astar.id]: http("https://evm.astar.network"),
    [celo.id]: http("https://forno.celo.org"),
  },
});
