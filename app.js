// ===== VARIABLES =====
let dinero = Number(localStorage.getItem("dinero")) || 0;
let nivel = Number(localStorage.getItem("nivel")) || 1;
let edificios = JSON.parse(localStorage.getItem("edificios")) || {
  oficina: 0,
  banco: 0,
  torre: 0
};

// ===== ELEMENTOS =====
const dineroEl = document.getElementById("dinero");
const nivelEl = document.getElementById("nivel");
const progresoEl = document.getElementById("progreso-nivel");
const juegoDiv = document.getElementById("juego");

// ===== FUNCIONES =====
function guardar(){
  localStorage.setItem("dinero", dinero);
  localStorage.setItem("nivel", nivel);
  localStorage.setItem("edificios", JSON.stringify(edificios));
}

function actualizarUI(){
  dineroEl.textContent = dinero;
  nivelEl.textContent = nivel;
  let progreso = (dinero % 1000) / 1000 * 100;
  progresoEl.style.width = progreso + "%";

  // actualizar edificios visuales
  juegoDiv.innerHTML = "";
  for(let tipo in edificios){
    for(let i=0;i<edificios[tipo];i++){
      const div = document.createElement("div");
      div.className = "edificio comprado";
      if(tipo=="oficina") div.textContent="🏢";
      if(tipo=="banco") div.textContent="🏦";
      if(tipo=="torre") div.textContent="🌆";
      juegoDiv.appendChild(div);
    }
  }
}

// ===== INGRESOS AUTOMÁTICOS =====
function ingresos(){
  dinero += edificios.oficina*10 + edificios.banco*100 + edificios.torre*1000;
  nivel = Math.floor(dinero/1000)+1;
  guardar();
  actualizarUI();
}
setInterval(ingresos,1000);

// ===== COMPRAR EDIFICIOS =====
const botones = document.querySelectorAll(".buy-btn");
botones.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const edificio = btn.dataset.edificio;
    const precio = Number(btn.dataset.precio);
    if(dinero>=precio){
      dinero-=precio;
      edificios[edificio]++;
      guardar();
      actualizarUI();
    }else{
      alert("No tienes suficiente dinero!");
    }
  });
});

// ===== INICIALIZACIÓN =====
actualizarUI();
