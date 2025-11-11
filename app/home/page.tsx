"use client"; // <-- Muy importante para usar useState y hooks de React

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import PrivyLogin from "@/components/auth/PrivyLogin";
import { CreateFundForm } from "@/components/funds/CreateFundForm";
import { FundCard } from "@/components/funds/FundCard";

export default function HomePage() {
  // Estado para almacenar los fondos creados
  const [funds, setFunds] = useState<any[]>([]);

  // Callback que recibe los datos del formulario y los agrega al listado de fondos
  const handleCreateFund = (data: any) => {
    setFunds(prev => [...prev, data]);
  };

  // Callback que maneja acciones de cada fondo: depositar, stake, retirar
  const handleFundAction = (action: "deposit" | "stake" | "withdraw", fund: any) => {
    console.log(`Acción: ${action}`, fund);
    alert(`Se simuló la acción "${action}" en el fondo "${fund.name}"`);
    // Aquí el backend puede recibir fund info y action
  };

  return (
    <main className="min-h-screen bg-darkBg text-white">
      {/* Barra de navegación */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Título y descripción */}
        <h1 className="text-3xl font-bold mb-4">Welcome to Ahorro JVN</h1>
        <p className="mb-6">Crea y gestiona tus fondos de ahorro fácilmente.</p>

        {/* Formulario para crear un nuevo fondo */}
        <CreateFundForm onCreate={handleCreateFund} />

        {/* Listado de fondos creados */}
        {funds.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {funds.map((f, i) => (
              <FundCard key={i} {...f} onAction={handleFundAction} />
            ))}
          </div>
        )}
      </div>

      {/* Componente de login con Privy */}
      <PrivyLogin />
    </main>
  );
}
