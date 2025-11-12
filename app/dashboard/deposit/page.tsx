"use client";
import React from "react";
import DepositFlow from "../../../components/deposits/DepositFlow"; // ← nota los “../”

export default function DepositPage() {
  return (
    <div className="p-10">
      <DepositFlow />
    </div>
  );
}
