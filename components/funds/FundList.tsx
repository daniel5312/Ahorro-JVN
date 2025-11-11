"use client";

import { FundCard } from "./FundCard";
import { FundType } from "@/types/fund";

type FundListProps = {
  funds: FundType[];
  onAction?: (action: "deposit" | "stake" | "withdraw", fund: FundType, amount: number) => void;
};

export const FundList = ({ funds, onAction }: FundListProps) => {
  if (funds.length === 0) return <p className="text-gray-400">No hay fondos creados aún.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {funds.map((fund, index) => (
        <FundCard key={index} fund={fund} onAction={onAction} />
      ))}
    </div>
  );
};
