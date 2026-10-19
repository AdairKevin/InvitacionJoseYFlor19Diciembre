/* Time */
const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date("Dec 19, 2026 17:50:00").getTime(),
  x = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("dias").innerText = 0;
      document.getElementById("horas").innerText = 0;
      document.getElementById("minutos").innerText = 0;
      document.getElementById("segundos").innerText = 0;
      console.log("¡El tiempo ha terminado!");
      return; // Termina la ejecución de la función
    }

    const dias = Math.floor(distance / day);
    const horas = Math.floor((distance % day) / hour);
    const minutos = Math.floor((distance % hour) / minute);
    const segundos = Math.floor((distance % minute) / second);

    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;

    console.log(dias, horas, minutos, segundos);
  }, second);

if (segundos == 0) {
  (document.getElementById("dias").innerText = "00"),
    (document.getElementById("horas").innerText = "00"),
    (document.getElementById("minutos").innerText = "00"),
    (document.getElementById("segundos").innerText = "00");
}

/* music */
var music = document.getElementById("music");
var isPlaying = false;
music.volume = 0.5;

function togglePlay() {
  if (isPlaying) {
    music.pause();
  } else {
    music.play();
  }
}

music.onplaying = function () {
  isPlaying = true;
  document.getElementById("music-animation").classList.add("on");
};
music.onpause = function () {
  isPlaying = false;
  document.getElementById("music-animation").classList.remove("on");
};

var button = document.getElementById("toggle");

button.addEventListener(
  "click",
  function () {
    if (button.getAttribute("data-text-swap") == button.innerHTML) {
      button.innerHTML = button.getAttribute("data-text-original");
    } else {
      button.setAttribute("data-text-original", button.innerHTML);
      button.innerHTML = button.getAttribute("data-text-swap");
    }
  },
  false
);

/* galería */
const sliderTrack = document.getElementById("sliderTrack");
if (sliderTrack) {
  const total = sliderTrack.children.length;
  const contenedor = sliderTrack.parentElement;
  let actual = 0;
  const ajustarAltura = () => {
    const alto = sliderTrack.children[actual].offsetHeight;
    if (alto) contenedor.style.height = alto + "px";
  };
  window.addEventListener("load", ajustarAltura);
  window.addEventListener("resize", ajustarAltura);
  setInterval(() => {
    actual = (actual + 1) % total;
    sliderTrack.style.transform = `translateX(-${actual * 100}%)`;
    ajustarAltura();
  }, 3500);
}

/* confirmación por WhatsApp */
document.querySelectorAll(".rsvp-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = new FormData(form);
    let texto =
      `¡Hola! Confirmo mi asistencia a ${form.dataset.evento}.\n` +
      `Nombre: ${datos.get("nombre").trim()}\n` +
      `Número de asistentes: ${datos.get("personas")}`;
    const mensaje = (datos.get("mensaje") || "").trim();
    if (mensaje) texto += `\nMensaje: ${mensaje}`;
    window.open(
      `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  });
});
