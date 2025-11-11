//Este hook detecta la red actual, muestra la red activa y te permite cambiarla.
// lib/useChain.ts
// libs/useChain.ts
// libs/useChain.ts
"use client";

import { useChainId, useSwitchChain } from "wagmi";
import { supportedChains } from "@/libs/chainConfig";

export function useChain() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Busca la red actual
  const currentChain = supportedChains.find((c) => c.id === chainId);

  // Función para cambiar de red
  const changeNetwork = async (id: number) => {
    try {
      await switchChain({ chainId: id });
    } catch (error) {
      console.error("❌ Error al cambiar de red:", error);
    }
  };

  return { chainId, currentChain, changeNetwork, supportedChains };
}
