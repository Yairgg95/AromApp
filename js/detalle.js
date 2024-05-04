import { fetchPerfumeByKey } from "./modules/perfumesApi";

document.addEventListener("DOMContentLoaded", () => {
  const url = window.location.href;
  const params = new URLSearchParams(new URL(url).search);
  let perfumeKey = params.get("perfumekey");

  /*
  const fetchPerfumeByKey = async (perfumeKey) => {
    try {
      let response = await fetch(
        `https://kodemiajs-f4a26-default-rtdb.firebaseio.com/perfumes/${perfumeKey}.json`
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching perfume data:", error);
      throw error;
    }
  };
  */

  const printPerfumeData = async (perfumeKey) => {
    try {
      let perfumeData = await fetchPerfumeByKey(perfumeKey);
      let {
        name,
        casa,
        family,
        price,
        concentration,
        URL,
        description,
        release,
      } = perfumeData;

      document.getElementById("perfume-URL").setAttribute("src", URL);
      document.getElementById("perfume-name").innerText = name;
      document.getElementById("perfume-description").innerText = description;
      document.getElementById("perfume-concentration").innerText =
        concentration;
      document.getElementById("perfume-casa").innerText = casa;
      document.getElementById("perfume-release").innerText = release;
      document.getElementById("perfume-family").innerText = family;
      document.getElementById("perfume-price").innerText = `$ ${price}`;
    } catch (error) {
      console.error("Error printing perfume data:", error);
    }
  };

  printPerfumeData(perfumeKey);
});
