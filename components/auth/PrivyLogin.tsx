"use client";

import { usePrivy, useLogin } from "@privy-io/react-auth";

export default function PrivyLogin() {
  const { ready, authenticated, user, logout } = usePrivy();
  const { login } = useLogin();

  if (!ready) return <p>Cargando...</p>;

  if (!authenticated)
    return (
      <button
        onClick={login}
        className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
      >
        Iniciar sesión
      </button>
    );

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-green-400 font-semibold">
        ¡Bienvenido {user?.email?.address || user?.wallet?.address}!
      </p>

      {user?.linkedAccounts?.length ? (
        user.linkedAccounts.map((account, i) => (
          <p key={i} className="text-sm text-gray-400">
            Wallet vinculada: {'address' in account ? account.address : ''}
          </p>
        ))
      ) : (
        <p className="text-sm text-yellow-400">
          Aún no tienes una wallet vinculada. Puedes crear una desde Privy.
        </p>
      )}

      <button
        onClick={logout}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
