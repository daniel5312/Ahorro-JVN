import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Aquí tu equipo puede reemplazar con lógica real de backend o llamada a smart contract
    console.log("Fondo recibido en API:", data);

    // Simulamos ID de fondo generado
    const fundWithId = { id: Date.now(), ...data };

    return NextResponse.json(fundWithId);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creando fondo" }, { status: 500 });
  }
}
