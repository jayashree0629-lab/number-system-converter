// Sound function
function playSound(type) {
  if (type === "click") {
    document.getElementById("clickSound").play();
  } else if (type === "success") {
    document.getElementById("successSound").play();
  }
}

// Convert Function
function convert() {
  playSound("click");

  let number = document.getElementById("inputNumber").value.trim();
  let fromBase = document.getElementById("fromBase").value;
  let toBase = document.getElementById("toBase").value;

  let resultText = document.getElementById("result");
  let stepsText = document.getElementById("steps");

  if (number === "") {
    resultText.innerText = "Enter a number!";
    return;
  }

  if (fromBase === toBase) {
    resultText.innerText = "Same base selected!";
    return;
  }

  let decimal = parseInt(number, fromBase);

  if (isNaN(decimal)) {
    resultText.innerText = "Invalid input!";
    return;
  }

  let result = decimal.toString(toBase).toUpperCase();

  resultText.innerText = result;
  stepsText.innerText =
    `${number} (base ${fromBase}) → ${result} (base ${toBase})`;

  playSound("success");

  localStorage.setItem("lastInput", number);
}

// Copy Result
function copyResult() {
  let text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Load saved input
window.onload = function () {
  let saved = localStorage.getItem("lastInput");
  if (saved) {
    document.getElementById("inputNumber").value = saved;
  }
};

// Particle Animation
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3,
    speedY: Math.random() * 1
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.y += p.speedY;

    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();