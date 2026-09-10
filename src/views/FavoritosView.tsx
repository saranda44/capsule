import { useState } from "react";
import type { OutfitFavorito } from "@/types";
import { useFavoritos } from "@/hooks/useFavoritos";
import { useWardrobe } from "@/hooks/useWardrobe";
import { FavoritosGrid } from "@/components/favoritos/FavoritosGrid";
import { FavoritosVacio } from "@/components/favoritos/FavoritosVacio";
import { MoodboardModal } from "@/components/favoritos/MoodboardModal";

interface FavoritosViewProps {
  onIrAlGenerador: () => void;
}

export function FavoritosView({ onIrAlGenerador }: FavoritosViewProps) {
  const { favoritos, eliminarFavorito } = useFavoritos();
  const { prendas } = useWardrobe();
  const [selectedFav, setSelectedFav] = useState<OutfitFavorito | null>(null);

  return (
    <div className="w-full max-w-[520px] mx-auto bg-[#F7F6F2] font-sans">
      {favoritos.length === 0 ? (
        <FavoritosVacio onIrAlGenerador={onIrAlGenerador} />
      ) : (
        <FavoritosGrid
          favoritos={favoritos}
          prendas={prendas}
          onSelectFavorito={(fav) => setSelectedFav(fav)}
          onEliminarFavorito={(id) => eliminarFavorito(id)}
        />
      )}

      {/* Modal de Moodboard para outfit seleccionado */}
      <MoodboardModal
        isOpen={Boolean(selectedFav)}
        onClose={() => setSelectedFav(null)}
        favorito={selectedFav}
        prendas={prendas}
      />
    </div>
  );
}
