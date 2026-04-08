bgchange();
function updateClock() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );
}
function updateDate() {
  const now = new Date();
  document.getElementById("date").textContent = now.toLocaleDateString(
    "sv-SE",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
}
updateClock();
updateDate();
setInterval(updateClock, 6000);
setInterval(updateDate, 1000);

async function bgchange(){

  const baseURL = "https://api.unsplash.com/photos/random?client_id="
  const key = "KcKYMJ7HVXlAZ-FUNTklxu4IZk5iwjJOua0-PRxqJKE"
  
  const res = await fetch(`${baseURL}${key}`)
  const bg  =await res.json()
  // console.log(bg);
document.body.style.backgroundImage = `url(${bg.urls.regular})`
  // console.log({baseURL},{key})
  // console.log(bg)

  if (!res.ok){
    console.log("Något gick fel")
  }
}
// Weather API
async function getWeather() {
  const key = "54d18df177e450b5c1d17ec518c1c853";
  const lat = 57.1061;
  const lon = 12.2522;
    const baseURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=sv&appid=${key}`;

  const res = await fetch(`${baseURL}`);
  if (!res.ok) {
    console.log("Något gick fel");
    return;
  }

  const data = await res.json();
  const days = [data.daily[0], data.daily[1], data.daily[2]];
  const dayNames = ["Idag", "Imorgon", "Övermorgon"];
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = days.map((day, i) => {
    const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    const desc= day.weather[0].description;
    const temp = Math.round(day.temp.day);
    return `
    <div class="weatherDay">
    <img src="${icon}" alt="${desc}" title="${desc}" width="50" height="50">
    <div class="weatherText">
      <h2 class="dayName">${dayNames[i]}</h2>
      <div class="weatherInfo">
        <h3>${temp}°C</h3>
        <h3>${desc.charAt(0).toUpperCase() + desc.slice(1)}</h3>
      </div>
    </div>
      </div>
    `;
  }).join("");
}
getWeather();

async function funFact() {
  const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
  if (!res.ok) {
    console.log("Något gick fel");
    return;
  }
  const data = await res.json();
  document.getElementById("facts").textContent = data.text;
}
funFact();

const addBtn = document.getElementById("addLinkBtn");
const linkDiv = document.getElementById("linkDiv");
const linkAdd = document.getElementById("linkAdd");
const submitBtn = document.getElementById("submitLink");


addBtn.addEventListener("click", () => {
  linkAdd.style.display = "none";
  linkDiv.style.display = "flex";
});
submitBtn.addEventListener("click", () => {
  let raw = document.getElementById("urlField").value.trim();
  if (!raw) return;

  if (!/^https?:\/\//i.test(raw)) raw = "https://" + raw;
  
  let hostname;
  try {
    hostname = new URL(raw).hostname;
  } catch {
    alert("Ogiltig URL");
    return;
  }
  if (!hostname.includes(".")) {
    alert("Ange en giltig URL, t.ex. google.com");
    return;
  }

  // Derive name from hostname
  const name = hostname
    .replace(/^www\./, "")
    .split(".")[0]
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  // Build link element
  const a = document.createElement("a");
  a.href = raw;
  a.target = "_blank";
  a.className = "linkItem";
  a.innerHTML = `
    <img src="https://www.google.com/s2/favicons?domain=${hostname}&sz=64" width="30px" height="30px">
    <h2>${name}</h2>
    <button class="removeLink">×</button>
  `;
a.querySelector(".removeLink").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    a.remove();
  });
  document.getElementById("linkList").appendChild(a);

  document.getElementById("urlField").value = "";
  linkAdd.style.display = "flex";
  linkDiv.style.display = "none";
});



 

