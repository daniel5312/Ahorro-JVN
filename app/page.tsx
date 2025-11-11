
"use client";

import { usePrivy, useLogin } from "@privy-io/react-auth";
import Image from "next/image";

export default function LandingPage() {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();

  if (!ready) return <div className="flex items-center justify-center min-h-screen text-gray-400">Cargando...</div>;

  if (authenticated) {
    window.location.href = "/home";
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-[#0A0A0B] via-[#1A103D] to-[#0A0A0B] text-white">
      <div className="text-center p-8">
        <Image src="/logo.png" alt="Ahorro JVN" width={120} height={120} className="mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-primary">Ahorro JVN</h1>
        <p className="text-gray-300 max-w-lg mx-auto mb-8">
          Plataforma de ahorro juvenil multi-chain con apoyo familiar y recompensas DeFi.
        </p>
        <button
          onClick={login}
          className="bg-primary hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
        >
          Iniciar sesión con Privy
        </button>
      </div>
    </main>
  );
}
