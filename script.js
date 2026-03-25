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
