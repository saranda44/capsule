import type { Prenda, OutfitFavorito, Ocasion } from "@/types";
import prendasSeed from "@/data/prendas.seed.json";

const PRENDAS_KEY = "capsule-wardrobe:prendas";
const FAVORITOS_KEY = "capsule-wardrobe:favoritos";
const CONFIG_KEY = "capsule-wardrobe:config";

export interface ConfigStorage {
  ocasionActiva: Ocasion | "todos";
  incluirOuterwear: boolean;
  cantidadAccesorios: number;
}

export function obtenerPrendas(): Prenda[] {
  try {
    const data = localStorage.getItem(PRENDAS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error al leer prendas de localStorage", e);
  }
  // Si no existe, inicializar con prendas.seed.json
  const semilla = prendasSeed as Prenda[];
  guardarPrendas(semilla);
  return semilla;
}

export function guardarPrendas(prendas: Prenda[]): void {
  try {
    localStorage.setItem(PRENDAS_KEY, JSON.stringify(prendas));
  } catch (e) {
    console.error("Error al guardar prendas en localStorage", e);
  }
}

export function agregarPrendaStorage(prenda: Prenda): Prenda[] {
  const prendas = obtenerPrendas();
  const actualizadas = [prenda, ...prendas];
  guardarPrendas(actualizadas);
  return actualizadas;
}

export function eliminarPrendaStorage(id: string): Prenda[] {
  const prendas = obtenerPrendas();
  const actualizadas = prendas.filter((p) => p.id !== id);
  guardarPrendas(actualizadas);
  return actualizadas;
}

export function obtenerFavoritos(): OutfitFavorito[] {
  try {
    const data = localStorage.getItem(FAVORITOS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error al obtener favoritos de localStorage", e);
  }
  return [];
}

export function guardarFavoritos(favoritos: OutfitFavorito[]): void {
  try {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
  } catch (e) {
    console.error("Error al guardar favoritos en localStorage", e);
  }
}

export function obtenerConfigStorage(): ConfigStorage {
  try {
    const data = localStorage.getItem(CONFIG_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error al leer config de localStorage", e);
  }
  return {
    ocasionActiva: "todos",
    incluirOuterwear: true,
    cantidadAccesorios: 2,
  };
}

export function guardarConfigStorage(config: ConfigStorage): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Error al guardar config en localStorage", e);
  }
}
