import { SHA256 } from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';

export function generateCodeVerifier() {
  let codeVerifier = generateRandomString(128);
  localStorage.setItem('codeVerifier', codeVerifier);

  return codeVerifier;
}

export const getCodeVerifier = () => {
  return localStorage.getItem('codeVerifier');
};

export function generateRandomString(length) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export function base64URL(string) {
  return Base64.stringify(string);
}

export function generateCodeChallenge(codeVerifier) {
  return base64URL(SHA256(codeVerifier))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}
