export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  amicarSso: {
    url: process.env.AMICAR_SSO_URL,
    clientId: process.env.AMICAR_SSO_CLIENT_ID,
    clientSecret: process.env.AMICAR_SSO_CLIENT_SECRET,
    codeLoginUrl: '/login-external/code-login',
    tokenValidation: '/login-external/token-validation',
  },
});
