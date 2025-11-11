//Aquí el usuario elige en qué red quiere operar (Celo o Astar).
// components/NetworkSelector.tsx
"use client";

import { useChain } from "../../libs/useChain";

export function NetworkSelector() {
  const { supportedChains, currentChain, changeNetwork } = useChain();

  return (
    <div className="flex items-center gap-2 bg-darkBg text-white px-4 py-2 rounded-lg shadow-glow">
      <span className="text-sm font-medium">
        {currentChain ? `Red: ${currentChain.name}` : "No conectado"}
      </span>

      <select
        onChange={(e) => changeNetwork(Number(e.target.value))}
        value={currentChain?.id || ""}
        className="ml-2 bg-transparent border border-primary rounded-md text-sm text-white focus:ring-2 focus:ring-primary"
      >
        <option value="">Seleccionar red</option>
        {supportedChains.map((chain) => (
          <option key={chain.id} value={chain.id}>
            {chain.name}
          </option>
        ))}
      </select>
    </div>
  );
}
