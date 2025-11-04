import ProductService from "~/services/entity/productService"

export const useServices = () => {
    const baseUrl = useRuntimeConfig().public.apiBase

    const entityServices = {
        productService: new ProductService(`${baseUrl}/api/products`),
    }

    return {
        ...entityServices
    }
}
