"use client";
import WalletStatus from "@/components/web3/WalletStatus";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NetworkSelector } from "../web3/NetworkSelector";

export function Navbar() {
  const { authenticated, user } = usePrivy();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 border-b border-gray-800 bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight"
        >
          Ahorro <span className="text-white">JVN</span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="/funds" className="hover:text-white space-between transition-colors">
            Mis Fondos
          </Link>
          <Link href="/create" className="hover:text-white transition-colors">
            Crear Fondo
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            Acerca
          </Link>
        </div>

        {/* AUTH STATUS */}
        <div className="hidden md:flex items-center gap-4">
          {authenticated ? (
            <span className="text-sm text-green-400 bg-green-950/40 px-3 py-1 rounded-full">
              {user?.email?.address ||
                user?.wallet?.address?.slice(0, 6) + "..." ||
                "Usuario"}
            </span>
          ) : (
            <span className="text-sm text-gray-400 italic">
              No conectado
            </span>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white transition"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t border-gray-800 bg-gray-900/95 text-gray-300 text-sm">
          <Link
            href="/funds"
            className="hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            Mis Fondos
          </Link>
          <Link
            href="/create"
            className="hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            Crear Fondo
          </Link>
          <Link
            href="/about"
            className="hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            Acerca
          </Link>

          <div className="border-t border-gray-800 w-10/12 pt-2 text-center">
            {authenticated ? (
              <span className="text-green-400 text-xs">
                {user?.email?.address ||
                  user?.wallet?.address?.slice(0, 8) + "..."}
              </span>
            ) : (
              <span className="text-gray-400 text-xs">No conectado</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <NetworkSelector />
            <WalletStatus />
          </div>
                    
        </div>
      )}
    </nav>
  );
}
