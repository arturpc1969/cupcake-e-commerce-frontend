import { useI18n } from 'vue-i18n'
export const useRequests = () => {

    const { t } = useI18n()

    const responseTypeOptions = {
        JSON: 'json',
        TEXT: 'text',
        BLOB: 'blob',
        ARRAY_BUFFER: 'arrayBuffer',
        FORM_DATA: 'formData'
    }

    async function makeRequest({
        method,
        url,
        body = null,
        responseType = 'json',
        headers = {},
    }) {
        const defaultHeaders = {
            'Content-Type': 'application/json',
        }
        headers = Object.assign({}, defaultHeaders, headers)
        try {
            const response = await $fetch(url, {
                method,
                headers,
                body,
                responseType,
            })

            return response
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error(t('composables_use-requests_unauthorized'))
            }
            console.error(t('composables_use-requests_request-error'), error)                                                                                      
            throw error
        }
    }

    async function get(url) {
        return makeRequest({
            method: 'GET',
            url,
            responseType: responseTypeOptions.JSON,
        })
    }

    async function post(url, body, responseTypeOption) {
        return makeRequest({
            method: 'POST',
            url,
            body: body ? JSON.stringify(body) : null,
            responseType: responseTypeOption || responseTypeOptions.JSON,
        })
    }

    async function put(url, body) {
        return makeRequest({
            method: 'PUT',
            url,
            body: body ? JSON.stringify(body) : null,
            responseType: responseTypeOptions.JSON,
        })
    }

    async function del(url) {
        return makeRequest({
            method: 'DELETE',
            url,
            responseType: responseTypeOptions.TEXT,
        })
    }

    async function patch({ url, body }) {
        return makeRequest({
            method: 'PATCH',
            url,
            body: body ? JSON.stringify(body) : null,
            responseType: responseTypeOptions.JSON,
        })
    }

    return {
        get,
        post,
        put,
        del,
        patch,
        responseTypeOptions,
    }
}
