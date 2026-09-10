import { motion } from "framer-motion";
import type { OutfitSlot } from "@/types";
import { PrendaLock } from "./PrendaLock";

interface OutfitReelProps {
  incluirOuterwear?: boolean;
  outerwear?: OutfitSlot | null;
  top?: OutfitSlot | null;
  bottom?: OutfitSlot | null;
  shoes?: OutfitSlot | null;
  accesorios?: OutfitSlot[];
  isSpinning?: boolean;
  onToggleLock?: (categoria: string, index?: number) => void;
}

export function OutfitReel({
  incluirOuterwear = true,
  outerwear = null,
  top = null,
  bottom = null,
  shoes = null,
  accesorios = [],
  isSpinning = false,
  onToggleLock,
}: OutfitReelProps) {
  return (
    <div className="relative flex flex-col items-center w-full max-w-[500px] mx-auto py-2 bg-[#F7F6F2]">
      {/* Carrete Central + Accesorios Flotantes */}
      <div className="relative flex justify-center items-center w-full min-h-[360px] py-4">
        
        {/* Accesorio Izquierda (0) */}
        {accesorios[0] && (
          <div className="absolute left-1 top-10 z-20 flex flex-col items-center gap-1">
            <motion.div
              animate={
                isSpinning && !accesorios[0].bloqueado
                  ? { x: [-20, 20, 0], opacity: [0.3, 1], filter: ["blur(4px)", "blur(0px)"] }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative w-16 h-16 flex items-center justify-center"
            >
              {accesorios[0].prenda ? (
                <img
                  src={accesorios[0].prenda.imagenUrl}
                  alt={accesorios[0].prenda.nombre}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="w-10 h-10 border border-dashed border-[#0E0E0E]/20 rounded flex items-center justify-center text-[10px] font-mono text-[#0E0E0E]/40">
                  sin item
                </div>
              )}
            </motion.div>
            <PrendaLock
              bloqueado={accesorios[0].bloqueado}
              onToggle={() => onToggleLock?.("accesorios", 0)}
              tag={accesorios[0].prenda?.tipoAccesorio || "accesorio"}
            />
          </div>
        )}

        {/* Accesorio Derecha (1) */}
        {accesorios[1] && (
          <div className="absolute right-1 top-10 z-20 flex flex-col items-center gap-1">
            <motion.div
              animate={
                isSpinning && !accesorios[1].bloqueado
                  ? { x: [20, -20, 0], opacity: [0.3, 1], filter: ["blur(4px)", "blur(0px)"] }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-16 h-16 flex items-center justify-center"
            >
              {accesorios[1].prenda ? (
                <img
                  src={accesorios[1].prenda.imagenUrl}
                  alt={accesorios[1].prenda.nombre}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="w-10 h-10 border border-dashed border-[#0E0E0E]/20 rounded flex items-center justify-center text-[10px] font-mono text-[#0E0E0E]/40">
                  sin item
                </div>
              )}
            </motion.div>
            <PrendaLock
              bloqueado={accesorios[1].bloqueado}
              onToggle={() => onToggleLock?.("accesorios", 1)}
              tag={accesorios[1].prenda?.tipoAccesorio || "accesorio"}
            />
          </div>
        )}

        {/* Accesorio Izquierda Abajo (2) */}
        {accesorios[2] && (
          <div className="absolute left-1 bottom-8 z-20 flex flex-col items-center gap-1">
            <motion.div
              animate={
                isSpinning && !accesorios[2].bloqueado
                  ? { x: [-20, 20, 0], opacity: [0.3, 1], filter: ["blur(4px)", "blur(0px)"] }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative w-14 h-14 flex items-center justify-center"
            >
              {accesorios[2].prenda && (
                <img
                  src={accesorios[2].prenda.imagenUrl}
                  alt={accesorios[2].prenda.nombre}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </motion.div>
            <PrendaLock
              bloqueado={accesorios[2].bloqueado}
              onToggle={() => onToggleLock?.("accesorios", 2)}
              tag={accesorios[2].prenda?.tipoAccesorio || "accesorio"}
            />
          </div>
        )}

        {/* Accesorio Derecha Abajo (3) */}
        {accesorios[3] && (
          <div className="absolute right-1 bottom-8 z-20 flex flex-col items-center gap-1">
            <motion.div
              animate={
                isSpinning && !accesorios[3].bloqueado
                  ? { x: [20, -20, 0], opacity: [0.3, 1], filter: ["blur(4px)", "blur(0px)"] }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-14 h-14 flex items-center justify-center"
            >
              {accesorios[3].prenda && (
                <img
                  src={accesorios[3].prenda.imagenUrl}
                  alt={accesorios[3].prenda.nombre}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </motion.div>
            <PrendaLock
              bloqueado={accesorios[3].bloqueado}
              onToggle={() => onToggleLock?.("accesorios", 3)}
              tag={accesorios[3].prenda?.tipoAccesorio || "accesorio"}
            />
          </div>
        )}

        {/* Columna Principal de Prendas Apiladas */}
        <div className="relative flex flex-col items-center justify-center w-[220px]">
          
          {/* Outerwear (si está activo) */}
          {incluirOuterwear && outerwear && (
            <div className="relative flex items-center justify-center w-full min-h-[85px] my-[-6px] group">
              <SlotSpinContainer spinning={isSpinning && !outerwear.bloqueado} delay={0.05}>
                {outerwear.prenda && (
                  <img
                    src={outerwear.prenda.imagenUrl}
                    alt={outerwear.prenda.nombre}
                    className="max-h-[105px] w-auto object-contain"
                  />
                )}
              </SlotSpinContainer>

              <div className="absolute right-[-10px] top-1 no-export" data-no-export="true">
                <PrendaLock
                  bloqueado={outerwear.bloqueado}
                  onToggle={() => onToggleLock?.("outerwear")}
                />
              </div>
            </div>
          )}

          {/* Top */}
          {top && (
            <div className="relative flex items-center justify-center w-full min-h-[85px] my-[-6px] group">
              <SlotSpinContainer spinning={isSpinning && !top.bloqueado} delay={0.1}>
                {top.prenda && (
                  <img
                    src={top.prenda.imagenUrl}
                    alt={top.prenda.nombre}
                    className="max-h-[105px] w-auto object-contain"
                  />
                )}
              </SlotSpinContainer>

              <div className="absolute right-[-10px] top-1 no-export" data-no-export="true">
                <PrendaLock
                  bloqueado={top.bloqueado}
                  onToggle={() => onToggleLock?.("top")}
                />
              </div>
            </div>
          )}

          {/* Bottom */}
          {bottom && (
            <div className="relative flex items-center justify-center w-full min-h-[100px] my-[-8px] group">
              <SlotSpinContainer spinning={isSpinning && !bottom.bloqueado} delay={0.18}>
                {bottom.prenda && (
                  <img
                    src={bottom.prenda.imagenUrl}
                    alt={bottom.prenda.nombre}
                    className="max-h-[125px] w-auto object-contain"
                  />
                )}
              </SlotSpinContainer>

              <div className="absolute right-[-10px] top-1 no-export" data-no-export="true">
                <PrendaLock
                  bloqueado={bottom.bloqueado}
                  onToggle={() => onToggleLock?.("bottom")}
                />
              </div>
            </div>
          )}

          {/* Shoes */}
          {shoes && (
            <div className="relative flex items-center justify-center w-full min-h-[65px] my-[-2px] group">
              <SlotSpinContainer spinning={isSpinning && !shoes.bloqueado} delay={0.25}>
                {shoes.prenda && (
                  <img
                    src={shoes.prenda.imagenUrl}
                    alt={shoes.prenda.nombre}
                    className="max-h-[70px] w-auto object-contain"
                  />
                )}
              </SlotSpinContainer>

              <div className="absolute right-[-10px] top-1 no-export" data-no-export="true">
                <PrendaLock
                  bloqueado={shoes.bloqueado}
                  onToggle={() => onToggleLock?.("shoes")}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Contenedor para animación tragamonedas horizontal por slot
function SlotSpinContainer({
  spinning,
  delay = 0,
  children,
}: {
  spinning: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center justify-center w-full">
      <motion.div
        animate={
          spinning
            ? {
                x: [-120, 80, -40, 0],
                scale: [0.85, 1.08, 0.95, 1],
                filter: ["blur(8px)", "blur(4px)", "blur(1px)", "blur(0px)"],
              }
            : { x: 0, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
        className="z-10 flex justify-center items-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
