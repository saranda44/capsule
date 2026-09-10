import { useState, useCallback } from "react";
import type { Prenda } from "@/types";
import {
  obtenerPrendas,
  guardarPrendas,
  agregarPrendaStorage,
  eliminarPrendaStorage,
} from "@/lib/storage";
import prendasSeed from "@/data/prendas.seed.json";

export function useWardrobe() {
  const [prendas, setPrendas] = useState<Prenda[]>(() => obtenerPrendas());

  const agregarPrenda = useCallback((nuevaPrenda: Prenda) => {
    const actualizadas = agregarPrendaStorage(nuevaPrenda);
    setPrendas(actualizadas);
  }, []);

  const eliminarPrenda = useCallback((id: string) => {
    const actualizadas = eliminarPrendaStorage(id);
    setPrendas(actualizadas);
  }, []);

  const restablecerSemilla = useCallback(() => {
    const semilla = prendasSeed as Prenda[];
    guardarPrendas(semilla);
    setPrendas(semilla);
  }, []);

  return {
    prendas,
    agregarPrenda,
    eliminarPrenda,
    restablecerSemilla,
  };
}
