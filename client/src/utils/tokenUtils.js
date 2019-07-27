import base64 from 'base-64'

export const getToken = () => localStorage.getItem("JWT");

export const saveToken = token => localStorage.setItem("jwt-token", token);

export const removeToken = () => localStorage.removeItem("JWT");

export const getTokenInfo = () => {
  try {
    const token = getToken();
    if (token) {
      const payload = base64.decode(token.split(".")[1]);
      return JSON.parse(payload);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserId = () => {
  const token_info = getTokenInfo();
  if (token_info) {
    return token_info.id;
  } else {
    return false;
  }
};