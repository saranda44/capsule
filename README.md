# Capsule

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
capsule/
 ├─ app/                         # Aplicación React + Vite
 │   ├─ src/                     # Código fuente (componentes, vistas, hooks y librerías)
 │   ├─ public/                  # Recursos estáticos
 │   ├─ package.json             # Dependencias de React y scripts
 │   └─ vite.config.ts           # Configuración de compilación Vite
 └─ infra/                       # Infraestructura como Código (Terraform)
     ├─ main.tf                  # Definición de recursos en AWS (EC2, Security Groups)
     ├─ variables.tf             # Variables de configuración (Perfil AWS, CIDR SSH, URL del repo)
     ├─ outputs.tf               # Salidas públicas (IP, DNS, comando SSH y URL web)
     ├─ versions.tf              # Versión requerida de Terraform y Backend S3
     └─ user_data.sh.tftpl       # Script de aprovisionamiento de EC2 (Nginx + Node.js + Build de React)
```

---

## Cómo Correrlo

### 1. Aplicación Frontend (React + Vite)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/saranda44/capsule.git
   cd capsule
   ```

2. Entrar a la carpeta de la aplicación:
   ```bash
   cd app
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

5. Abrir la dirección URL mostrada en la terminal (`http://localhost:5173`).

---

### 2. Infraestructura en AWS (Terraform)

1. Entrar a la carpeta de infraestructura:
   ```bash
   cd infra
   ```

2. Inicializar los proveedores de Terraform:
   ```bash
   terraform init
   ```

3. (Opcional) Validar la sintaxis de la configuración:
   ```bash
   terraform validate
   ```

4. Visualizar el plan de despliegue:
   ```bash
   terraform plan
   ```

5. Aplicar la infraestructura en AWS (crea la instancia EC2, instala Nginx/Node.js, clona el repo y despliega la app de `app/`):
   ```bash
   terraform apply
   ```

6. Al finalizar, obtendrás en la consola los valores de `web_url` para acceder a la app web y `ssh_command` para conectarte al servidor.

7. Para destruir los recursos creados en AWS:
   ```bash
   terraform destroy
   ```

---

## Mejoras Futuras

- **Sincronización en la Nube con Cuenta de Usuario**: Autenticación y almacenamiento remoto (ej. Supabase o Firebase) para sincronizar prendas y favoritos entre dispositivos.
- **Sugerencias IA**: Integración con IA para sugerir combinaciones según estilo personal.
- **Visualizador AR**: Experiencia interactiva para visualizar combinaciones sobre un maniquí o modelo digital.
- **Remoción Automática de Fondo**: Procesamiento para quitar el fondo a las fotos subidas.
