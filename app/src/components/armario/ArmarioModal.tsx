import { useState } from "react";
import { Modal } from "@/components/layout/Modal";
import type { Prenda, Categoria, Ocasion, TipoAccesorio } from "@/types";
import { procesarImagenArchivo } from "@/lib/imagenUtils";
import { Trash2, Plus, RefreshCw } from "lucide-react";

interface ArmarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  prendas: Prenda[];
  onAgregarPrenda: (prenda: Prenda) => void;
  onEliminarPrenda: (id: string) => void;
  onRestablecerSemilla?: () => void;
}

export function ArmarioModal({
  isOpen,
  onClose,
  prendas,
  onAgregarPrenda,
  onEliminarPrenda,
  onRestablecerSemilla,
}: ArmarioModalProps) {
  const [modoCrear, setModoCrear] = useState(false);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("top");
  const [tipoAccesorio, setTipoAccesorio] = useState<TipoAccesorio>("joyeria");
  const [ocasiones, setOcasiones] = useState<Ocasion[]>(["casual"]);
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null);
  const [previsualizacion, setPrevisualizacion] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSeleccionarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoImagen(file);
      const url = URL.createObjectURL(file);
      setPrevisualizacion(url);
    }
  };

  const toggleOcasion = (o: Ocasion) => {
    if (ocasiones.includes(o)) {
      if (ocasiones.length > 1) {
        setOcasiones(ocasiones.filter((x) => x !== o));
      }
    } else {
      setOcasiones([...ocasiones, o]);
    }
  };

  const handleGuardarNuevaPrenda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !archivoImagen) return;

    try {
      setCargando(true);
      const dataUrl = await procesarImagenArchivo(archivoImagen);
      const slug = nombre
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-");
      const id = `${slug}-${Date.now()}`;

      const nuevaPrenda: Prenda = {
        id,
        nombre: nombre.trim(),
        categoria,
        ocasiones,
        imagenUrl: dataUrl,
        ...(categoria === "accesorios" ? { tipoAccesorio } : {}),
      };

      onAgregarPrenda(nuevaPrenda);
      // Limpiar form
      setNombre("");
      setArchivoImagen(null);
      setPrevisualizacion(null);
      setModoCrear(false);
    } catch (err) {
      console.error("Error al procesar prenda nueva", err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gestión de Armario Cápsula">
      <div className="space-y-4">
        {/* Acciones principales */}
        <div className="flex justify-between items-center border-b border-[#E4E1D8] pb-3">
          <span className="font-mono text-xs text-[#0E0E0E]">
            Prendas guardadas ({prendas.length})
          </span>
          <button
            type="button"
            onClick={() => setModoCrear(!modoCrear)}
            className="flex items-center gap-1 text-xs border border-[#1D1DE0] text-[#1D1DE0] px-2.5 py-1 rounded-[2px] hover:bg-[#1D1DE0]/5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            {modoCrear ? "Ver lista" : "Nueva prenda"}
          </button>
        </div>

        {/* Formulario de Nueva Prenda */}
        {modoCrear ? (
          <form onSubmit={handleGuardarNuevaPrenda} className="space-y-3.5 py-2">
            <div>
              <label className="block font-mono text-[11px] text-[#0E0E0E] mb-1">
                Nombre de la prenda:
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="ej. Blazer negro de lino"
                className="w-full bg-[#FFF] border border-[#0E0E0E]/20 text-xs p-2 rounded-[2px] focus:outline-none focus:border-[#1D1DE0]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-mono text-[11px] text-[#0E0E0E] mb-1">
                  Categoría:
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as Categoria)}
                  className="w-full bg-[#FFF] border border-[#0E0E0E]/20 text-xs p-2 rounded-[2px] focus:outline-none"
                >
                  <option value="outerwear">outerwear</option>
                  <option value="top">top</option>
                  <option value="bottom">bottom</option>
                  <option value="shoes">shoes</option>
                  <option value="accesorios">accesorios</option>
                </select>
              </div>

              {categoria === "accesorios" && (
                <div>
                  <label className="block font-mono text-[11px] text-[#0E0E0E] mb-1">
                    Tipo Accesorio:
                  </label>
                  <select
                    value={tipoAccesorio}
                    onChange={(e) => setTipoAccesorio(e.target.value as TipoAccesorio)}
                    className="w-full bg-[#FFF] border border-[#0E0E0E]/20 text-xs p-2 rounded-[2px] focus:outline-none"
                  >
                    <option value="bolsa">bolsa</option>
                    <option value="joyeria">joyeria</option>
                    <option value="cabeza">cabeza</option>
                    <option value="cinturon">cinturon</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#0E0E0E] mb-1">
                Ocasiones válidas:
              </label>
              <div className="flex gap-2 font-mono text-xs">
                {(["oficina", "casual", "salida"] as Ocasion[]).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => toggleOcasion(o)}
                    className={`px-2 py-1 rounded-[2px] border transition-colors ${
                      ocasiones.includes(o)
                        ? "border-[#1D1DE0] bg-[#1D1DE0]/10 text-[#1D1DE0]"
                        : "border-[#0E0E0E]/20 text-[#0E0E0E]/50"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#0E0E0E] mb-1">
                Imagen (transparente PNG / JPG):
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleSeleccionarArchivo}
                className="w-full text-xs font-mono text-[#0E0E0E]"
              />
              {previsualizacion && (
                <div className="mt-2 flex justify-center p-2 bg-[#FFF] border border-[#E4E1D8] rounded-[2px]">
                  <img
                    src={previsualizacion}
                    alt="Previsualización"
                    className="h-20 object-contain"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={cargando || !archivoImagen || !nombre.trim()}
              className="w-full bg-[#1D1DE0] text-[#FFF] text-xs font-sans py-2 rounded-[2px] hover:bg-[#1D1DE0]/90 transition-colors disabled:opacity-50"
            >
              {cargando ? "Procesando..." : "Guardar prenda en armario"}
            </button>
          </form>
        ) : (
          /* Lista de prendas */
          <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1">
            {prendas.map((prenda) => (
              <div
                key={prenda.id}
                className="flex items-center justify-between p-2 bg-[#FFF] border border-[#E4E1D8] rounded-[2px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#F7F6F2] p-1 rounded">
                    <img
                      src={prenda.imagenUrl}
                      alt={prenda.nombre}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#0E0E0E]">
                      {prenda.nombre}
                    </div>
                    <div className="font-mono text-[10px] text-[#0E0E0E]/50">
                      {prenda.categoria} {prenda.tipoAccesorio ? `(${prenda.tipoAccesorio})` : ""} · {prenda.ocasiones.join(", ")}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onEliminarPrenda(prenda.id)}
                  className="text-[#0E0E0E]/40 hover:text-red-600 p-1.5 transition-colors"
                  title="Eliminar prenda"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botón Restablecer Semilla */}
        {onRestablecerSemilla && (
          <div className="pt-2 border-t border-[#E4E1D8] flex justify-end">
            <button
              type="button"
              onClick={onRestablecerSemilla}
              className="flex items-center gap-1 font-mono text-[10px] text-[#0E0E0E]/50 hover:text-[#0E0E0E] transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Restablecer 31 prendas iniciales
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
