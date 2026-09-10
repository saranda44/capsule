import type { OutfitFavorito, Prenda } from "@/types";
import { reconstruirFavorito } from "@/lib/reconstruirFavorito";
import { Trash2, AlertCircle } from "lucide-react";

interface FavoritoCardProps {
  favorito: OutfitFavorito;
  prendas: Prenda[];
  onSelect: (favorito: OutfitFavorito) => void;
  onEliminar: (id: string, e: React.MouseEvent) => void;
}

function formatearFecha(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    const dia = d.getDate();
    const meses = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ];
    return `${dia} ${meses[d.getMonth()]}`;
  } catch {
    return isoDate;
  }
}

export function FavoritoCard({
  favorito,
  prendas,
  onSelect,
  onEliminar,
}: FavoritoCardProps) {
  const recon = reconstruirFavorito(favorito, prendas);

  return (
    <div className="group cursor-pointer select-none">
      {/* Contenedor Miniatura Recorte */}
      <div
        onClick={() => onSelect(favorito)}
        className="bg-[#FFF] border border-[#E4E1D8] rounded-[2px] p-3 flex flex-col items-center justify-center min-h-[140px] relative hover:border-[#1D1DE0]/40 transition-colors"
      >
        {recon.prendaEliminada && (
          <span className="absolute top-1.5 left-1.5 flex items-center gap-1 font-mono text-[9px] text-[#FF3B8D] bg-[#FF3B8D]/10 px-1.5 py-0.5 rounded-[2px]">
            <AlertCircle className="w-2.5 h-2.5" />
            prenda eliminada
          </span>
        )}

        <div className="flex flex-col items-center justify-center space-y-[-6px] py-1 max-h-[120px]">
          {recon.outerwear && (
            <img
              src={recon.outerwear.imagenUrl}
              alt={recon.outerwear.nombre}
              className="max-h-[38px] w-auto object-contain"
            />
          )}
          {recon.top && (
            <img
              src={recon.top.imagenUrl}
              alt={recon.top.nombre}
              className="max-h-[38px] w-auto object-contain"
            />
          )}
          {recon.bottom && (
            <img
              src={recon.bottom.imagenUrl}
              alt={recon.bottom.nombre}
              className="max-h-[42px] w-auto object-contain"
            />
          )}
          {recon.shoes && (
            <img
              src={recon.shoes.imagenUrl}
              alt={recon.shoes.nombre}
              className="max-h-[26px] w-auto object-contain"
            />
          )}
        </div>
      </div>

      {/* Footer con Fecha e Ícono de Basura */}
      <div className="flex justify-between items-center mt-1.5 px-0.5">
        <span className="font-mono text-[10px] text-[#0E0E0E]/60">
          {formatearFecha(favorito.fecha)}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEliminar(favorito.id, e);
          }}
          className="text-[#0E0E0E]/40 hover:text-[#0E0E0E] p-1 transition-colors"
          title="Eliminar de favoritos"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
