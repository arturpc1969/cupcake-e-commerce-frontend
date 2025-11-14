/**
 * Decodifica um token JWT sem verificar a assinatura
 * (a verificação de assinatura deve ser feita no backend)
 */
export function decodeJWT(token) {
  try {
    if (!token) {
      return null;
    }

    // JWT tem 3 partes separadas por ponto: header.payload.signature
    const parts = token.split(".");

    if (parts.length !== 3) {
      console.error("Invalid JWT token");
      return null;
    }

    // Decodifica o payload (segunda parte)
    const payload = parts[1];

    // Decodifica de base64url para string
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

/**
 * Verifica se o token JWT está expirado
 */
export function isTokenExpired(token) {
  const decoded = decodeJWT(token);

  if (!decoded || !decoded.exp) {
    return true;
  }

  // exp está em segundos, Date.now() está em milissegundos
  const currentTime = Date.now() / 1000;

  return decoded.exp < currentTime;
}

/**
 * Verifica se o token expira em breve (nos próximos 5 minutos)
 */
export function isTokenExpiringSoon(token, thresholdSeconds = 300) {
  const decoded = decodeJWT(token);

  if (!decoded || !decoded.exp) {
    return true;
  }

  const currentTime = Date.now() / 1000;
  const timeUntilExpiry = decoded.exp - currentTime;

  return timeUntilExpiry < thresholdSeconds;
}

/**
 * Extrai o user_id do token
 */
export function getUserIdFromToken(token) {
  const decoded = decodeJWT(token);
  return decoded?.user_id || null;
}

/**
 * Extrai informações completas do usuário do token
 */
export function getUserInfoFromToken(token) {
  const decoded = decodeJWT(token);

  if (!decoded) {
    return null;
  }

  return {
    userId: decoded.user_id,
    type: decoded.type, // 'access' ou 'refresh'
    exp: decoded.exp,
    iat: decoded.iat,
  };
}
