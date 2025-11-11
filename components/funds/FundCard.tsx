"use client";

"use client";

import { FundType } from "@/types/fund";
import { useState } from "react";

type FundCardProps = {
  fund: FundType;
  onAction?: (action: "deposit" | "stake" | "withdraw", fund: FundType, amount: number) => void;
};

export const FundCard = ({ fund, onAction }: FundCardProps) => {
  const [amount, setAmount] = useState<number>(0);

  const handleClick = (action: "deposit" | "stake" | "withdraw") => {
    if (onAction) {
      onAction(action, fund, amount);
      setAmount(0); // reset input después de la acción
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm bg-gray-900 text-white">
      <h3 className="font-bold text-lg">{fund.name}</h3>
      <p>Tipo: {fund.type}</p>
      <p>Duración: {fund.durationMonths} meses</p>
      <p>Wallet Staking: {fund.stakingWallet}</p>
      <div>
        <p>Wallet Beneficiaria{fund.beneficiaryWalletsArray.length > 1 ? "s" : ""}:</p>
        {fund.beneficiaryWalletsArray.length > 0 ? (
          <ul className="list-disc list-inside text-gray-300">
            {fund.beneficiaryWalletsArray.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        ) : <p className="text-gray-400">No hay wallets registradas</p>}
      </div>
      <p>Moneda: {fund.currency}</p>
      <p>Balance: {fund.balance}</p>
      <p>Staked: {fund.staked}</p>

      {/* Input de monto */}
      <input
        type="number"
        min={0}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Ingrese monto"
        className="input my-2 w-full"
      />

      {/* Botones de acción */}
      <div className="mt-2 flex gap-2">
        <button className="btn bg-blue-600 hover:bg-blue-700" onClick={() => handleClick("deposit")}>Depositar</button>
        <button className="btn bg-green-600 hover:bg-green-700" onClick={() => handleClick("stake")}>Stake</button>
        <button className="btn bg-red-600 hover:bg-red-700" onClick={() => handleClick("withdraw")}>Retirar</button>
      </div>
    </div>
  );
};
