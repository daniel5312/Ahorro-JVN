//Este es el conector del lado del frontend Web3,
// lib/web3Client.ts

/// libs/web3Client.ts
import { createConfig, http } from "wagmi";
import { createPublicClient } from "viem";
import { injected } from "wagmi/connectors";
import { astarChain, celoChain } from "@/libs/chainConfig";

// ⚙️ Cliente público: permite leer datos de la blockchain (sin firmar)
export const publicClients = {
  astar: createPublicClient({ chain: astarChain, transport: http() }),
  celo: createPublicClient({ chain: celoChain, transport: http() }),
};

// 🧩 Configuración global de Wagmi
export const wagmiConfig = createConfig({
  chains: [astarChain, celoChain],
  connectors: [injected()],
  transports: {
    [astarChain.id]: http(astarChain.rpcUrls.default.http[0]),
    [celoChain.id]: http(celoChain.rpcUrls.default.http[0]),
  },
});

/* ======================================================================
   💾 Backend Web3 - conexión con tu equipo de contratos
   ====================================================================== */

// 🔗 Crear un fondo en la blockchain (vía backend)
export async function createFundOnChain(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contract/funds/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔗 Consultar fondo en blockchain
export async function getFundStatus(fundId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contract/funds/${fundId}`);
  return res.json();
}

// 💾 Guardar fondo off-chain
export async function saveFundOffChain(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/funds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 📜 Obtener todos los fondos off-chain
export async function getAllFunds() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/funds`);
  return res.json();
}
