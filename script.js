/* =========================================================
   INVITACIÓN OSCAR ANDRÉS · 50 AÑOS
   JavaScript de Animaciones y Efectos Mágicos
   ========================================================= */

const EVENT_DATE = new Date("2026-10-24T15:00:00-05:00").getTime();
const WHATSAPP_PHONE = "573154246944";

document.documentElement.classList.add("js");

function startAnimations() {
  initPersonalization(); // Función que lee la URL
  initMagicParticles();
  initMagicSparks();
  initSectionSparkles();
  initRandomSparkleBursts();
  initCountdown();
  initRevealAnimations();
  initRsvp();
  initCalendarButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startAnimations);
} else {
  startAnimations();
}

/* ---------- PERSONALIZACIÓN POR URL ---------- */
function initPersonalization() {
  const params = new URLSearchParams(window.location.search);
  
  // Puedes usar ?invitado=Nombre o ?n=Nombre
  const guestName = params.get("invitado") || params.get("n") || params.get("nombre");
  
  // Puedes usar ?cupos=2 o ?c=2
  const guestCount = params.get("cupos") || params.get("c") || params.get("pases");

  const greetingContainer = document.getElementById("personalized-greeting");
  const nameDisplay = document.getElementById("guest-name-display");
  const ticketsDisplay = document.getElementById("guest-tickets-display");

  // Inputs del formulario RSVP para autocompletar
  const rsvpNameInput = document.getElementById("guestName");
  const rsvpGuestsInput = document.getElementById("guests");

  if (guestName) {
    // 1. Mostrar el nombre en el bloque VIP
    nameDisplay.textContent = guestName;
    
    // 2. Pre-llenar el formulario de confirmación
    if (rsvpNameInput) rsvpNameInput.value = guestName;

    if (guestCount) {
      const count = parseInt(guestCount, 10);
      
      // VALIDACIÓN SINGULAR / PLURAL:
      // Si count es exactamente 1, usa singular. De lo contrario, usa plural.
      const textoCupo = (count === 1) ? "cupo reservado" : "cupos reservados";
      
      // Mostrar el texto con el número en negrita
      ticketsDisplay.innerHTML = `<strong>${count}</strong> ${textoCupo}`;
      
      // Pre-llenar y limitar los campos del formulario
      if (rsvpGuestsInput) {
        rsvpGuestsInput.value = count;
        rsvpGuestsInput.setAttribute("max", count);
      }
    } else {
      ticketsDisplay.style.display = "none"; // Ocultar si solo pasan el nombre
    }

    // Finalmente, hacer visible el bloque en el Hero
    greetingContainer.style.display = "block";
  }
}

/* ---------- PARTÍCULAS DORADAS FLOTANTES ---------- */
function initMagicParticles() {
  let container = document.querySelector(".magic-particles");
  if (!container) {
    container = document.createElement("div");
    container.className = "magic-particles";
    document.body.prepend(container);
  }

  container.innerHTML = "";
  const count = window.innerWidth < 720 ? 25 : 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "magic-particle";
    particle.style.setProperty("--size", `${(Math.random() * 2 + 1.5).toFixed(1)}px`);
    particle.style.setProperty("--left", `${(Math.random() * 100).toFixed(1)}%`);
    particle.style.setProperty("--top", `${(Math.random() * 100).toFixed(1)}%`);
    particle.style.setProperty("--duration", `${(Math.random() * 4 + 4).toFixed(1)}s`);
    particle.style.setProperty("--delay", `${(-Math.random() * 6).toFixed(1)}s`);
    particle.style.setProperty("--drift", `${(Math.random() * 30 - 15).toFixed(1)}px`);
    container.appendChild(particle);
  }
}

/* ---------- DESTELLOS TIPO ESTRELLA (CRUZ) ---------- */
function initMagicSparks() {
  const container = document.querySelector(".magic-particles");
  if (!container) return;

  const count = window.innerWidth < 720 ? 12 : 20;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    spark.className = "magic-spark";
    spark.style.setProperty("--spark-size", `${(Math.random() * 3 + 3).toFixed(1)}px`);
    spark.style.setProperty("--spark-left", `${(Math.random() * 94 + 3).toFixed(1)}%`);
    spark.style.setProperty("--spark-top", `${(Math.random() * 92 + 4).toFixed(1)}%`);
    spark.style.setProperty("--spark-duration", `${(Math.random() * 3 + 3.5).toFixed(1)}s`);
    spark.style.setProperty("--spark-delay", `${(-Math.random() * 6).toFixed(1)}s`);
    container.appendChild(spark);
  }
}

