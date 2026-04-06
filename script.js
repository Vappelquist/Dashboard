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
  console.log(bg);
document.body.style.backgroundImage = `url(${bg.urls.regular})`
  console.log({baseURL},{key})
  console.log(bg)

  if (!res.ok){
    console.log("Något gick fel")
  }
}


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
    <img src="https://www.google.com/s2/favicons?domain=${hostname}&sz=64" width="20" height="20">
    <span>${name}</span>
    <button class="removeLink">×</button>
  `;
a.querySelector(".removeLink").addEventListener("click", (e) => {
    e.preventDefault();
    a.remove();
  });
  document.getElementById("linkList").appendChild(a);

  document.getElementById("urlField").value = "";
  linkAdd.style.display = "flex";
  linkDiv.style.display = "none";
});



 

