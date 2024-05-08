
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export async function request(url, query={}) {
  return await fetch(url, query).then(checkResponse);
}