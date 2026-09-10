import { useRef } from "react";
import { Modal } from "@/components/layout/Modal";
import type { OutfitFavorito, Prenda } from "@/types";
import { reconstruirFavorito } from "@/lib/reconstruirFavorito";
import { useExportOutfit } from "@/hooks/useExportOutfit";
import { Download } from "lucide-react";

interface MoodboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorito: OutfitFavorito | null;
  prendas: Prenda[];
}

function formatearFechaLarga(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    const dia = d.getDate();
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const mesCorto = meses[d.getMonth()].slice(0, 3);
    return `guardado ${dia} ${mesCorto}`;
  } catch {
    return "guardado";
  }
}

export function MoodboardModal({
  isOpen,
  onClose,
  favorito,
  prendas,
}: MoodboardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { exportando, exportarElementoAPng } = useExportOutfit();

  if (!favorito) return null;

  const recon = reconstruirFavorito(favorito, prendas);

  const handleDescargar = () => {
    if (cardRef.current) {
      exportarElementoAPng(cardRef.current, `moodboard-${favorito.id}.png`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#F7F6F2] p-1 text-[#0E0E0E]">
        {/* Contenido a exportar en PNG (Excluye el botón de descarga) */}
        <div ref={cardRef} className="bg-[#F7F6F2] p-2">
          {/* Fecha en Monospace */}
          <div className="font-mono text-[10px] text-[#0E0E0E]/50 mb-3">
            {formatearFechaLarga(favorito.fecha)}
          </div>

          {/* Vista apilada grande de recortes */}
          <div className="flex justify-center my-4 py-2 bg-[#F7F6F2]">
            <div className="flex flex-col items-center justify-center space-y-[-10px] min-h-[220px]">
              {recon.outerwear && (
                <img
                  src={recon.outerwear.imagenUrl}
                  alt={recon.outerwear.nombre}
                  className="max-h-[90px] w-auto object-contain"
                />
              )}
              {recon.top && (
                <img
                  src={recon.top.imagenUrl}
                  alt={recon.top.nombre}
                  className="max-h-[85px] w-auto object-contain"
                />
              )}
              {recon.bottom && (
                <img
                  src={recon.bottom.imagenUrl}
                  alt={recon.bottom.nombre}
                  className="max-h-[105px] w-auto object-contain"
                />
              )}
              {recon.shoes && (
                <img
                  src={recon.shoes.imagenUrl}
                  alt={recon.shoes.nombre}
                  className="max-h-[60px] w-auto object-contain"
                />
              )}
            </div>
          </div>

          {/* Lista Tipo Ficha Técnica */}
          <div className="border-t border-[#E4E1D8] pt-3 flex flex-col gap-1.5 mb-2 font-mono text-xs text-[#0E0E0E]">
            <div className="flex justify-between">
              <span>01 outerwear</span>
              <span className="opacity-60">
                {recon.outerwear?.nombre || "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>02 top</span>
              <span className="opacity-60">{recon.top?.nombre || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>03 bottom</span>
              <span className="opacity-60">{recon.bottom?.nombre || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>04 shoes</span>
              <span className="opacity-60">{recon.shoes?.nombre || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>05 accesorios</span>
              <span className="opacity-60">
                {recon.accesorios.length > 0
                  ? recon.accesorios.map((a) => a.nombre).join(", ")
                  : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Botón Descargar en Cobalto (Excluido de la captura de PNG) */}
        <button
          type="button"
          onClick={handleDescargar}
          disabled={exportando}
          data-no-export="true"
          className="no-export w-full bg-transparent border border-[#1D1DE0] text-[#1D1DE0] text-xs font-sans py-2.5 mt-3 rounded-[2px] flex items-center justify-center gap-1.5 hover:bg-[#1D1DE0]/5 transition-colors cursor-pointer select-none disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          [ Descargar ]
        </button>
      </div>
    </Modal>
  );
}
