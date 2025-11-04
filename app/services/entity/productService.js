import { useRequests } from '@/composables/useRequests'
import { useMapEndpointResponse } from '~/composables/useMapEndpointResponse'

export default class ProductService {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl
        this.requests = useRequests()
        this.deserialize = useMapEndpointResponse().mapProductFromEndpointBody()
    }

    async getAllProducts() {
        const endpoint = `${this.baseUrl}`
        const products = await this.requests.get(endpoint)
        return products.map(product =>
            this.useMapEndpointResponse().mapProductFromEndpointBody(product)
        )
    }
}
