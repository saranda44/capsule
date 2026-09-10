import type { Prenda, TipoAccesorio, OutfitState, OutfitSlot } from "@/types";

function getRandomItem<T>(arr: T[]): T | null {
  if (!arr || arr.length === 0) return null;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function generarOutfit(prendas: Prenda[], estadoActual: OutfitState): OutfitState {
  const { ocasionActiva, incluirOuterwear, cantidadAccesorios } = estadoActual;

  // Filtrar candidatas por categoría u ocasión
  const esOcasionValida = (prenda: Prenda): boolean => {
    if (ocasionActiva === "todos") return true;
    return prenda.ocasiones.includes(ocasionActiva);
  };

  // 1. Outerwear
  let outerwearSlot: OutfitSlot | null = null;
  if (incluirOuterwear) {
    if (estadoActual.outerwear?.bloqueado && estadoActual.outerwear.prenda) {
      outerwearSlot = estadoActual.outerwear;
    } else {
      const candidatas = prendas.filter(
        (p) => p.categoria === "outerwear" && esOcasionValida(p)
      );
      const seleccionada = getRandomItem(candidatas);
      outerwearSlot = {
        categoria: "outerwear",
        prenda: seleccionada,
        bloqueado: false,
      };
    }
  }

  // 2. Top
  let topSlot: OutfitSlot;
  if (estadoActual.top.bloqueado && estadoActual.top.prenda) {
    topSlot = estadoActual.top;
  } else {
    const candidatas = prendas.filter(
      (p) => p.categoria === "top" && esOcasionValida(p)
    );
    const seleccionada = getRandomItem(candidatas);
    topSlot = {
      categoria: "top",
      prenda: seleccionada,
      bloqueado: false,
    };
  }

  // 3. Bottom
  let bottomSlot: OutfitSlot;
  if (estadoActual.bottom.bloqueado && estadoActual.bottom.prenda) {
    bottomSlot = estadoActual.bottom;
  } else {
    const candidatas = prendas.filter(
      (p) => p.categoria === "bottom" && esOcasionValida(p)
    );
    const seleccionada = getRandomItem(candidatas);
    bottomSlot = {
      categoria: "bottom",
      prenda: seleccionada,
      bloqueado: false,
    };
  }

  // 4. Shoes
  let shoesSlot: OutfitSlot;
  if (estadoActual.shoes.bloqueado && estadoActual.shoes.prenda) {
    shoesSlot = estadoActual.shoes;
  } else {
    const candidatas = prendas.filter(
      (p) => p.categoria === "shoes" && esOcasionValida(p)
    );
    const seleccionada = getRandomItem(candidatas);
    shoesSlot = {
      categoria: "shoes",
      prenda: seleccionada,
      bloqueado: false,
    };
  }

  // 5. Accesorios
  const nuevosAccesorios: OutfitSlot[] = [];
  const tiposUsados = new Set<TipoAccesorio>();

  // Identificar primero los accesorios bloqueados para reservar sus tipos
  for (let i = 0; i < cantidadAccesorios; i++) {
    const slotExistente = estadoActual.accesorios[i];
    if (slotExistente && slotExistente.bloqueado && slotExistente.prenda) {
      if (slotExistente.prenda.tipoAccesorio) {
        tiposUsados.add(slotExistente.prenda.tipoAccesorio);
      }
    }
  }

  // Generar cada slot de accesorio
  for (let i = 0; i < cantidadAccesorios; i++) {
    const slotExistente = estadoActual.accesorios[i];
    if (slotExistente && slotExistente.bloqueado && slotExistente.prenda) {
      nuevosAccesorios.push(slotExistente);
    } else {
      const candidatas = prendas.filter((p) => {
        if (p.categoria !== "accesorios") return false;
        if (!esOcasionValida(p)) return false;
        if (p.tipoAccesorio && tiposUsados.has(p.tipoAccesorio)) return false;
        return true;
      });

      const seleccionada = getRandomItem(candidatas);
      if (seleccionada) {
        if (seleccionada.tipoAccesorio) {
          tiposUsados.add(seleccionada.tipoAccesorio);
        }
        nuevosAccesorios.push({
          categoria: "accesorios",
          prenda: seleccionada,
          bloqueado: false,
        });
      } else {
        nuevosAccesorios.push({
          categoria: "accesorios",
          prenda: null,
          bloqueado: false,
        });
      }
    }
  }

  return {
    ...estadoActual,
    outerwear: outerwearSlot,
    top: topSlot,
    bottom: bottomSlot,
    shoes: shoesSlot,
    accesorios: nuevosAccesorios,
  };
}
