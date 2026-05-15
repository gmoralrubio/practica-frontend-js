# Wallaclon — Práctica final módulo Frontend con JavaScript

Aplicación web de compraventa de artículos de segunda mano. Permite a usuarios registrados publicar, editar, eliminar y filtrar productos por nombre, precio y categoría.

Construida con **JavaScript vanilla** (ES Modules) siguiendo un patrón Modelo-Vista-Controlador con comunicación por eventos.

> [!WARNING]
> Esto es un **proyecto de práctica** y no está pensado para producción. La generación de HTML se realiza mediante `innerHTML` con datos de usuario sin sanitizar, lo que lo hace **vulnerable a XSS**. No despliegues esto en un entorno público.

## Requisitos

- Node.js v24+ (ver `.nvmrc`)
- [sparrest.js](https://github.com/kasappeal/sparrest.js) corriendo en `localhost:8000`

## Instalación

> [!NOTE]
> La instalación de dependencias solo es necesaria si se quieren modificar los estilos de Tailwind CSS o daisyUI. Si no necesitas tocar los estilos, puedes saltarte este paso — el CSS ya está compilado en `dist/styles.css`.

```bash
npm install
```

## Backend (API REST)

El proyecto consume una API REST provista por [sparrest.js](https://github.com/kasappeal/sparrest.js), con autenticación JWT. Para configurarlo:

```bash
# Clonar el repositorio
git clone https://github.com/kasappeal/sparrest.js.git

# Instalar dependencias
cd sparrest.js && npm install

# Reemplazar el archivo de datos por el del proyecto
cp ../wallapop-js/data/db.json ./data/db.json

# Arrancar en el puerto 8000
npm start
```

Endpoints disponibles:

### Autenticación

| Método | Ruta             | Descripción            | Auth |
| ------ | ---------------- | ---------------------- | ---- |
| POST   | `/auth/register` | Registrar usuario      | No   |
| POST   | `/auth/login`    | Iniciar sesión         | No   |
| GET    | `/auth/me`       | Obtener usuario actual | Sí   |

### Productos

| Método | Ruta                | Descripción         | Auth |
| ------ | ------------------- | ------------------- | ---- |
| GET    | `/api/products`     | Listar productos    | No   |
| GET    | `/api/products/:id` | Detalle de producto | No   |
| POST   | `/api/products`     | Crear producto      | Sí   |
| PATCH  | `/api/products/:id` | Actualizar producto | Sí   |
| DELETE | `/api/products/:id` | Eliminar producto   | Sí   |

Parámetros de consulta soportados por `GET /api/products`:

| Parámetro | Descripción          | Ejemplo         |
| --------- | -------------------- | --------------- |
| `_page`   | Número de página     | `?_page=2`      |
| `_limit`  | Productos por página | `?_limit=10`    |
| `_sort`   | Campo de ordenación  | `?_sort=price`  |
| `_order`  | Dirección del orden  | `?_order=asc`   |
| `q`       | Búsqueda por texto   | `?q=iphone`     |
| `_expand` | Incluir relación     | `?_expand=user` |

## Arrancar el proyecto

El punto de entrada es `public/index.html`. Al ser un proyecto con ES Modules (`type="module"`), necesita servirse desde un servidor HTTP (no funciona abriendo el archivo directamente desde el sistema de ficheros).

Se recomienda usar [live-server](https://www.npmjs.com/package/live-server):

```bash
npx live-server public
```

Alternativamente, cualquier otro servidor estático:

```bash
npx serve public
```

### CSS (Tailwind)

El proyecto está maquetado con Tailwind CSS v4 y componentes de [daisyUI](https://daisyui.com/). Para compilar los estilos:

```bash
# Una vez
npm run css:build

# En modo watch (recompila al guardar)
npm run css:watch
```

> [!NOTE]
> El CSS compilado se genera en `dist/styles.css`. Las páginas HTML ya hacen referencia a este archivo.

## Páginas disponibles

| Página                       | Descripción                                   | Auth |
| ---------------------------- | --------------------------------------------- | ---- |
| `index.html`                 | Listado de productos con filtros y paginación | No   |
| `product-detail.html?id=:id` | Detalle de producto, edición y eliminación    | No\* |
| `login.html`                 | Formulario de inicio de sesión                | No   |
| `signup.html`                | Formulario de registro de usuario             | No   |

> \* Ver y navegar productos no requiere autenticación. Para **editar o eliminar** un producto es necesario iniciar sesión y ser el propietario del mismo. Para **crear productos** también se requiere autenticación.

## Filtros de productos

Los productos se pueden filtrar por:

- **Búsqueda**: texto parcial sobre el nombre
- **Orden**: nombre ascendente/descendente o precio ascendente/descendente
- **Productos por página**: 5, 10 o 15

## Funcionamiento general

La página de inicio (`index.html`) muestra **todos los productos de todos los usuarios** sin necesidad de autenticación. Es una vista pública de todo el catálogo disponible.

Los usuarios pueden registrarse en `signup.html` e iniciar sesión en `login.html`. Una vez autenticados:

- Aparece el botón **"Añadir productos"** en la página principal, que abre un formulario modal para crear un nuevo producto.
- En la página de detalle de un producto propio aparecen los botones **"Editar"** y **"Eliminar"**, cada uno abriendo su formulario modal correspondiente.

La autenticación se gestiona mediante **JWT (Bearer token)** almacenado en `localStorage`. Las notificaciones entre navegaciones de página se pasan vía `sessionStorage`.

## Usuarios de prueba

Los datos de prueba incluyen dos usuarios:

| Nombre   | Email             | Contraseña |
| -------- | ----------------- | ---------- |
| John Doe | johndoe@email.com | 123123     |
| Admin    | admin@email.com   | 123123     |

## Estructura del proyecto

```
src/
├── app.css                         # Tailwind CSS + daisyUI + estilos personalizados
├── pages/                          # Orquestadores de página
│   ├── index.js                    # Página principal (listado + filtros + paginación)
│   ├── login.js                    # Página de login
│   ├── signup.js                   # Página de registro
│   └── product-detail.js           # Página de detalle de producto
├── modules/
│   ├── auth/                       # Módulos de autenticación
│   │   ├── login/                  #   Login (model + controller)
│   │   └── signup/                 #   Registro (model + controller)
│   ├── products/                   # Módulos de productos
│   │   ├── products-list/          #   Listado de productos
│   │   ├── product-detail/         #   Detalle, edición y eliminación
│   │   ├── new-product/            #   Creación de producto (modal)
│   │   ├── filters/                #   Filtros y búsqueda
│   │   └── pagination/             #   Paginación
│   └── session/                    # Gestión de sesión (navbar)
├── shared/                         # Componentes reutilizables
│   ├── loader/                     #   Spinner de carga
│   ├── notification/               #   Notificaciones (éxito/error/info)
│   └── session-notification/       #   Puente de notificaciones entre páginas via sessionStorage
└── utils/							# Utilidades
    └── utils.js                    #   formatNumberToEuro, debounce
public/
├── index.html                      # Página principal
├── login.html                      # Página de login
├── signup.html                     # Página de registro
├── product-detail.html             # Página de detalle
├── assets/                         # Recursos estáticos
└── dist/styles.css                 # CSS compilado
data/
└── db.json                         # Datos de prueba (usuarios + 20 productos)
```
