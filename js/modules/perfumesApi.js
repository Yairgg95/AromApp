const PERFUME_BASE_URL =
  "https://kodemiajs-f4a26-default-rtdb.firebaseio.com/perfumes";

const createPerfume = async (perfumeObject) => {
  let response = await fetch(`${PERFUME_BASE_URL}/.json`, {
    method: "POST",
    body: JSON.stringify(perfumeObject),
  });
  let data = await response.json();
  return data;
};

const fetchPerfumeByKey = async (perfumeKey) => {
  try {
    let response = await fetch(`${PERFUME_BASE_URL}/${perfumeKey}.json`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching perfume data:", error);
    throw error;
  }
};

const fetchAllPerfumes = async () => {
  try {
    const response = await fetch(`${PERFUME_BASE_URL}/.json`);
    const data = await response.json();
    const keys = Object.keys(data);
    const perfumesArray = keys.map((key) => ({ ...data[key], key }));
    return perfumesArray;
  } catch (error) {
    console.error("Error fetching perfumes:", error);
    return [];
  }
};

export { createPerfume, fetchPerfumeByKey, fetchAllPerfumes };
