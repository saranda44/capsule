interface FavoritosVacioProps {
  onIrAlGenerador: () => void;
}

export function FavoritosVacio({ onIrAlGenerador }: FavoritosVacioProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3.5 py-12 px-4 select-none">
      <span className="text-[15px] text-[#0E0E0E] font-medium">
        Aún no tienes outfits guardados.
      </span>
      <span className="font-mono text-xs text-[#0E0E0E]/50 max-w-[280px]">
        Genera una combinación y guárdala para verla aquí.
      </span>
      <button
        type="button"
        onClick={onIrAlGenerador}
        className="mt-1.5 bg-transparent border border-[#1D1DE0] text-[#1D1DE0] text-xs font-sans px-5 py-2 rounded-[2px] hover:bg-[#1D1DE0]/5 transition-colors cursor-pointer"
      >
        [ Ir al generador ]
      </button>
    </div>
  );
}
