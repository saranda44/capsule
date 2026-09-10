# Generador de Combinaciones — Capsule Wardrobe

Herramienta web para maximizar la versatilidad de un armario cápsula, generando combinaciones automáticas de outfits, con opción de bloquear prendas específicas y filtrar por ocasión.

---

## Características Principales

- **Generador de Carrete Animado**: Algoritmo de selección aleatoria con animación tipo tragamonedas (`framer-motion`) y desenfoque dinámico (`blur`) en piezas no bloqueadas.
- **Sistema de Bloqueo por Prenda (`PrendaLock`)**: Candados independientes por categoría (`outerwear`, `top`, `bottom`, `shoes`, `accesorios`) para congelar prendas específicas durante la generación.
- **Filtro por Ocasión**: Selección en tiempo real por contexto de uso (`oficina`, `casual`, `salida` o `todos`).
- **Controles de Composición**: Conmutador para incluir o excluir prendas de abrigo (`outerwear`) y selector numérico de accesorios (0 a 4).
- **Armario Personalizable**: Módulo para agregar prendas.
- **Gestión de Favoritos y Exportación a PNG**: Guardado de combinaciones y descarga en imagen.

---

## Stack Técnico

- **React 19**: Biblioteca de interfaz para la construcción de componentes reactivos y modulares.
- **Vite 8**: Herramienta de compilación y servidor de desarrollo ultrarrápido con HMR.
- **TypeScript**: Tipado estático estricto para garantizar consistencia en los modelos de datos.
- **Tailwind CSS v4**: Framework de utilidades CSS integrado mediante `@tailwindcss/vite` para estilos precisos.
- **Framer Motion**: Motor de animación utilizado para el movimiento del carrete de prendas.
- **Lucide React**: Conjunto de íconos vectores ligeros para candados, navegación y acciones.
- **html-to-image**: Conversión de elementos del DOM a archivos de imagen PNG descargables.

---

## Estructura del Proyecto

```text
src/
 ├─ data/
 │   └─ prendas.seed.json        # Catálogo inicial de 31 prendas de prueba
 ├─ types/
 │   └─ index.ts                 # Definición de interfaces de TypeScript (Prenda, OutfitSlot, OutfitState, OutfitFavorito)
 ├─ lib/
 │   ├─ storage.ts               # Persistencia de prendas, favoritos y configuración en localStorage
 │   ├─ generarOutfit.ts         # Algoritmo de generación de combinaciones puro
 │   ├─ reconstruirFavorito.ts   # Reconstrucción de favoritos por ID y tolerancia a prendas eliminadas
 │   ├─ imagenUtils.ts           # Compresión y escalado de imágenes a base64 (JPEG 300x300)
 │   └─ utils.ts                 # Función auxiliar cn() para fusión de clases de Tailwind
 ├─ hooks/
 │   ├─ useWardrobe.ts           # Hook para operaciones CRUD del armario cápsula
 │   ├─ useOutfitGenerator.ts    # Hook de control del generador, bloqueos y animación
 │   ├─ useFavoritos.ts          # Hook para gestión de combinaciones guardadas
 │   └─ useExportOutfit.ts       # Hook para exportación de elementos DOM a PNG
 ├─ components/
 │   ├─ layout/
 │   │   ├─ Tabs.tsx             # Barra superior con wordmark [ Capsule ], pestañas y botón de armario
 │   │   └─ Modal.tsx            # Diálogo modal reutilizable con overlay y cierre por tecla Esc
 │   ├─ generador/
 │   │   ├─ OutfitReel.tsx       # Carrete apilado de recortes con animación de tragamonedas
 │   │   ├─ PrendaLock.tsx       # Botón de candado individual por prenda (con exclusión en PNG)
 │   │   ├─ FiltroOcasion.tsx    # Selector en línea por ocasión de uso
 │   │   ├─ ToggleOuterwear.tsx  # Interruptor para activar/desactivar prendas de abrigo
 │   │   ├─ AccesoriosStepper.tsx# Control numérico para límite de accesorios (0 a 4)
 │   │   └─ AccionesOutfit.tsx   # Botones de guardar en favoritos y exportar PNG
 │   ├─ favoritos/
 │   │   ├─ FavoritosGrid.tsx    # Cuadrícula de 2 columnas para outfits guardados
 │   │   ├─ FavoritoCard.tsx     # Tarjeta individual con miniatura apilada y fecha
 │   │   ├─ FavoritosVacio.tsx   # Estado vacío con llamada a la acción para ir al generador
 │   │   └─ MoodboardModal.tsx   # Modal de vista ampliada con ficha técnica y descarga de PNG
 │   └─ armario/
 │       └─ ArmarioModal.tsx     # Modal para agregar prendas con input file y listar existentes
 ├─ views/
 │   ├─ GeneradorView.tsx        # Vista integradora del generador
 │   └─ FavoritosView.tsx        # Vista integradora de favoritos
 ├─ App.tsx                      # Componente raíz con control de pestaña activa
 └─ index.css                    # Configuración de Tailwind CSS y variables de tema
```

---

## Cómo Correrlo

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/saranda44/capsule 
   ```

2. Entrar a la carpeta del proyecto:
   ```bash
   cd capsule
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abrir la dirección URL mostrada en la terminal (`http://localhost:5173`).

---

## Mejoras Futuras

- **Sincronización en la Nube con Cuenta de Usuario**: Autenticación y almacenamiento remoto (ej. Supabase o Firebase) para sincronizar prendas y favoritos entre dispositivos.
- **Sugerencias IA**: Integración con IA para sugerir combinaciones según estilo personal.
- **Visualizador AR**: Experiencia interactiva para visualizar combinaciones sobre un maniquí o modelo digital.
- **Remoción Automática de Fondo**: Procesamiento para quitar el fondo a las fotos subidas.
