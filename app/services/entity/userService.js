import { useRequests } from '@/composables/useRequests'
import { useMapEndpointResponse } from '~/composables/useMapEndpointResponse'

export default class UserService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.requests = useRequests()
        this.deserialize = useMapEndpointResponse().mapUserFromEndpointBody
    }

    async fetchMyUserData() {
        const endpoint = `${this.baseUrl}`
        const user = await this.requests.get(endpoint)
        return this.deserialize(user)
    }

    async updateMyUserData(userData) {
        const endpoint = `${this.baseUrl}`
        const updatedUserData = await this.requests.put(endpoint, userData)
        return this.deserialize(updatedUserData)
    }

    deleteMyUser() {
        const endpoint = `${this.baseUrl}`
        return this.requests.del(endpoint)
    }

    async deactivateMyUser(userData) {
        const endpoint = `${this.baseUrl}`
        return await this.requests.patch(endpoint, userData)
    }

    async changeMyPassword(userData) {
        const endpoint = `${this.baseUrl}/change-password`
        return await this.requests.post(endpoint, userData)
    }

}
