"use client";

import { FundType } from "@/types/fund";

type FundCardProps = {
  fund: FundType;
  onAction?: (action: "deposit" | "stake" | "withdraw", fund: FundType) => void;
};

export const FundCard = ({ fund, onAction }: FundCardProps) => {
  const { name, type, durationMonths, stakingWallet, beneficiaryWalletsArray, currency, balance, staked } = fund;

  const handleClick = (action: "deposit" | "stake" | "withdraw") => {
    onAction?.(action, fund);
  };

  return (
    <div className="p-4 border rounded-md shadow-sm bg-gray-900 text-white">
      <h3 className="font-bold text-lg">{name}</h3>
      <p>Tipo: {type}</p>
      <p>Duración: {durationMonths} meses</p>
      <p>Wallet Staking: {stakingWallet}</p>

      <div>
        <p>Wallet Beneficiaria{beneficiaryWalletsArray.length > 1 ? "s" : ""}:</p>
        {beneficiaryWalletsArray.length > 0 ? (
          <ul className="list-disc list-inside text-gray-300">
            {beneficiaryWalletsArray.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        ) : (
          <p className="text-gray-400">No hay wallets registradas</p>
        )}
      </div>

      <p>Moneda: {currency}</p>
      <p>Balance: {balance}</p>
      <p>Staked: {staked}</p>

      {/* Botones de acción */}
      <div className="mt-4 flex gap-2">
        <button className="btn bg-blue-600 hover:bg-blue-700" onClick={() => handleClick("deposit")}>Depositar</button>
        <button className="btn bg-green-600 hover:bg-green-700" onClick={() => handleClick("stake")}>Stake</button>
        <button className="btn bg-red-600 hover:bg-red-700" onClick={() => handleClick("withdraw")}>Retirar</button>
      </div>
    </div>
  );
};
