let savePerfumeBtn = document.getElementById("save-perfume-btn");

savePerfumeBtn.addEventListener("click", async () => {
  let fields = document.querySelectorAll("#create-perfume-form input");

  let perfumeObject = {};

  fields.forEach((field) => {
    let type = field.type;
    let property = field.name;
    let value = field.value;

    switch (type) {
      case "text":
        perfumeObject[property] = value;
        break;
      case "number":
        perfumeObject[property] = Number(value);
        break;
      default:
        perfumeObject[property] = value;
    }
  });

  let savedPerfume = await createPerfume(perfumeObject);
  console.log(savedPerfume);
});

const createPerfume = async (perfumeObject) => {
  let response = await fetch(
    "https://kodemiajs-f4a26-default-rtdb.firebaseio.com/perfumes/.json",
    {
      method: "POST",
      body: JSON.stringify(perfumeObject),
    }
  );
  let data = await response.json();
  return data;
};
