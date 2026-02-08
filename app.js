// ===== VARIABLES =====
let dinero = Number(localStorage.getItem("dinero")) || 0;
let nivel = Number(localStorage.getItem("nivel")) || 1;
let edificios = JSON.parse(localStorage.getItem("edificios")) || {
  oficina: 0,
  banco: 0,
  torre: 0
};

// ===== ELEMENTOS HTML =====
const dineroEl = document.getElementById("dinero");
const nivelEl = document.getElementById("nivel");

// ===== FUNCIONES =====
function guardar(){
  localStorage.setItem("dinero", dinero);
  localStorage.setItem("nivel", nivel);
  localStorage.setItem("edificios", JSON.stringify(edificios));
}

function actualizarUI(){
  dineroEl.textContent = dinero;
  nivelEl.textContent = nivel;
}

// ===== INGRESOS AUTOMÁTICOS =====
function ingresosAutomáticos(){
  let ingreso = edificios.oficina * 10 + edificios.banco * 100 + edificios.torre * 1000;
  dinero += ingreso;
  nivel = Math.floor(dinero / 1000) + 1;
  guardar();
  actualizarUI();
}

// Cada segundo se suman ingresos
setInterval(ingresosAutomáticos, 1000);

// ===== COMPRAR EDIFICIOS =====
const botones = document.querySelectorAll(".buy-btn");

botones.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const edificio = btn.dataset.edificio;
    const precio = Number(btn.dataset.precio);

    if(dinero >= precio){
      dinero -= precio;
      edificios[edificio]++;
      guardar();
      actualizarUI();
      alert(`Compraste ${edificio}!`);
    }else{
      alert("No tienes suficiente dinero!");
    }
  });
});

// Inicializa UI
actualizarUI();
