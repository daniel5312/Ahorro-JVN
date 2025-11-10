"use client";

import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""}
      config={{
        appearance: { theme: "dark" },
        loginMethods: ["email", "google", "wallet"],

        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
