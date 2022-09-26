export const Storage = {
  set(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  },

  get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}

export async function getApiCep(cep) {
  const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err));

  return data;
}