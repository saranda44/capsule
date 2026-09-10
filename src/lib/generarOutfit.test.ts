import { generarOutfit } from "./generarOutfit";
import prendasSeed from "../data/prendas.seed.json";
import type { Prenda, OutfitState } from "../types";

const prendas = prendasSeed as Prenda[];

console.log("=== INICIANDO PRUEBAS DE GENERAR OUTFIT ===");

const estadoInicial: OutfitState = {
  incluirOuterwear: true,
  outerwear: { categoria: "outerwear", prenda: null, bloqueado: false },
  top: { categoria: "top", prenda: null, bloqueado: false },
  bottom: { categoria: "bottom", prenda: null, bloqueado: false },
  shoes: { categoria: "shoes", prenda: null, bloqueado: false },
  cantidadAccesorios: 2,
  accesorios: [],
  ocasionActiva: "todos",
};

// Test 1: Generación básica
const outfit1 = generarOutfit(prendas, estadoInicial);
console.log("Test 1 - Outfit generado con outerwear:", {
  outerwear: outfit1.outerwear?.prenda?.nombre,
  top: outfit1.top.prenda?.nombre,
  bottom: outfit1.bottom.prenda?.nombre,
  shoes: outfit1.shoes.prenda?.nombre,
  accesoriosCount: outfit1.accesorios.length,
  accesorios: outfit1.accesorios.map((a) => a.prenda?.nombre),
});

if (!outfit1.top.prenda || !outfit1.bottom.prenda || !outfit1.shoes.prenda) {
  throw new Error("Test 1 Falló: slots obligatorios no fueron asignados.");
}

// Test 2: Bloqueo de prenda
const topBloqueado = outfit1.top.prenda;
const estadoConBloqueo: OutfitState = {
  ...outfit1,
  top: { ...outfit1.top, bloqueado: true },
};

const outfit2 = generarOutfit(prendas, estadoConBloqueo);
console.log("Test 2 - Top bloqueado mantenido:", outfit2.top.prenda?.nombre);

if (outfit2.top.prenda?.id !== topBloqueado.id) {
  throw new Error("Test 2 Falló: la prenda bloqueada no fue mantenida.");
}

// Test 3: No repetir tipos de accesorios
const accesoriosTipos = outfit1.accesorios
  .map((a) => a.prenda?.tipoAccesorio)
  .filter(Boolean);
const tiposUnicos = new Set(accesoriosTipos);
console.log("Test 3 - Tipos de accesorios únicos:", Array.from(tiposUnicos));

if (accesoriosTipos.length !== tiposUnicos.size) {
  throw new Error("Test 3 Falló: se repitieron tipos de accesorio.");
}

// Test 4: Desactivar outerwear
const estadoSinOuterwear: OutfitState = {
  ...estadoInicial,
  incluirOuterwear: false,
};
const outfit4 = generarOutfit(prendas, estadoSinOuterwear);
console.log("Test 4 - Outerwear desactivado:", outfit4.outerwear);

if (outfit4.outerwear !== null) {
  throw new Error("Test 4 Falló: outerwear debió ser null.");
}

console.log("=== TODAS LAS PRUEBAS PASARON CORRECTAMENTE ===");
