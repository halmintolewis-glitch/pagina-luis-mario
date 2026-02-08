// ===== VARIABLES DEL JUEGO =====
let puntos = Number(localStorage.getItem("puntos")) || 0;
let nivel = Number(localStorage.getItem("nivel")) || 1;
let skins = JSON.parse(localStorage.getItem("skins")) || ["normal"];
let skinActiva = localStorage.getItem("skinActiva") || "normal";
let paseDorado = JSON.parse(localStorage.getItem("paseDorado")) || false;

// ===== ELEMENTOS HTML =====
const puntosEl = document.getElementById("puntos");   // Muestra puntos
const nivelEl = document.getElementById("nivel");     // Muestra nivel
const skinEl = document.getElementById("skin");       // Skin activa
const juegoEl = document.getElementById("juego");     // Elemento del juego
const btnGanar = document.getElementById("btnGanar"); // Botón ganar puntos
const btnTienda = document.getElementById("btnTienda"); // Botón abrir tienda

// ===== FUNCIONES DE GUARDADO =====
function guardar() {
  localStorage.setItem("puntos", puntos);
  localStorage.setItem("nivel", nivel);
  localStorage.setItem("skins", JSON.stringify(skins));
  localStorage.setItem("skinActiva", skinActiva);
  localStorage.setItem("paseDorado", JSON.stringify(paseDorado));
}

// ===== FUNCIONES DE ACTUALIZACIÓN =====
function actualizarUI() {
  if (puntosEl) puntosEl.textContent = puntos;
  if (nivelEl) nivelEl.textContent = nivel;
  if (skinEl) skinEl.textContent = skinActiva;
  if (juegoEl) juegoEl.className = "juego " + skinActiva;
}

// ===== GANAR PUNTOS =====
function ganarPuntos(cantidad = 100) {
  puntos += cantidad;
  nivel = Math.floor(puntos / 1000) + 1; // sube de nivel cada 1000 puntos
  guardar();
  actualizarUI();
}

// ===== TIENDA =====
const tiendaSkins = [
  { nombre: "roja", precio: 500 },
  { nombre: "azul", precio: 1000 },
  { nombre: "dorada", precio: 45000, paseDorado: true }
];

function comprarSkin(nombre) {
  const skin = tiendaSkins.find(s => s.nombre === nombre);
  if (!skin) return alert("Skin no encontrada");
  
  if (skin.paseDorado) {
    if (paseDorado) return alert("Ya tienes el pase dorado");
    if (puntos < skin.precio) return alert("No tienes suficiente oro");
    paseDorado = true;
  } else {
    if (skins.includes(nombre)) return alert("Ya tienes esta skin");
    if (puntos < skin.precio) return alert("No tienes suficiente oro");
    skins.push(nombre);
  }
  
  puntos -= skin.precio;
  skinActiva = nombre;
  guardar();
  actualizarUI();
  alert("¡Skin comprada!");
}

function aplicarSkin(nombre) {
  if (!skins.includes(nombre)) return alert("No tienes esta skin");
  skinActiva = nombre;
  guardar();
  actualizarUI();
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
  actualizarUI();

  // Botón ganar puntos
  if (btnGanar) btnGanar.addEventListener("click", () => ganarPuntos(100));

  // Botón tienda (ejemplo simple)
  if (btnTienda) btnTienda.addEventListener("click", () => {
    let opciones = tiendaSkins.map(s => {
      return s.paseDorado 
        ? `${s.nombre} - ${s.precio} oro (pase dorado)` 
        : `${s.nombre} - ${s.precio} oro`;
    }).join("\n");
    
    const comprar = prompt("TIENDA:\n" + opciones + "\nEscribe el nombre de la skin que quieres comprar:");
    if (comprar) comprarSkin(comprar.trim());
  });
});
