import { useState, useCallback } from "react";
import type { OutfitFavorito, OutfitState } from "@/types";
import { obtenerFavoritos, guardarFavoritos } from "@/lib/storage";

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<OutfitFavorito[]>(() =>
    obtenerFavoritos()
  );

  const guardarFavorito = useCallback((outfitState: OutfitState) => {
    const topId = outfitState.top.prenda?.id || "";
    const bottomId = outfitState.bottom.prenda?.id || "";
    const shoesId = outfitState.shoes.prenda?.id || "";
    const outerwearId =
      outfitState.incluirOuterwear && outfitState.outerwear?.prenda
        ? outfitState.outerwear.prenda.id
        : null;

    const accesoriosIds = outfitState.accesorios
      .map((a) => a.prenda?.id)
      .filter((id): id is string => Boolean(id));

    if (!topId && !bottomId && !shoesId) return;

    const nuevoFavorito: OutfitFavorito = {
      id: `fav-${Date.now()}`,
      fecha: new Date().toISOString(),
      outerwearId,
      topId,
      bottomId,
      shoesId,
      accesoriosIds,
    };

    setFavoritos((prev) => {
      const actualizados = [nuevoFavorito, ...prev];
      guardarFavoritos(actualizados);
      return actualizados;
    });
  }, []);

  const eliminarFavorito = useCallback((id: string) => {
    setFavoritos((prev) => {
      const actualizados = prev.filter((f) => f.id !== id);
      guardarFavoritos(actualizados);
      return actualizados;
    });
  }, []);

  const esFavorito = useCallback(
    (outfitState: OutfitState): boolean => {
      const topId = outfitState.top.prenda?.id || "";
      const bottomId = outfitState.bottom.prenda?.id || "";
      const shoesId = outfitState.shoes.prenda?.id || "";
      const outerwearId =
        outfitState.incluirOuterwear && outfitState.outerwear?.prenda
          ? outfitState.outerwear.prenda.id
          : null;

      const accesoriosIds = outfitState.accesorios
        .map((a) => a.prenda?.id)
        .filter((id): id is string => Boolean(id))
        .sort()
        .join(",");

      return favoritos.some((fav) => {
        const favAcc = [...fav.accesoriosIds].sort().join(",");
        return (
          fav.outerwearId === outerwearId &&
          fav.topId === topId &&
          fav.bottomId === bottomId &&
          fav.shoesId === shoesId &&
          favAcc === accesoriosIds
        );
      });
    },
    [favoritos]
  );

  return {
    favoritos,
    guardarFavorito,
    eliminarFavorito,
    esFavorito,
  };
}
