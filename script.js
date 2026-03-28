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