import { 
  IResponseIngredient
} from "../interfaces/ingredient-response";

import { 
  IRequestsInit, 
  IResponseInit 
} from "../interfaces/base";

import { 
  IResponseRefreshToken, 
  IResponseUserCheck, 
  IUserResetPassword, 
  ITokenErrors, 
} from "../interfaces/user-response";

import { IResponseOrder } from "../interfaces/order-response";
import { IIngredientsExtId } from "../interfaces/ingredient-inner";

export const URL = "https://norma.nomoreparties.space/api";

export const objToStr = (data: object) => JSON.stringify(data);

export const baseoptions: IRequestsInit = {
  method: "",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: "",
}

const checkResponse = <T>(response: Response): Promise<T> => {
  return response && response.ok ? 
  response.json() : 
  response.json().then((err) => Promise.reject(err));
};

const checkSuccess = <T>(response: any): Promise<T> => {
  if (response.success) {
    return response;
  }
  return Promise.reject(`Error success: ${response}`);
};

export const request = async <T>(url: string, options?: IRequestsInit): Promise<T> => {
  return fetch(url, options)
  .then(checkResponse<T>)
  .then(checkSuccess<T>)
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  });
};

export const getIngredients = async (): 
  Promise<IResponseIngredient> => request<IResponseIngredient>(`${URL}/ingredients`);

export const postOrder = async(order: IIngredientsExtId[]) => {
  const options: IRequestsInit = baseoptions;
  options.method = "POST";
  options.body = objToStr({ingredients: order.map((item) => item._id)});

  return await request<IResponseOrder>(`${URL}/orders`, options);
}

export const refreshToken = async (): Promise<IResponseRefreshToken> => {

  const options: IRequestsInit = baseoptions;
  options.method = "POST";
  options.body = objToStr({token: localStorage.getItem("refreshToken")});

  return fetch(`${URL}/auth/token`, options)
  .then(checkResponse<IResponseRefreshToken>)
   // !! Важно для обновления токена в мидлваре, чтобы запись
   // была тут, а не в fetchWithRefresh
  .then((refreshData: IResponseRefreshToken) => {
    if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
    localStorage.setItem("refreshToken", refreshData.refreshToken); 
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
  });
};

export const fetchWithRefresh = async (url: string, options: IRequestsInit)
: Promise<IResponseUserCheck> => {

  try {
    const res = await fetch(url, options);
    return await checkResponse<IResponseUserCheck>(res);
  } catch (err: unknown) {
    if ((err as ITokenErrors).message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse<IResponseUserCheck>(res);
    } else {
      return Promise.reject(err);
    }
  }  
};

export const forgotPassword = async (data: string)
: Promise<IResponseInit> => {

  const options: IRequestsInit = baseoptions;
  options.method = "POST";
  options.body = objToStr({email: data});

  return await request<IResponseInit>(`${URL}/password-reset`, options);
};

export const resetPassword = async (data: IUserResetPassword)
: Promise<IResponseInit> => {

  const options: IRequestsInit = baseoptions;
  options.method = "POST";
  options.body = objToStr({password: data.password, token: data.token});

  return await request<IResponseInit>(`${URL}/password-reset/reset`, options);
};