export const API_URL = 'http://localhost:8080/';

export const AUTH_CONFIG = {
  clientId: 'foodanalytics',
  authorizeUrl: 'http://localhost:8081/oauth/authorize',
  tokenUrl: 'http://localhost:8081/oauth/token',
  callbackUrl: 'http://localhost:3000/auth',
};

export function ACCESS_TOKEN(params) {
  return {
    url: AUTH_CONFIG.tokenUrl,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    },
  };
}

export function RESTAURANTES_GET() {
  return {
    url: API_URL + 'v1/restaurantes',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}
