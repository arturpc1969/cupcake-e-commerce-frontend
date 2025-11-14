import { useRequests } from '@/composables/useRequests'
import { useMapEndpointResponse } from '~/composables/useMapEndpointResponse'

export default class OrderService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.requests = useRequests()
        this.deserialize = useMapEndpointResponse().mapOrderFromEndpointBody
    }

    async getAllOrders() {
        const endpoint = `${this.baseUrl}`
        const orders = await this.requests.get(endpoint)
        return orders.map(order => this.deserialize(order))
    }

    async getOrderByUuid(uuid) {
        const endpoint = `${this.baseUrl}${uuid}`
        const order = await this.requests.get(endpoint)
        return this.deserialize(order)
    }

    async createOrder(orderData) {
        const endpoint = `${this.baseUrl}`
        const createdOrder = await this.requests.post(endpoint, orderData)
        return this.deserialize(createdOrder)
    }

    async updateOrder(uuid, orderData) {
        const endpoint = `${this.baseUrl}${uuid}`
        const updatedOrder = await this.requests.put(endpoint, orderData)
        return this.deserialize(updatedOrder)
    }

    async confirmOrder(uuid) {
        debugger
        const endpoint = `${this.baseUrl}confirm/${uuid}`
        const confirmedOrder = await this.requests.put(endpoint)
        return this.deserialize(confirmedOrder)
    }

    deleteOrder(uuid) {
        const endpoint = `${this.baseUrl}${uuid}`
        return this.requests.del(endpoint)
    }

}
