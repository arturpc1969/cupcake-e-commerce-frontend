import { responseTypeOptions } from "~/consts/responseTypeOptions";
import { useAuth } from "~/composables/useAuth";
import { useI18n } from "vue-i18n";
export const useRequests = () => {
  const { t } = useI18n();

  /**
   * Obtém o token de autenticação se disponível
   */
  const getAuthToken = async () => {
    // Verifica se useAuth está disponível (evita erro em contextos onde não está)
    try {
      const auth = useAuth();
      if (auth && auth.ensureValidToken) {
        return await auth.ensureValidToken();
      }
    } catch (error) {
      console.log(
        t("composables_use-requests_get-auth-token_use-auth-access-error"),
        error
      );
      // useAuth não disponível neste contexto
      return null;
    }
    return null;
  };

  async function makeRequest({
    method,
    url,
    body = null,
    responseType = "json",
    headers = {},
    requiresAuth = true,
  }) {
    const isFormData = body instanceof FormData;
    const defaultHeaders = isFormData ? {} : {"Content-Type": "application/json",};
    // Adiciona token de autenticação se necessário
    if (requiresAuth) {
      const token = await getAuthToken();

      if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    headers = Object.assign({}, defaultHeaders, headers);

    try {
      const response = await $fetch(url, {
        method,
        headers,
        body,
        responseType,
      });

      return response;
    } catch (error) {
      if (error.response?.status === 401 && requiresAuth) {
        // Token inválido ou expirado
        try {
          const auth = useAuth();
          if (auth && auth.logout) {
            auth.logout();
          }
        } catch (e) {
          console.log(
            t(
              "composables_use-requests_make-request_use-auth-access-in-logout-error"
            ),
            e
          );
          // Ignora se useAuth não estiver disponível
        }
        throw new Error(t("composables_use-requests_unauthorized"));
      }
      console.error(t("composables_use-requests_request-error"), error);
      throw error;
    }
  }

  async function get(url, requiresAuth = true) {
    return makeRequest({
      method: "GET",
      url,
      responseType: responseTypeOptions.JSON,
      requiresAuth,
    });
  }

  async function post(url, body, responseTypeOption, requiresAuth = true) {
    const isFormData = body instanceof FormData;

    return makeRequest({
      method: "POST",
      url,
      body: isFormData ? body : body ? JSON.stringify(body) : null,
      responseType: responseTypeOption || responseTypeOptions.JSON,
      headers: isFormData ? {} : undefined,
      requiresAuth,
    });
  }

  async function put(url, body, requiresAuth = true) {
    const isFormData = body instanceof FormData;

    return makeRequest({
      method: "PUT",
      url,
      body: isFormData ? body : body ? JSON.stringify(body) : null,
      responseType: responseTypeOptions.JSON,
      headers: isFormData ? {} : undefined,
      requiresAuth,
    });
  }

  async function del(url, requiresAuth = true) {
    return makeRequest({
      method: "DELETE",
      url,
      responseType: responseTypeOptions.TEXT,
      requiresAuth,
    });
  }

  async function patch({ url, body, requiresAuth = true }) {
    return makeRequest({
      method: "PATCH",
      url,
      body: body ? JSON.stringify(body) : null,
      responseType: responseTypeOptions.JSON,
      requiresAuth,
    });
  }

  return {
    get,
    post,
    put,
    del,
    patch,
    responseTypeOptions,
  };
};
