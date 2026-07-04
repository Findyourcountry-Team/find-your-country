const searchInput = document.querySelector(".search-input");
const countryForm = document.getElementById("country-form");

const flagImg = document.getElementById("flag");
const countryName = document.getElementById("country-name");
const caPital = document.getElementById("capital");
const poPulation = document.getElementById("population");
const langUages = document.getElementById("language");
const CurreNcies = document.getElementById("Currencies");

searchInput.addEventListener("keydown", function (event) {
 console.log(event.key)
  if (event.key === "Enter") {
     console.log(event.key)
    const countryNameInput = searchInput.value.trim();
    if (countryNameInput !== "") {
      getCountry(countryNameInput);
      
       
    }
  }
});

// Demo key: no account required.
async function getCountry(country) {
  try {
    const response = await fetch(
      ` https://api.restcountries.com/countries/v5/names.common/${country}`,
      {
        headers: {
          Authorization: "Bearer rc_live_fe18335c98ad4cf594ab53e84511510c",
        },
      },
    );
    const data = await response.json();
    console.log(data.data.objects);
    if (data.data.objects && data.data.objects.length > 0) {
      console.log('hello')
      const countryData = data.data.objects[0];
      console.log(countryData)
    

      countryForm.classList.remove('hidden')

      flagImg.src = countryData.flag.url_png || countryData.flag.url_svg || "";

      countryName.textContent =
        countryData.names.common || "Lama heli karo wadankan magacisa";

      caPital.textContent = countryData.capitals[0].name
      
        ? countryData.capitals[0].name
        : "Lama heli karo";

      poPulation.textContent = countryData.population
        ? countryData.population.toLocaleString()
        : "0";

      if (countryData.languages) {
        console.log('hello')
        langUages.textContent = Object.values(countryData.languages[0].name).join("");
      } else {
        langUages.textContent = "-";
      }
        
      if (countryData.currencies) {
      
        const CurrencyNames = countryData.currencies.map(
          currency => currency.name,
        );
        CurreNcies.textContent = CurrencyNames.join(", ");
      } else {
        CurreNcies.textContent = "_";
      }
    }
  } catch (error) {
    console.log(error);
  }
}
getCountry('kenya')
 