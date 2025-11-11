import { Navbar } from "@/components/layout/Navbar";
import PrivyLogin from "@/components/auth/PrivyLogin";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-darkBg text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Ahorro JVN</h1>
      </div>
      <PrivyLogin />
      {/* Aquí más adelante agregarás los componentes de fondos */}
    </main>
  );
}
