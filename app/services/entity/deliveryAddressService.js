import { useRequests } from '@/composables/useRequests'
import { useMapEndpointResponse } from '~/composables/useMapEndpointResponse'

export default class DeliveryAddressService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.requests = useRequests()
        this.deserialize = useMapEndpointResponse().mapDeliveryAddressFromEndpointBody
    }

    async getAllDeliveryAddresses() {
        const endpoint = `${this.baseUrl}`
        const deliveryAddresses = await this.requests.get(endpoint)
        return deliveryAddresses.map(deliveryAddress => this.deserialize(deliveryAddress))
    }

    async getDeliveryAddressByUuid(uuid) {
        const endpoint = `${this.baseUrl}${uuid}`
        const deliveryAddress = await this.requests.get(endpoint)
        return this.deserialize(deliveryAddress)
    }

    async createDeliveryAddress(deliveryAddressData) {
        const endpoint = `${this.baseUrl}`
        const createdDeliveryAddress = await this.requests.post(endpoint, deliveryAddressData)
        return this.deserialize(createdDeliveryAddress)
    }

    async updateDeliveryAddress(uuid, deliveryAddressData) {
        const endpoint = `${this.baseUrl}${uuid}`
        const updatedDeliveryAddress = await this.requests.put(endpoint, deliveryAddressData)
        return this.deserialize(updatedDeliveryAddress)
    }

    deleteDeliveryAddress(uuid) {
        const endpoint = `${this.baseUrl}${uuid}`
        return this.requests.del(endpoint)
    }

}
