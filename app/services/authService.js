import { responseTypeOptions } from "~/consts/responseTypeOptions"
export default class AuthService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async login(userLoginData) {
        const endpoint = `${this.baseUrl}/login`
        const options = {
            method: 'POST',
            body: userLoginData,
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: responseTypeOptions.JSON,
        }
        return $fetch(endpoint, options)
    }

    async signup(userData) {
        const endpoint = `${this.baseUrl}/signup`
        const options = {
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: responseTypeOptions.JSON,
        }
        return $fetch(endpoint, options)
    }

    async refreshToken(refreshTokenData) {
        const endpoint = `${this.baseUrl}/refresh`
        const options = {
            method: 'POST',
            body: refreshTokenData,
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: responseTypeOptions.JSON,
        }
        return $fetch(endpoint, options)
    }

}
