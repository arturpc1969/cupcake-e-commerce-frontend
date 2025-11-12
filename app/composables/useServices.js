import AuthService from "~/services/authService"
import ProductService from "~/services/entity/productService"
import UserService from "~/services/entity/userService"
import DeliveryAddressService from "~/services/entity/deliveryAddressService"
import OrderService from "~/services/entity/orderService"
import OrderItemsService from "~/services/entity/orderItemsService"

export const useServices = () => {
    const baseUrl = useRuntimeConfig().public.apiBase

    const entityServices = {
        productService: new ProductService(`${baseUrl}/api/products/`),
        userService: new UserService(`${baseUrl}/api/users/me`),
        deliveryAddressService: new DeliveryAddressService(`${baseUrl}/api/delivery-addresses/`),
        orderService: new OrderService(`${baseUrl}/api/orders/`),
        orderItemsService: new OrderItemsService(`${baseUrl}/api/order-items/`),
    }

    return {
        authService: new AuthService(`${baseUrl}/api/auth/`),
        ...entityServices
    }
}
