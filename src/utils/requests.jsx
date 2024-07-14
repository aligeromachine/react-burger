export const URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
  if (res.success) {
    return res;
  }
  return Promise.reject(`Error success: ${res}`);
};

export const request = async (url, options={}) => {
  return fetch(url, options)
    .then(checkResponse)
    .then(checkSuccess) 
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    });
};

export const getIngredients = async () => request(`${URL}/ingredients`);

export const postOrder = async(order) => {
  const jsonData = JSON.stringify({ingredients: order.map((item) => item._id)});
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: jsonData,
  };
  return await request(`${URL}/orders`, options);
}

export const refreshToken = async () => {
  return fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkResponse)
   // !! Важно для обновления токена в мидлваре, чтобы запись
   // была тут, а не в fetchWithRefresh
  .then((refreshData) => {
    if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
    localStorage.setItem("refreshToken", refreshData.refreshToken); 
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
  });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const forgotPassword = async (data) => {
  const response = await request(`${URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({email: data})
  });
  
  return response;
};

export const resetPassword = async (data) => {
  const response = await request(`${URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({password: data.password, token: data.token})
  });

  return response;
};