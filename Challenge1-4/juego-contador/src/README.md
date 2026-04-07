# JuegoContador ⚡

Juego web desarrollado en React como parte de un challenge técnico para el puesto de **Desarrollador FrontEnd React Junior**.

## Descripción

JuegoContador es un juego simple donde el objetivo es hacer la mayor cantidad de clicks posible en un botón durante **5 segundos**. La aplicación registra el puntaje máximo durante la sesión del navegador.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) versión **16 o superior**
- npm (incluido con Node.js)

---

## Cómo correr el proyecto localmente

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd JuegoContador

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000).

---

## Estructura del proyecto

```
src/
├── hooks/
│   └── useGameLogic.js      # Lógica del juego separada en un custom hook
├── components/
│   ├── CountdownDisplay.js  # Muestra la cuenta regresiva (Preparados / Listos / Ya)
│   ├── CountdownDisplay.css
│   ├── ScorePanel.js        # Panel con clicks actuales, tiempo y récord
│   ├── ScorePanel.css
│   ├── ResultBanner.js      # Banner de resultado al finalizar la partida
│   └── ResultBanner.css
├── App.js                   # Componente raíz
├── App.css                  # Estilos globales del juego
├── index.js                 # Entry point
└── index.css                # Reset y variables CSS
```

---

## Decisiones técnicas y supuestos

- **Custom Hook (`useGameLogic`)**: toda la lógica de estados e intervalos fue extraída a un hook personalizado para mantener el componente `App` limpio y separar responsabilidades.

- **Fases del juego (`PHASE`)**: se modeló el flujo del juego como una máquina de estados con cuatro fases: `idle`, `countdown`, `playing` y `finished`. Esto facilita el razonamiento sobre el comportamiento y evita condiciones booleanas combinadas.

- **Manejo de intervalos**: se utilizan `useRef` para almacenar las referencias a `setInterval`, garantizando que los cleanups se realicen correctamente y evitando memory leaks.

- **Puntaje máximo por sesión**: el récord se mantiene en el estado de React. No se persistió en `localStorage` por simplicidad, aunque sería una mejora trivial de implementar.

- **Accesibilidad**: los botones incluyen atributos `aria-label` y el diseño mantiene contraste adecuado para legibilidad.

- **Diseño visual**: se eligió una estética retro-futurista / arcade con tipografías expresivas (Black Ops One + Rajdhani), efectos de glow y una paleta oscura para hacer la experiencia más inmersiva y diferenciadora.
