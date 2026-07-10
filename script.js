const flagImg = document.getElementById("calan");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const guessFlag = document.getElementById("flag");



const countries = ['ETH', 'SOM', 'SSD', 'TZA', 'UGA','AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE','BWA', 'LSO', 'MOZ', 'NAM', 'SWZ', 'ZWE','AFG', 'BTN', 'MMR', 'HKG', 'IND', 'KAZ', 'NPL', 'PRK', 'KGZ', 'LAO'];
let currentCountryName = "";



// 🌍 Fetch countries from REST Countries API
async function fetchCountries() {
  const randomIndex = Math.floor(Math.random() * countries.length)
  console.log("randomIndex", randomIndex)
  const randomInput = countries[randomIndex];
  
  
    try {
        const res = await fetch(`https://api.restcountries.com/countries/v5/codes.alpha_3/${randomInput}`,
      {
        headers: {
          Authorization: "Bearer rc_live_215b888a0fe341679738ca4cfe5d471c",
        },
      },);
      //hadii uu serverka diido 
      if(!res.ok) {
        throw new error ("xogta wadamada lama so heli karo");
      }
        const data = await res.json();
        console.log("data", data)

        const country = data.data.objects;
        console.log("country", data.data.objects)
        currentCountryName = country[0].names.common.toLowerCase();
        console.log("name", country[0])

        //wadanka magacisa
        guessFlag.src = country[0].flag.url_png || country[0].flag.url_svg ;

        guessInput.value = "";
        result.textContent = "";

} catch(error){
  console.log(error, "cilad ayaa dhacdey")
}
}




//is barbardhiga inputka qofka iyo wadanka randomka ah 
submitBtn.addEventListener("click", () => {
const inputGuess = guessInput.value.trim().toLowerCase();
//if statement adigo isticmalaya isku bar bardhig 
if(inputGuess === currentCountryName) {
  result.textContent = "Good job 🎉"
  result.style.color = "green";
} else {
  result.textContent = "Nice try but not the correct one ❌ "
  result.style.color = "red"
}
});
fetchCountries()


hintBtn.addEventListener("click", () => {
if(currentCountryName) {
  const firstWord = currentCountryName.charAt(0).toUpperCase();
  guessInput.value = firstWord;
}
});


nextBtn.addEventListener("click", () => {
  fetchCountries();
})





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
          Authorization: "Bearer rc_live_215b888a0fe341679738ca4cfe5d471c",
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
getCountry('somalia')
 
