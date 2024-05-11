export const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Error success: ${res}`);
};

export const request = async(endpoint, options={}) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess) 
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    });
};

export const getIngredients = async() => request("ingredients");

export const postOrder = async(order) => {
  const jsonData = JSON.stringify({ingredients: order.map((item) => item._id)});
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData,
  };
  return await request("orders", options);
}