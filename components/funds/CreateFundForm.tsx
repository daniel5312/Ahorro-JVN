"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FundType } from "@/types/fund";

type FundFormData = {
  name: string;
  type: "pension" | "universitario";
  durationYears: number; // en años, puede ser decimal
  stakingWallet: string;
  beneficiaryWallets: string; // input como string, luego parseado a array
  currency: "ASTR" | "cCOP";
  balance?: number;
  staked?: number;
};

type CreateFundFormProps = {
  onCreate?: (fund: FundType) => void;
};

export const CreateFundForm = ({ onCreate }: CreateFundFormProps) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<FundFormData>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const type = useWatch({ control, name: "type" });

  const submit = (data: FundFormData) => {
    setLoading(true);
    setErrorMsg("");

    try {
      // Parsear wallets: separar por coma o espacio, máximo 4
      const walletsArray = data.beneficiaryWallets
        .split(/[\s,]+/)
        .filter(Boolean)
        .slice(0, 4);

      const newFund: FundType = {
        name: data.name,
        type: data.type,
        durationMonths: Math.round(data.durationYears * 12), // convertir a meses para backend
        stakingWallet: data.stakingWallet,
        beneficiaryWalletsArray: walletsArray,
        currency: data.currency,
        balance: 0,
        staked: 0,
      };

      onCreate?.(newFund);
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
        <label>Duración (años, puede ser decimal)</label>
        <input
          type="number"
          step="0.1"
          {...register("durationYears", {
            required: "Duración obligatoria",
            validate: (value) => {
              const val = Number(value);
              if (type === "pension" && val < 5)
                return "La pensión requiere mínimo 5 años";
              if (type === "universitario" && val < 3)
                return "Ahorro universitario requiere mínimo 3 años";
              return true;
            },
          })}
          className="input"
        />
        {errors.durationYears && <p className="text-red-400">{errors.durationYears.message}</p>}
      </div>

      <div>
        <label>Wallet de staking/retiro</label>
        <input {...register("stakingWallet", { required: "Wallet requerida" })} className="input" />
      </div>

      <div>
        <label>Wallet beneficiaria (hasta 4, separadas por coma o espacio)</label>
        <input
          type="text"
          placeholder="0x..., 0x..., 0x..."
          {...register("beneficiaryWallets", { required: "Wallet beneficiaria obligatoria" })}
          className="input"
        />
        {errors.beneficiaryWallets && <p className="text-red-400">{errors.beneficiaryWallets.message}</p>}
      </div>

      <div>
        <label>Moneda</label>
        <select {...register("currency", { required: true })} className="input">
          <option value="ASTR">ASTR</option>
          <option value="cCOP">cCOP</option>
        </select>
      </div>

      {errorMsg && <p className="text-red-400">{errorMsg}</p>}

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Creando..." : "Crear Fondo"}
      </button>
    </form>
  );
};




/*"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FundType } from "@/types/fund";

type FundFormData = {
  name: string;
  type: "pension" | "universitario";
  durationMonths: number;
  stakingWallet: string;
  beneficiaryWallets: string; // campo de texto, luego lo convertimos en array
  currency: "ASTR" | "cCOP";
};

type CreateFundFormProps = {
  onCreate?: (data: FundType) => void;
};

export const CreateFundForm = ({ onCreate }: CreateFundFormProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FundFormData>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submit: SubmitHandler<FundFormData> = (data) => {
    setLoading(true);
    setErrorMsg("");

    try {
      // Convertimos beneficiarias en array, máximo 4 wallets
      const beneficiaryWalletsArray = data.beneficiaryWallets
        .split(/[\s,]+/)        // separa por coma o espacios
        .filter(w => w.trim() !== "")
        .slice(0, 4);           // máximo 4

      if (beneficiaryWalletsArray.length === 0) {
        setErrorMsg("Debes ingresar al menos 1 wallet beneficiaria");
        setLoading(false);
        return;
      }

      const newFund: FundType = {
        name: data.name,
        type: data.type,
        durationMonths: data.durationMonths,
        stakingWallet: data.stakingWallet,
        beneficiaryWalletsArray,
        currency: data.currency,
        balance: 0,   // saldo inicial
        staked: 0,    // saldo en staking inicial
      };

      // Callback al componente padre
      onCreate?.(newFund);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const type = watch("type");

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
            min: {
              value: 60,
              message: "La duración mínima es de 60 meses (5 años)",
            },
            validate: (value) => {
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
        {errors.stakingWallet && <p className="text-red-400">{errors.stakingWallet.message}</p>}
      </div>

      <div>
        <label>Wallet beneficiaria(s) (máx. 4, separadas por coma o espacio)</label>
        <input
          type="text"
          placeholder="0x123..., 0x456..."
          {...register("beneficiaryWallets", { required: "Wallet beneficiaria obligatoria" })}
          className="input"
        />
        {errors.beneficiaryWallets && <p className="text-red-400">{errors.beneficiaryWallets.message}</p>}
      </div>

      <div>
        <label>Moneda</label>
        <select {...register("currency", { required: true })} className="input">
          <option value="ASTR">ASTR</option>
          <option value="cCOP">cCOP</option>
        </select>
      </div>

      {errorMsg && <p className="text-red-400">{errorMsg}</p>}

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Creando..." : "Crear Fondo"}
      </button>
    </form>
  );
};*/


