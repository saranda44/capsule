import { useRef } from "react";
import { useWardrobe } from "@/hooks/useWardrobe";
import { useOutfitGenerator } from "@/hooks/useOutfitGenerator";
import { useFavoritos } from "@/hooks/useFavoritos";
import { OutfitReel } from "@/components/generador/OutfitReel";
import { ToggleOuterwear } from "@/components/generador/ToggleOuterwear";
import { AccesoriosStepper } from "@/components/generador/AccesoriosStepper";
import { FiltroOcasion } from "@/components/generador/FiltroOcasion";
import { AccionesOutfit } from "@/components/generador/AccionesOutfit";

export function GeneradorView() {
  const { prendas } = useWardrobe();
  const { guardarFavorito, esFavorito } = useFavoritos();
  const reelRef = useRef<HTMLDivElement>(null);

  const {
    outfitState,
    isSpinning,
    generar,
    toggleLock,
    setIncluirOuterwear,
    setCantidadAccesorios,
    setOcasionActiva,
  } = useOutfitGenerator(prendas);

  // Calcular número de prendas no nulas en el outfit activo
  const contarPrendasValidas = () => {
    let total = 0;
    if (outfitState.incluirOuterwear && outfitState.outerwear?.prenda) total++;
    if (outfitState.top.prenda) total++;
    if (outfitState.bottom.prenda) total++;
    if (outfitState.shoes.prenda) total++;
    outfitState.accesorios.forEach((a) => {
      if (a.prenda) total++;
    });
    return total;
  };

  const prendasCount = contarPrendasValidas();
  const puedeGuardarOExportar = prendasCount >= 2;
  const estaEnFavoritos = esFavorito(outfitState);

  return (
    <div className="w-full max-w-[520px] mx-auto bg-[#F7F6F2] font-sans">
      {/* Barra de Filtro de Ocasión y Toggle de Outerwear */}
      <div className="flex justify-between items-center mb-3 px-1">
        <FiltroOcasion
          ocasionActiva={outfitState.ocasionActiva}
          onChangeOcasion={setOcasionActiva}
        />
        <ToggleOuterwear
          incluirOuterwear={outfitState.incluirOuterwear}
          onToggle={() => setIncluirOuterwear(!outfitState.incluirOuterwear)}
        />
      </div>

      {/* Outfit Reel con recortes y animaciones */}
      <div ref={reelRef} className="bg-[#F7F6F2] p-2">
        <OutfitReel
          incluirOuterwear={outfitState.incluirOuterwear}
          outerwear={outfitState.outerwear}
          top={outfitState.top}
          bottom={outfitState.bottom}
          shoes={outfitState.shoes}
          accesorios={outfitState.accesorios}
          isSpinning={isSpinning}
          onToggleLock={toggleLock}
        />
      </div>

      {/* Botón Principal Generar */}
      <div className="flex justify-center my-4">
        <button
          type="button"
          onClick={generar}
          disabled={isSpinning}
          className="bg-transparent border border-[#1D1DE0] text-[#1D1DE0] text-xs font-sans px-6 py-2 rounded-[2px] hover:bg-[#1D1DE0]/5 transition-colors cursor-pointer select-none disabled:opacity-50"
        >
          [ Generar ↻ ]
        </button>
      </div>

      {/* Stepper de Accesorios */}
      <AccesoriosStepper
        cantidad={outfitState.cantidadAccesorios}
        onChange={setCantidadAccesorios}
      />

      {/* Botones de Acción */}
      <AccionesOutfit
        onGuardarFavorito={() => guardarFavorito(outfitState)}
        esFavorito={estaEnFavoritos}
        deshabilitado={!puedeGuardarOExportar}
        reelElementRef={reelRef}
      />
    </div>
  );
}
