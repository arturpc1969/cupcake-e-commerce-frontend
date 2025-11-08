import { useRequests } from '@/composables/useRequests'
import { useMapEndpointResponse } from '~/composables/useMapEndpointResponse'

export default class ProductService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.requests = useRequests()
        this.deserialize = useMapEndpointResponse().mapProductFromEndpointBody
    }

    async getAllProducts() {
        const endpoint = `${this.baseUrl}`
        const products = await this.requests.get(endpoint)
        return products.map(product => this.deserialize(product)
        )
    }

    async getProductByUuid(uuid) {
        const endpoint = `${this.baseUrl}${uuid}`
        const product = await this.requests.get(endpoint)
        return this.deserialize(product)
    }

    deleteProductByUuid(uuid) {
        const endpoint = `${this.baseUrl}${uuid}`
        return this.requests.del(endpoint)
    }

    async createProduct(productData) {
        const endpoint = `${this.baseUrl}`

        const formData = new FormData()                                                                                                                                           
        formData.append('name', productData.name)                                                                                                                                 
        formData.append('description', productData.description)                                                                                                                   
        formData.append('price', productData.price)

        if (productData.image) {                                                                                                                                                  
            formData.append('image', productData.image)                                                                                                                           
        }

        const createdProduct = await this.requests.post(endpoint, formData)
        return this.deserialize(createdProduct)
    }
    
    async updateProduct(uuid, productData) {
        const endpoint = `${this.baseUrl}${uuid}`

        const formData = new FormData()                                                                                                                                           
        formData.append('name', productData.name)                                                                                                                                 
        formData.append('description', productData.description)                                                                                                                   
        formData.append('price', productData.price)                                                                                                                               
                                                                                                                                                                                
        if (productData.image) {                                                                                                                                                  
            formData.append('image', productData.image)                                                                                                                           
        }

        const updatedProduct = await this.requests.put(endpoint, formData)
        return this.deserialize(updatedProduct)
    }

    async uploadProductImage(uuid, imageFile) {
        const endpoint = `${this.baseUrl}${uuid}/upload-image`

        const formData = new FormData()
        formData.append('image', imageFile)

        const uploadedProduct = await this.requests.post(
            endpoint, 
            formData,
            this.requests.responseTypeOptions.JSON
        )
        return this.deserialize(uploadedProduct)
    }

}
