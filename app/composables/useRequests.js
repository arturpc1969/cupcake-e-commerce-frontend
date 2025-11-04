import { responseTypeOptions as responseType } from "~/consts/responseTypeOptions"

export const useRequests = () => {
    const responseTypeOptions = reactive({
        JSON: 'json',
        TEXT: 'text',
        BLOB: 'blob',
        ARRAY_BUFFER: 'arrayBuffer',
        FORM_DATA: 'formData'
    })

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
        const response = await fetch(url, {
            method,
            headers,
            body,
        })
        if (response.ok) {
            return await response[responseType]()
        } else if (response?.status === 401) {
            throw response
        }
        throw response
    }

    async function get(url) {
        return makeRequest({
            method: 'GET',
            url,
            responseType: responseType.JSON,
        })
    }

    async function post(url, body, responseTypeOption) {
        return makeRequest({
            method: 'POST',
            url,
            body: body ? JSON.stringify(body) : null,
            responseType: responseTypeOption || responseType.JSON,
        })
    }

    async function put(url, body) {
        return makeRequest({
            method: 'PUT',
            url,
            body: body ? JSON.stringify(body) : null,
            responseType: responseType.JSON,
        })
    }

    async function del(url) {
        return makeRequest({
            method: 'DELETE',
            url,
            undefined,
            responseType: responseType.TEXT,
        })
    }

    async function patch({ url, body }) {
        return makeRequest({
            method: 'PATCH',
            url,
            body: body ? JSON.stringify(body) : null,
            responseType: responseType.JSON,
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
