import type { Prenda, OutfitFavorito } from "@/types";

export interface FavoritoReconstruido {
  id: string;
  fecha: string;
  outerwear: Prenda | null;
  top: Prenda | null;
  bottom: Prenda | null;
  shoes: Prenda | null;
  accesorios: Prenda[];
  prendaEliminada: boolean;
}

export function reconstruirFavorito(
  favorito: OutfitFavorito,
  prendasActuales: Prenda[]
): FavoritoReconstruido {
  const mapaPrendas = new Map<string, Prenda>(
    prendasActuales.map((p) => [p.id, p])
  );

  let prendaEliminada = false;

  // Outerwear
  const outerwear = favorito.outerwearId
    ? mapaPrendas.get(favorito.outerwearId) || null
    : null;

  // Top
  const top = mapaPrendas.get(favorito.topId) || null;
  if (favorito.topId && !top) {
    prendaEliminada = true;
  }

  // Bottom
  const bottom = mapaPrendas.get(favorito.bottomId) || null;
  if (favorito.bottomId && !bottom) {
    prendaEliminada = true;
  }

  // Shoes
  const shoes = mapaPrendas.get(favorito.shoesId) || null;
  if (favorito.shoesId && !shoes) {
    prendaEliminada = true;
  }

  // Accesorios (los accesorios eliminados simplemente se filtran)
  const accesorios: Prenda[] = favorito.accesoriosIds
    .map((id) => mapaPrendas.get(id))
    .filter((p): p is Prenda => p !== undefined);

  return {
    id: favorito.id,
    fecha: favorito.fecha,
    outerwear,
    top,
    bottom,
    shoes,
    accesorios,
    prendaEliminada,
  };
}
