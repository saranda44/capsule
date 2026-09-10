import { useState, useCallback, useEffect } from "react";
import type { Prenda, OutfitState, Ocasion } from "@/types";
import { generarOutfit } from "@/lib/generarOutfit";

const CONFIG_KEY = "capsule-wardrobe:config";

interface StoredConfig {
  ocasionActiva: Ocasion | "todos";
  incluirOuterwear: boolean;
  cantidadAccesorios: number;
}

const defaultConfig: StoredConfig = {
  ocasionActiva: "todos",
  incluirOuterwear: true,
  cantidadAccesorios: 2,
};

export function useOutfitGenerator(prendas: Prenda[]) {
  const [config] = useState<StoredConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error cargando config de localStorage", e);
    }
    return defaultConfig;
  });

  const [outfitState, setOutfitState] = useState<OutfitState>(() => ({
    incluirOuterwear: config.incluirOuterwear,
    outerwear: { categoria: "outerwear", prenda: null, bloqueado: false },
    top: { categoria: "top", prenda: null, bloqueado: false },
    bottom: { categoria: "bottom", prenda: null, bloqueado: false },
    shoes: { categoria: "shoes", prenda: null, bloqueado: false },
    cantidadAccesorios: config.cantidadAccesorios,
    accesorios: [],
    ocasionActiva: config.ocasionActiva,
  }));

  const [isSpinning, setIsSpinning] = useState(false);

  // Guardar configuración en localStorage cuando cambie
  useEffect(() => {
    try {
      const newConfig: StoredConfig = {
        ocasionActiva: outfitState.ocasionActiva,
        incluirOuterwear: outfitState.incluirOuterwear,
        cantidadAccesorios: outfitState.cantidadAccesorios,
      };
      localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error("Error guardando config en localStorage", e);
    }
  }, [outfitState.ocasionActiva, outfitState.incluirOuterwear, outfitState.cantidadAccesorios]);

  // Generar primer outfit al cargar las prendas si el estado está vacío
  useEffect(() => {
    if (prendas.length > 0 && !outfitState.top.prenda) {
      const inicial = generarOutfit(prendas, outfitState);
      setOutfitState(inicial);
    }
  }, [prendas]);

  const generar = useCallback(() => {
    if (prendas.length === 0) return;
    setIsSpinning(true);
    const nuevoOutfit = generarOutfit(prendas, outfitState);
    setOutfitState(nuevoOutfit);
    setTimeout(() => {
      setIsSpinning(false);
    }, 600);
  }, [prendas, outfitState]);

  const toggleLock = useCallback((categoria: string, index?: number) => {
    setOutfitState((prev) => {
      if (categoria === "outerwear" && prev.outerwear) {
        return {
          ...prev,
          outerwear: { ...prev.outerwear, bloqueado: !prev.outerwear.bloqueado },
        };
      }
      if (categoria === "top") {
        return {
          ...prev,
          top: { ...prev.top, bloqueado: !prev.top.bloqueado },
        };
      }
      if (categoria === "bottom") {
        return {
          ...prev,
          bottom: { ...prev.bottom, bloqueado: !prev.bottom.bloqueado },
        };
      }
      if (categoria === "shoes") {
        return {
          ...prev,
          shoes: { ...prev.shoes, bloqueado: !prev.shoes.bloqueado },
        };
      }
      if (categoria === "accesorios" && index !== undefined) {
        const nuevosAccesorios = [...prev.accesorios];
        if (nuevosAccesorios[index]) {
          nuevosAccesorios[index] = {
            ...nuevosAccesorios[index],
            bloqueado: !nuevosAccesorios[index].bloqueado,
          };
        }
        return {
          ...prev,
          accesorios: nuevosAccesorios,
        };
      }
      return prev;
    });
  }, []);

  const setIncluirOuterwear = useCallback(
    (valor: boolean) => {
      setOutfitState((prev) => {
        const nuevoEstado = { ...prev, incluirOuterwear: valor };
        return generarOutfit(prendas, nuevoEstado);
      });
    },
    [prendas]
  );

  const setCantidadAccesorios = useCallback(
    (cantidad: number) => {
      const clamp = Math.max(0, Math.min(4, cantidad));
      setOutfitState((prev) => {
        const nuevoEstado = { ...prev, cantidadAccesorios: clamp };
        return generarOutfit(prendas, nuevoEstado);
      });
    },
    [prendas]
  );

  const setOcasionActiva = useCallback(
    (ocasion: Ocasion | "todos") => {
      setOutfitState((prev) => {
        const nuevoEstado = { ...prev, ocasionActiva: ocasion };
        return generarOutfit(prendas, nuevoEstado);
      });
    },
    [prendas]
  );

  return {
    outfitState,
    isSpinning,
    generar,
    toggleLock,
    setIncluirOuterwear,
    setCantidadAccesorios,
    setOcasionActiva,
    setOutfitState,
  };
}
