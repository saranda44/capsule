import type { OutfitFavorito, Prenda } from "@/types";
import { FavoritoCard } from "./FavoritoCard";

interface FavoritosGridProps {
  favoritos: OutfitFavorito[];
  prendas: Prenda[];
  onSelectFavorito: (favorito: OutfitFavorito) => void;
  onEliminarFavorito: (id: string, e: React.MouseEvent) => void;
}

export function FavoritosGrid({
  favoritos,
  prendas,
  onSelectFavorito,
  onEliminarFavorito,
}: FavoritosGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      {favoritos.map((fav) => (
        <FavoritoCard
          key={fav.id}
          favorito={fav}
          prendas={prendas}
          onSelect={onSelectFavorito}
          onEliminar={onEliminarFavorito}
        />
      ))}
    </div>
  );
}
