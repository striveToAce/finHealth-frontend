import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const getCookies = (ctx = undefined) => {
  return parseCookies(ctx);
};

export const setAuthCookies = (accessToken: string, refreshToken: string, ctx = undefined) => {
  setCookie(ctx, 'accessToken', accessToken, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  setCookie(ctx, 'refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};

export const removeAuthCookies = (ctx = undefined) => {
  destroyCookie(ctx, 'accessToken');
  destroyCookie(ctx, 'refreshToken');
};