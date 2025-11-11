"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import PrivyLogin from "@/components/auth/PrivyLogin";
import { CreateFundForm } from "@/components/funds/CreateFundForm";
import { FundType } from "@/types/fund";
import { FundList } from "@/components/funds/FundList";

export default function HomePage() {
  const [funds, setFunds] = useState<FundType[]>([]);

  // Callback que recibe el fondo creado desde CreateFundForm
  const handleCreateFund = (data: FundType) => {
    setFunds(prev => [...prev, data]);
  };

  // Callback que maneja las acciones de deposit, stake y withdraw
  const handleFundAction = (action: "deposit" | "stake" | "withdraw", fund: FundType, amount: number) => {
    setFunds(prev =>
      prev.map(f => {
        if (f.name === fund.name) {
          let newBalance = f.balance;
          let newStaked = f.staked;

          if (action === "deposit") newBalance += amount;
          if (action === "stake" && amount <= newBalance) {
            newBalance -= amount;
            newStaked += amount;
          }
          if (action === "withdraw" && amount <= newBalance) {
            newBalance -= amount;
          }

          // Aquí puedes llamar al backend con los datos de la acción
          console.log(`Acción: ${action}, Fondo: ${f.name}, Monto: ${amount}`);

          return { ...f, balance: newBalance, staked: newStaked };
        }
        return f;
      })
    );
  };

  return (
    <main className="min-h-screen bg-darkBg text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Ahorro JVN</h1>
        <p className="mb-6">Crea y gestiona tus fondos de ahorro fácilmente.</p>

        {/* Formulario para crear un fondo */}
        <CreateFundForm onCreate={handleCreateFund} />

        {/* Listado de fondos */}
        <div className="mt-8">
          <FundList funds={funds} onAction={handleFundAction} />
        </div>
      </div>

      {/* Login con Privy */}
      <PrivyLogin />
    </main>
  );
}
