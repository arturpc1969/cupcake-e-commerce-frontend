import { useRequests } from '@/composables/useRequests'
import { useMapEndpointResponse } from '~/composables/useMapEndpointResponse'

export default class OrderService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.requests = useRequests()
        this.deserialize = useMapEndpointResponse().mapOrderItemsFromEndpointBody
    }

    async getAllOrdersItems() {
        const endpoint = `${this.baseUrl}`
        const ordersItems = await this.requests.get(endpoint)
        return ordersItems.map(orderItems => this.deserialize(orderItems))
    }

    async getAllOrdersItemsStaff() {
        const endpoint = `${this.baseUrl}admin`
        const ordersItems = await this.requests.get(endpoint)
        return ordersItems.map(orderItems => this.deserialize(orderItems))
    }

    async getOrderItemsByUuid(uuid) {
        const endpoint = `${this.baseUrl}${uuid}`
        const orderItems = await this.requests.get(endpoint)
        return this.deserialize(orderItems)
    }

    async getOrderItemsByUuidStaff(uuid) {
        const endpoint = `${this.baseUrl}admin/${uuid}`
        const orderItems = await this.requests.get(endpoint)
        return this.deserialize(orderItems)
    }

    async createOrderItem(orderItemData) {
        const endpoint = `${this.baseUrl}`
        const createdOrderItem = await this.requests.post(endpoint, orderItemData)
        return this.deserialize(createdOrderItem)
    }

    async updateOrderItem(uuid, orderItemData) {
        const endpoint = `${this.baseUrl}${uuid}`
        const updatedOrderItem = await this.requests.put(endpoint, orderItemData)
        return this.deserialize(updatedOrderItem)
    }

    deleteOrderItem(uuid) {
        const endpoint = `${this.baseUrl}${uuid}`
        return this.requests.del(endpoint)
    }

}
