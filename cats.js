let main = document.getElementById("main");
const loader = document.getElementById("loader");
const breedSelect = document.getElementById("breed");

async function init() {
  const res = await fetch("https://api.thecatapi.com/v1/breeds");
  const resJson = await res.json();

  let breedOptions = document.createElement("option");

  let breedList = resJson;

  for (let i = 0; i < breedList.length; i++) {
    breedOptions = document.createElement("option");
    breedOptions.value = breedList[i].name;
    breedOptions.innerText = breedList[i].name;
    breedSelect.appendChild(breedOptions);
  }

  const randomRes = await fetch("https://api.thecatapi.com/v1/images/search");
  const randomResJson = await randomRes.json();

  main.src = randomResJson[0].url;

  breedSelect.addEventListener("change", handleBreedChange);

  main.addEventListener("load", function() {
    main.classList.add("show");
    loader.classList.remove("show");
  });
} 

async function handleBreedChange(event) {
  const breed = event.target.value;

  main.classList.remove("show");
  loader.classList.add("show");

  const res = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`);
  const resJson = await res.json();
  
  const imgId = resJson[0].reference_image_id;
  const imgRes = await fetch(`https://api.thecatapi.com/v1/images/${imgId}`);
  const imgResJson = await imgRes.json();

  main.src = imgResJson.url;
}

init();

