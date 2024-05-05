const createPerfumeCard = (perfumeObject) => {
  const { name, casa, family, price, concentration, URL, key } = perfumeObject;

  const container = document.createElement("div");
  container.classList.add("col","bg-transparent", "mb-4");

  const aCard = document.createElement("a");
  aCard.href = `../views/detalle.html?perfumeKey=${key}`;

  const perfumeCard = document.createElement("div");
  perfumeCard.classList.add(
    "card",
    "perfume-card",
    "p-0",
    "overflow-hidden",
    "h-100",
    "m-1"
  );

  const row = document.createElement("div");
  row.classList.add("row", "g-0", "h-100");

  const containerImg = document.createElement("div");
  containerImg.classList.add("col-md-4");
  const perfumeImage = document.createElement("img");
  perfumeImage.classList.add("perfume-card__picture");
  perfumeImage.src = URL;
  containerImg.appendChild(perfumeImage);

  const cardBodyContainer = document.createElement("div");
  cardBodyContainer.classList.add("col-md-8");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "text-center");
  cardTitle.textContent = name;

  const ulFeatures = document.createElement("ul");
  ulFeatures.classList.add("list-group");

  const features = [
    { label: "Marca", value: casa },
    { label: "Familia olfativa", value: family },
    { label: "Concentración", value: concentration },
    { label: "Precio", value: `$ ${price}` },
  ];

  features.forEach((feature) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${feature.label}: ${feature.value}`;
    ulFeatures.appendChild(li);
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(ulFeatures);
  cardBodyContainer.appendChild(cardBody);
  row.appendChild(containerImg);
  row.appendChild(cardBodyContainer);
  perfumeCard.appendChild(row);
  aCard.appendChild(perfumeCard);
  container.appendChild(aCard);

  return container;
};

const printPerfumes = (perfumesArray, wrapperId) => {
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML = "";

  const fragment = document.createDocumentFragment();

  perfumesArray.forEach((perfume) => {
    const perfumeCard = createPerfumeCard(perfume);
    fragment.appendChild(perfumeCard);
  });

  wrapper.appendChild(fragment);
};

const fetchAllPerfumes = async () => {
  try {
    const response = await fetch(
      `https://kodemiajs-f4a26-default-rtdb.firebaseio.com/perfumes/.json`
    );
    const data = await response.json();
    const keys = Object.keys(data);
    const perfumesArray = keys.map((key) => ({ ...data[key], key }));
    return perfumesArray;
  } catch (error) {
    console.error("Error fetching perfumes:", error);
    return [];
  }
};

const printAllPerfumes = async () => {
  try {
    const perfumesArray = await fetchAllPerfumes();
    printPerfumes(perfumesArray, "perfumes-wrapper");
  } catch (error) {
    console.error("Error printing perfumes:", error);
  }
};

let createBtn = document.getElementById("create-perfume-btn");
createBtn.addEventListener("click", () => {
  window.open("../views/crearPerfume.html", "_self");
});

printAllPerfumes();
