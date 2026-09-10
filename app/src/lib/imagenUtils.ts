export function procesarImagenArchivo(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const MAX_SIZE = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto 2D del canvas"));
          return;
        }

        // Fondo transparente o blanco limpio
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a Data URL JPEG calidad 0.8
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        resolve(dataUrl);
      };

      img.onerror = () => {
        reject(new Error("Error al cargar la imagen seleccionada"));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Error al leer el archivo de imagen"));
    };

    reader.readAsDataURL(file);
  });
}
