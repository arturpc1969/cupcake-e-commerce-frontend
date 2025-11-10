import { useRequests } from '@/composables/useRequests'
import { useMapEndpointResponse } from '~/composables/useMapEndpointResponse'

export default class UserService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.requests = useRequests()
        this.deserialize = useMapEndpointResponse().mapUserFromEndpointBody
    }

    async fetchUserData() {
        const endpoint = `${this.baseUrl}`
        const user = await this.requests.get(endpoint)
        return this.deserialize(user)
    }
}