/* ---------- DESTELLOS EN SECCIONES ---------- */
function initSectionSparkles() {
  const sections = document.querySelectorAll("section, header");

  sections.forEach((section) => {
    if (section.querySelector(".sparkle-light")) return;
    const amount = 2;
    for (let i = 0; i < amount; i++) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle-light";
      sparkle.style.left = `${15 + Math.random() * 70}%`;
      sparkle.style.top = `${20 + Math.random() * 60}%`;
      sparkle.style.setProperty("--blink", `${(3.5 + Math.random() * 3).toFixed(1)}s`);
      sparkle.style.setProperty("--delay", `${(-Math.random() * 4).toFixed(1)}s`);
      section.appendChild(sparkle);
    }
  });
}

/* ---------- FLASH OCASIONAL EXTRA ---------- */
function initRandomSparkleBursts() {
  const container = document.querySelector(".magic-particles");
  if (!container) return;

  setInterval(() => {
    if (document.hidden) return;
    const burst = document.createElement("span");
    burst.className = "magic-spark magic-spark-burst";
    burst.style.setProperty("--spark-size", `${(Math.random() * 4 + 4).toFixed(1)}px`);
    burst.style.left = `${10 + Math.random() * 80}%`;
    burst.style.top = `${10 + Math.random() * 80}%`;
    burst.style.setProperty("--burst-duration", "1.5s");
    container.appendChild(burst);

    setTimeout(() => burst.remove(), 1600);
  }, 3000);
}

/* ---------- CUENTA REGRESIVA ---------- */
function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const diff = EVENT_DATE - Date.now();
    if (diff <= 0) return;

    daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
    hoursEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    minutesEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    secondsEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ---------- AGREGAR AL CALENDARIO (HÍBRIDO ANDROID / IOS) ---------- */
function initCalendarButton() {
  const btn = document.getElementById("addToCalendarBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const isAndroid = /android/i.test(navigator.userAgent || navigator.vendor || window.opera);

    if (isAndroid) {
      const googleCalUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cumplea%C3%B1os+Oscar+Ortiz&dates=20261024T200000Z/20261025T020000Z&details=%C2%A1Est%C3%A1s+invitado+a+celebrar+mis+50+a%C3%B1os!+Te+espero+para+compartir+una+noche+incre%C3%ADble.&location=Por+confirmar";
      window.open(googleCalUrl, '_blank');
    } else {
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//OscarOrtiz//Cumpleanos//ES",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        "SUMMARY:Cumpleaños Oscar Ortiz",
        "DTSTART:20261024T200000Z",
        "DTEND:20261025T020000Z",
        "LOCATION:Por confirmar",
        "DESCRIPTION:¡Estás invitado a celebrar mis 50 años! Te espero para compartir una noche increíble.",
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "BEGIN:VALARM",
        "TRIGGER:-PT2H",
        "DESCRIPTION:Recordatorio de evento",
        "ACTION:DISPLAY",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = "Cumpleanos_Oscar_Ortiz.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  });
}

/* ---------- ANIMACIONES DE ENTRADA ---------- */
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
}

/* ---------- RSVP ---------- */
function initRsvp() {
  const modal = document.getElementById("rsvpModal");
  const openBtn = document.getElementById("openRsvp");
  const closeBtn = document.getElementById("closeRsvp");
  const form = document.getElementById("rsvpForm");

  if (!modal || !openBtn) return;

  openBtn.addEventListener("click", () => modal.classList.add("show"));
  closeBtn?.addEventListener("click", () => modal.classList.remove("show"));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("guestName")?.value || "";
    const attendance = document.getElementById("attendance")?.value || "";
    const guests = document.getElementById("guests")?.value || "1";
    const message = document.getElementById("message")?.value || "";

    const text = `✨ *Confirmación Oscar Ortiz* ✨\n\n*Nombre:* ${name}\n*Asistencia:* ${attendance}\n*Personas:* ${guests}\n${message ? `*Mensaje:* ${message}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  });
}