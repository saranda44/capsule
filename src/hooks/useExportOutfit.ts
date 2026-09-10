import { useState, useCallback } from "react";
import { toPng } from "html-to-image";

export function useExportOutfit() {
  const [exportando, setExportando] = useState(false);

  const exportarElementoAPng = useCallback(
    async (element: HTMLElement, nombreArchivo = "outfit-capsula.png") => {
      if (!element) return;
      try {
        setExportando(true);

        const dataUrl = await toPng(element, {
          backgroundColor: "#F7F6F2",
          quality: 0.95,
          pixelRatio: 2,
          cacheBust: true,
          filter: (node: HTMLElement) => {
            if (!node) return true;
            if (node.classList && node.classList.contains("no-export")) {
              return false;
            }
            if (node.getAttribute && node.getAttribute("data-no-export") === "true") {
              return false;
            }
            return true;
          },
        });

        const link = document.createElement("a");
        link.download = nombreArchivo;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Error al exportar imagen PNG:", err);
      } finally {
        setExportando(false);
      }
    },
    []
  );

  return {
    exportando,
    exportarElementoAPng,
  };
}
