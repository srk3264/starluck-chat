const magicLinkForm = document.getElementById("magicLinkForm");
const magicLinkStatus = document.getElementById("magicLinkStatus");

magicLinkForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("authEmail").value.trim();

  try {
    const response = await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      magicLinkStatus.textContent = data.error || "Failed to send magic link.";
      return;
    }

    magicLinkStatus.textContent = "Check your inbox for the magic link.";
  } catch (error) {
    magicLinkStatus.textContent = "Something went wrong.";
    console.error(error);
  }
});

const form = document.getElementById("birthForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const date = document.getElementById("birthDate").value.split("-");
const time = document.getElementById("birthTime").value.split(":");

const birthDetails = {
  name: document.getElementById("name").value.trim(),

  year: Number(date[0]),
  month: Number(date[1]),
  day: Number(date[2]),

  hour: Number(time[0]),
  minute: Number(time[1]),

  birthCity: document.getElementById("birthCity").value.trim(),
  birthCountry: document.getElementById("birthCountry").value.trim(),

  latitude: Number(document.getElementById("latitude").value),
  longitude: Number(document.getElementById("longitude").value)
};

  try {
    const response = await fetch("/api/birth-chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(birthDetails)
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});