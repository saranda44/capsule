import { Shirt } from "lucide-react";

interface TabsProps {
  tabActivo: "generador" | "favoritos";
  onChangeTab: (tab: "generador" | "favoritos") => void;
  cantidadFavoritos: number;
  onOpenArmario?: () => void;
}

export function Tabs({
  tabActivo,
  onChangeTab,
  cantidadFavoritos,
  onOpenArmario,
}: TabsProps) {
  return (
    <div className="flex justify-between items-center w-full mb-6 pb-2 border-b border-[#E4E1D8]">
      {/* Wordmark y botón Armario */}
      <div className="flex items-center gap-3">
        <span
          onClick={() => onChangeTab("generador")}
          className="text-[15px] text-[#1D1DE0] tracking-wide font-normal select-none cursor-pointer"
        >
          [ Capsule ]
        </span>
        {onOpenArmario && (
          <button
            type="button"
            onClick={onOpenArmario}
            className="flex items-center gap-1 font-mono text-xs text-[#0E0E0E]/70 hover:text-[#1D1DE0] border border-[#0E0E0E]/20 hover:border-[#1D1DE0] px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer"
            title="Abrir gestión de armario"
          >
            <Shirt className="w-3 h-3" />
            <span>armario</span>
          </button>
        )}
      </div>

      {/* Pestañas de Navegación */}
      <div className="flex gap-4 font-mono text-xs select-none">
        <button
          type="button"
          onClick={() => onChangeTab("generador")}
          className={`transition-colors cursor-pointer ${
            tabActivo === "generador"
              ? "text-[#1D1DE0] border-b border-[#1D1DE0] pb-0.5 font-medium"
              : "text-[#0E0E0E]/40 hover:text-[#0E0E0E]"
          }`}
        >
          Generador
        </button>

        <button
          type="button"
          onClick={() => onChangeTab("favoritos")}
          className={`transition-colors cursor-pointer ${
            tabActivo === "favoritos"
              ? "text-[#1D1DE0] border-b border-[#1D1DE0] pb-0.5 font-medium"
              : "text-[#0E0E0E]/40 hover:text-[#0E0E0E]"
          }`}
        >
          Favoritos ({cantidadFavoritos})
        </button>
      </div>
    </div>
  );
}
