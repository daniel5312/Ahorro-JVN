// /types/fund.ts
export type FundType = {
  name: string;
  type: "pension" | "universitario";
  durationMonths: number;
  stakingWallet: string;
  beneficiaryWalletsArray: string[];
  currency: "ASTR" | "cCOP";
  balance: number;   // saldo disponible
  staked: number;    // saldo en staking
};
  