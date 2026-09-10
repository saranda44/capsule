export type Categoria = "outerwear" | "top" | "bottom" | "shoes" | "accesorios";
export type Ocasion = "oficina" | "casual" | "salida";
export type TipoAccesorio = "bolsa" | "joyeria" | "cabeza" | "cinturon";

export interface Prenda {
  id: string;
  nombre: string;
  categoria: Categoria;
  ocasiones: Ocasion[];
  imagenUrl: string; // ruta local o data URL base64
  color?: string;
  tipoAccesorio?: TipoAccesorio;
}

export interface OutfitSlot {
  categoria: Categoria;
  prenda: Prenda | null;
  bloqueado: boolean;
}

export interface OutfitState {
  incluirOuterwear: boolean;
  outerwear: OutfitSlot | null;
  top: OutfitSlot;
  bottom: OutfitSlot;
  shoes: OutfitSlot;
  cantidadAccesorios: number; // 0-4
  accesorios: OutfitSlot[];
  ocasionActiva: Ocasion | "todos";
}

export interface OutfitFavorito {
  id: string;
  fecha: string; // ISO date
  outerwearId: string | null;
  topId: string;
  bottomId: string;
  shoesId: string;
  accesoriosIds: string[];
}
