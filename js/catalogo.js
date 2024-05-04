const createPerfumeCard = (perfumeObject) => {
    let {name, casa, family, price, concentration, URL} = perfumeObject;

    let container =document.createElement("div");
    container.classList.add("col");

    let perfumeCard = document.createElement("div");
    perfumeCard.classList.add("card", "perfume-card", "p-0", "overflow-hidden");

    let row = document.createElement("div");
    row.classList.add("row", "g-0");

    let containerImg = document.createElement("div");
    containerImg.classList.add("col-md-4");
    let perfumeImage = document.createElement("img");
    perfumeImage.classList.add("perfume-card__picture");
    perfumeImage.setAttribute("src", URL);
    containerImg.append(perfumeImage);

    let cardBodyContainer = document.createElement("div"); // append cardBody
    cardBodyContainer.classList.add("col-md-8");

    let cardBody = document.createElement("div"); //append h5 ul 
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "text-center");
    cardTitle.textContent = name;

    let ulFeatures = document.createElement("ul");
    ulFeatures.classList.add("list-group");

    let ilMarca = document.createElement("li");
    ilMarca.classList.add("list-group-item");
    ilMarca.textContent = `Marca: ${casa}`;

    let ilFmaily = document.createElement("li");
    ilFmaily.classList.add("list-group-item");
    ilFmaily.textContent = `Familia olfativa: ${family}`;

    let ilConcentration = document.createElement("li");
    ilConcentration.classList.add("list-group-item");
    ilConcentration.textContent = `Concentración: ${concentration}`;

    let ilPrice = document.createElement("li");
    ilPrice.classList.add("list-group-item");
    ilPrice.textContent = `$ ${price}`;

    ulFeatures.append(ilMarca,ilFmaily,ilConcentration,ilPrice);
    cardBody.append(cardTitle,ulFeatures)
    cardBodyContainer.append(cardBody)
    row.append(containerImg,cardBodyContainer)
    perfumeCard.append(row)
    container.append(perfumeCard)
    return container
};

const fetchAllPerfumes = async () => {
    let response = await fetch(`https://kodemiajs-f4a26-default-rtdb.firebaseio.com/perfumes/.json`);
    let data = await response.json();
    let keys = Object.keys(data);
    let perfumesArray = keys.map((key) => ({...data[key], key}));
    return perfumesArray
};

const printPerfumes = (perfumesArray,wrapperId) => {
    let wrapper = document.getElementById(wrapperId)
    wrapper.innerHTML = "";

    perfumesArray.forEach((perfume) => {
        let currenContent = wrapper.innerHTML;
        wrapper.innerHTML = currenContent + createPerfumeCard(perfume);
    });
};

const printAllPerfumes = async () => {
    let perfumesArray = await fetchAllPerfumes();
    printPerfumes(perfumesArray,"perfumes-wrapper")
}

printAllPerfumes();