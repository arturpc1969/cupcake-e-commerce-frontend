import AuthService from "~/services/authService"
import ProductService from "~/services/entity/productService"
import UserService from "~/services/entity/userService"

export const useServices = () => {
    const baseUrl = useRuntimeConfig().public.apiBase

    const entityServices = {
        productService: new ProductService(`${baseUrl}/api/products/`),
        userService: new UserService(`${baseUrl}/api/users/me`),
    }

    return {
        authService: new AuthService(`${baseUrl}/api/auth/`),
        ...entityServices
    }
}
