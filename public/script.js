const form = document.getElementById("birthForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const birthDetails = {
    name: document.getElementById("name").value.trim(),
    birthDate: document.getElementById("birthDate").value,
    birthTime: document.getElementById("birthTime").value,
    birthCity: document.getElementById("birthCity").value.trim(),
    birthCountry: document.getElementById("birthCountry").value.trim()
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