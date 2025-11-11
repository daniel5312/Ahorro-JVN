//Aquí definimos las redes que soportará tu app (Astar y Celo).
// lib/chainConfig.ts

import { Chain } from "viem";

export const astarChain: Chain = {
  id: 592, // Astar mainnet ID
  name: "Astar",
  nativeCurrency: { name: "Astar", symbol: "ASTR", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.astar.network"] },
    public: { http: ["https://rpc.astar.network"] },
  },
  blockExplorers: {
    default: { name: "AstarScan", url: "https://astar.subscan.io/" },
  },
};

export const celoChain: Chain = {
  id: 42220, // Celo mainnet
  name: "Celo",
  nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://forno.celo.org"] },
    public: { http: ["https://forno.celo.org"] },
  },
  blockExplorers: {
    default: { name: "CeloScan", url: "https://celoscan.io/" },
  },
};

// Lista de redes soportadas en tu app
export const supportedChains = [astarChain, celoChain];
// libs/chainConfig.ts
/*import { defineChain } from "viem";

// 🔷 Astar Network
export const astarChain = defineChain({
  id: 592,
  name: "Astar",
  network: "astar",
  nativeCurrency: { name: "Astar", symbol: "ASTR", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://astar.public.blastapi.io"] },
  },
  blockExplorers: {
    default: { name: "Astar Scan", url: "https://astar.subscan.io/" },
  },
});

// 🟡 Celo Network
export const celoChain = defineChain({
  id: 42220,
  name: "Celo",
  network: "celo",
  nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://forno.celo.org"] },
  },
  blockExplorers: {
    default: { name: "Celo Explorer", url: "https://explorer.celo.org" },
  },
});

// 📦 Exportamos arreglo con las cadenas soportadas
export const supportedChains = [astarChain, celoChain];*/

