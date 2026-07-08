const flagImg = document.getElementById("flag");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");

const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,cca2,altSpellings";
const FALLBACK_URL = "https://cdn.jsdelivr.net/npm/world-countries@5.0.0/countries.json";

let countries = [];
let currentCountry = null;

// 🌍 Fetch countries from REST Countries API
async function fetchCountries() {
    try {
        const res = await fetch(` https://api.restcountries.com/countries/v5/names.common/`
        );
        const data = await res.json();

        if (data.success === false || data.errors) {
            countries = await fetchFallbackCountries();
        } else {
            countries = data;
        }

        if (!countries.length) {
            throw new Error("No countries loaded");
        }

        getRandomCountry();

    } catch (error) {
        console.error("Error fetching countries:", error);

        try {
            countries = await fetchFallbackCountries();
            if (countries.length) {
                getRandomCountry();
                return;
            }
        } catch (fallbackError) {
            console.error("Fallback also failed:", fallbackError);
        }

        result.textContent = "Failed to load countries. Check your internet connection.";
        result.style.color = "red";
    }
}

// Backup data source (same country info, uses flagcdn.com for flags)
async function fetchFallbackCountries() {
    const res = await fetch(FALLBACK_URL);
    const data = await res.json();

    return data.map((country) => ({
        name: country.name,
        cca2: country.cca2,
        altSpellings: country.altSpellings ?? [],
        flags: {
            svg: `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`,
            png: `https://flagcdn.com/w640/${country.cca2.toLowerCase()}.png`
        }
    }));
}

// 🎲 Random country
function getRandomCountry() {
    if (!countries.length) return;

    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];

    flagImg.src = currentCountry.flags.svg;
    flagImg.alt = "Country Flag";
    guessInput.value = "";
    result.textContent = "";
}

// ✅ Check if guess matches the country name
function isCorrectGuess(guess) {
    const names = [
        currentCountry.name.common,
        currentCountry.name.official,
        ...(currentCountry.altSpellings ?? [])
    ]
        .filter(Boolean)
        .map((name) => name.toLowerCase());

    return names.includes(guess);
}

// 🎯 Submit guess
function submitGuess() {
    if (!currentCountry) return;

    const userGuess = guessInput.value.trim().toLowerCase();

    if (!userGuess) return;

    if (isCorrectGuess(userGuess)) {
        result.textContent = "✅ Correct!";
        result.style.color = "green";
    } else {
        result.textContent = `❌ Wrong! Answer: ${currentCountry.name.common}`;
        result.style.color = "red";
    }
}

submitBtn.addEventListener("click", submitGuess);

guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitGuess();
});

// 💡 Hint — show first letter
hintBtn.addEventListener("click", () => {
    if (!currentCountry) return;

    const firstLetter = currentCountry.name.common.charAt(0).toUpperCase();
    result.textContent = `Hint: starts with "${firstLetter}"`;
    result.style.color = "#3b82f6";
});

// 🔄 Next country
nextBtn.addEventListener("click", () => {
    getRandomCountry();
});

// 🚀 Start game
fetchCountries();
const searchInput = document.querySelector(".search-input");
const countryForm = document.getElementById("country-form");


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
          Authorization: "Bearer rc_live_737e0b868e234eed8916610e23006058",
        },
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.data.objects && data.data.objects.length > 0) {
     
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
 
