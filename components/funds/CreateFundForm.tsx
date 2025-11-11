"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FundFormData = {
  name: string;
  type: "pension" | "universitario";
  durationMonths: number;
  stakingWallet: string;
  beneficiaryWallet: string;
  beneficiaryWalletsArray?: string[];
  currency: "ASTR" | "cCOP";
  network?: string; // <-- añadimos campo red
};

type CreateFundFormProps = {
  onCreate?: (data: FundFormData) => void;
};

export const CreateFundForm = ({ onCreate }: CreateFundFormProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FundFormData>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [wallets, setWallets] = useState<string[]>([]);

  const currency = watch("currency"); // Observa la moneda seleccionada
  const inputValue = watch("beneficiaryWallet") || "";

  const handleBlur = () => {
    let arr = inputValue
      .split(/[\s,]+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    if (arr.length > 4) arr = arr.slice(0, 4);
    setWallets(arr);
    setValue("beneficiaryWalletsArray", arr);
  };

  const submit = async (data: FundFormData) => {
    setLoading(true);
    setErrorMsg("");

    // Detectar red según moneda
    const network = data.currency === "ASTR" ? "Astar" : "Celo";
    data.network = network;

    try {
      // Llamada mock o al backend real
      const res = await fetch("/api/funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error creando el fondo");
      const result = await res.json();
      onCreate?.(result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 p-4 border rounded-md shadow-sm bg-gray-800 text-white">
      <div>
        <label>Nombre del fondo</label>
        <input {...register("name", { required: "Nombre obligatorio" })} className="input" />
        {errors.name && <p className="text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label>Tipo de fondo</label>
        <select {...register("type", { required: "Tipo obligatorio" })} className="input">
          <option value="">Selecciona tipo</option>
          <option value="pension">Pensión voluntaria</option>
          <option value="universitario">Ahorro universitario</option>
        </select>
        {errors.type && <p className="text-red-400">{errors.type.message}</p>}
      </div>

      <div>
        <label>Duración (meses)</label>
        <input
          type="number"
          {...register("durationMonths", {
            required: "Duración obligatoria",
            min: { value: 60, message: "La duración mínima es de 60 meses (5 años)" },
            validate: (value) => {
              const type = watch("type");
              if (type === "pension" && value < 60) return "La pensión requiere mínimo 5 años";
              if (type === "universitario" && value < 60) return "Ahorro universitario requiere mínimo 5 años";
              return true;
            },
          })}
          className="input"
        />
        {errors.durationMonths && <p className="text-red-400">{errors.durationMonths.message}</p>}
      </div>

      <div>
        <label>Wallet de staking/retiro</label>
        <input {...register("stakingWallet", { required: "Wallet requerida" })} className="input" />
      </div>

      <div>
        <label>Wallet beneficiaria (máx 4, separadas por coma o espacio)</label>
        <input
          type="text"
          placeholder="0x..., 0x..., 0x..."
          {...register("beneficiaryWallet", { required: "Wallet beneficiaria obligatoria" })}
          className="input"
          onBlur={handleBlur}
        />
        {errors.beneficiaryWallet && <p className="text-red-400">{errors.beneficiaryWallet.message}</p>}

        {wallets.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-gray-300">
            {wallets.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label>Moneda</label>
        <select {...register("currency", { required: true })} className="input">
          <option value="">Selecciona moneda</option>
          <option value="ASTR">ASTR</option>
          <option value="cCOP">cCOP</option>
        </select>
      </div>

      {/* Mostrar red seleccionada */}
      {currency && (
        <p className="text-sm text-gray-400">
          Red seleccionada: {currency === "ASTR" ? "Astar Network" : "Celo Network"}
        </p>
      )}

      {errorMsg && <p className="text-red-400">{errorMsg}</p>}

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Creando..." : "Crear Fondo"}
      </button>
    </form>
  );
};
