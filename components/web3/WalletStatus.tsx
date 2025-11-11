"use client";

/**
 * WalletStatus.tsx
 * ----------------
 * Muestra el estado de la wallet y la red:
 * - si no está autenticado: muestra botón para abrir Privy (login modal)
 * - si está autenticado: muestra dirección (cortada), red y balance (si wagmi lo provee)
 * - botón para desconectar (cierra sesión Privy y wagmi)
 *
 * Requisitos:
 * - Providers: Este componente debe renderizarse dentro de tu Providers (Privy + Wagmi).
 * - Usa hooks de wagmi y Privy.
 *
 * Integración recomendada:
 * - Importar y mostrar en el Navbar (por ejemplo a la derecha).
 */

import React from "react";
import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";
import { useAccount, useChains, useDisconnect, useBalance } from "wagmi";
import { useChain } from "@/libs/useChain";
function shortAddr(addr?: string | null) {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function WalletStatus() {
  // Privy hooks (gestiona login/emergente)
  const { ready, authenticated, user } = usePrivy();
  const { login } = useLogin();
  const { logout: privyLogout } = useLogout();

  // wagmi hooks (detectan provider/injected wallet si el usuario usa MetaMask o similar)
  const { address: wagmiAddress, isConnected } = useAccount();
  const { currentChain } = useChain();
  const { disconnect } = useDisconnect();

  // 🧩 Detectamos la dirección de wallet, dando prioridad a Wagmi (Metamask)
    const detectedAddress =
    (wagmiAddress ||
        (user?.wallet?.address as `0x${string}` | undefined)) ??
    undefined;

    // 💰 Obtenemos balance si hay dirección válida
    const { data: balanceData } = useBalance({
    address: detectedAddress,
    chainId: currentChain?.id,
    
    });


  // Handler para desconexión completa
  const handleDisconnect = async () => {
    try {
      // Intentamos desconectar wagmi primero (si aplica)
      try {
        await disconnect();
      } catch (err) {
        // ignore if no wagmi connector active
      }

      // Luego cerrar sesión en Privy (si está autenticado)
      if (authenticated) await privyLogout();
    } catch (err) {
      console.error("Error al desconectar:", err);
    }
  };

  if (!ready) {
    return (
      <div className="px-3 py-2 text-sm text-gray-400">
        Cargando...
      </div>
    );
  }

  // Si no está autenticado y no hay wallet conectada por wagmi
  if (!authenticated && !isConnected) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => login()}
          className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:opacity-90 transition"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  // Mostrar info cuando hay session (Privy) o conexión (wagmi)
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-gray-300 text-right">
        {/* Dirección preferida (wagmi tiene prioridad porque representa provider local) */}
        <div className="font-medium">{shortAddr(detectedAddress)}</div>
        <div className="text-xs text-gray-400">
          {currentChain ? currentChain.name : user?.wallet?.chainId || "Red desconocida"}
          {" • "}
          {balanceData ? `${parseFloat(balanceData.formatted).toFixed(4)} ${balanceData.symbol}` : "—"}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {/* Opcional: si usuario está autenticado por Privy mostrar icono/email */}
        {authenticated && user?.email?.address && (
          <div className="text-xs text-gray-300 hidden sm:block">
            {user.email.address}
          </div>
        )}

        <button
          onClick={handleDisconnect}
          className="text-xs text-gray-200 bg-gray-800/40 px-3 py-1 rounded-md hover:bg-red-600/20 transition"
        >
          Desconectar
        </button>
      </div>
    </div>
  );
}
function useNetwork(): { chain: any; } {
    throw new Error("Function not implemented.");
}

