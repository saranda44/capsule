import { useExportOutfit } from "@/hooks/useExportOutfit";

interface AccionesOutfitProps {
  onGuardarFavorito: () => void;
  esFavorito: boolean;
  deshabilitado: boolean;
  reelElementRef: React.RefObject<HTMLDivElement | null>;
}

export function AccionesOutfit({
  onGuardarFavorito,
  esFavorito,
  deshabilitado,
  reelElementRef,
}: AccionesOutfitProps) {
  const { exportando, exportarElementoAPng } = useExportOutfit();

  const handleExportar = () => {
    if (reelElementRef.current) {
      exportarElementoAPng(reelElementRef.current, "outfit-generado.png");
    }
  };

  return (
    <div className="flex gap-2.5 mt-4 w-full">
      <button
        type="button"
        onClick={onGuardarFavorito}
        disabled={deshabilitado || esFavorito}
        className={`flex-1 bg-transparent border text-xs py-2 rounded-[2px] transition-colors select-none cursor-pointer ${
          esFavorito
            ? "border-[#1D1DE0] text-[#1D1DE0] font-medium"
            : "border-[#0E0E0E] text-[#0E0E0E] hover:bg-[#0E0E0E]/5"
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        {esFavorito ? "✓ Guardado en Favoritos" : "Guardar favorito"}
      </button>

      <button
        type="button"
        onClick={handleExportar}
        disabled={deshabilitado || exportando}
        className="flex-1 bg-transparent border border-[#0E0E0E] text-[#0E0E0E] text-xs py-2 rounded-[2px] hover:bg-[#0E0E0E]/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed select-none cursor-pointer"
      >
        {exportando ? "Exportando..." : "Exportar PNG"}
      </button>
    </div>
  );
}
