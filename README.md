# Astropedia

Enciclopedia web en español para **Astroneer**. Reúne información sobre recursos, recetas, objetos imprimibles, vehículos, trenes, automatización y planetas en una interfaz de una sola página.

> Proyecto fan no oficial, sin afiliación, patrocinio ni respaldo de System Era Softworks.

## Funciones

- Navegación por recursos naturales, refinados, compuestos y gases.
- Consulta de recetas y árboles de fabricación.
- Catálogo de objetos, vehículos, trenes y piezas de automatización.
- Información de planetas y progresión tecnológica.
- Buscador global y filtro de objetos por tipo de impresora.
- Favoritos persistentes en el navegador mediante `localStorage`.
- Diseño adaptable para escritorio y móvil.

## Ejecutar el proyecto

No requiere instalación de dependencias ni proceso de compilación.

1. Abre `index.html` directamente en un navegador, o sírvelo desde un servidor estático.
2. Para desarrollo local con VS Code, puede usarse una extensión como Live Server.

## Estructura

```text
├── index.html       # Estructura de la aplicación y carga de recursos
├── css/
│   └── styles.css   # Estilos, diseño responsive y componentes visuales
├── js/
│   ├── data.js      # Datos de recursos, planetas, objetos y recetas
│   └── app.js       # Renderizado, navegación, búsqueda y favoritos
└── assets/          # Iconos e imágenes organizados por categoría
```

## Actualizar contenido

Los datos se mantienen en `js/data.js`. Para añadir o modificar un recurso, objeto o planeta, edita el arreglo correspondiente y conserva sus identificadores únicos, ya que se usan para enlazar recetas, detalles y resultados de búsqueda.

## Tecnologías

- HTML5
- CSS3
- JavaScript vanilla

## Créditos y licencia de contenido

La información está contrastada con la wiki oficial de Astroneer. Astroneer™, sus nombres, logotipos e imágenes relacionadas pertenecen a System Era Softworks.
