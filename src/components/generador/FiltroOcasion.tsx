import type { Ocasion } from "@/types";

interface FiltroOcasionProps {
  ocasionActiva: Ocasion | "todos";
  onChangeOcasion: (ocasion: Ocasion | "todos") => void;
}

const opciones: Array<{ id: Ocasion | "todos"; label: string }> = [
  { id: "todos", label: "Todos" },
  { id: "oficina", label: "Oficina" },
  { id: "casual", label: "Casual" },
  { id: "salida", label: "Salida" },
];

export function FiltroOcasion({ ocasionActiva, onChangeOcasion }: FiltroOcasionProps) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs text-[#0E0E0E]">
      {opciones.map((opcion, index) => {
        const esActivo = ocasionActiva === opcion.id;
        return (
          <span key={opcion.id} className="inline-flex items-center">
            <button
              type="button"
              onClick={() => onChangeOcasion(opcion.id)}
              className={`transition-colors cursor-pointer ${
                esActivo
                  ? "text-[#1D1DE0] font-semibold underline underline-offset-2"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              {opcion.label}
            </button>
            {index < opciones.length - 1 && (
              <span className="mx-1 opacity-30 select-none">·</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
