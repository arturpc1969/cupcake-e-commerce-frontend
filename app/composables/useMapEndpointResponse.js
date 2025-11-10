// import { useDayjs } from '#dayjs'

export const useMapEndpointResponse = () => {
  // const dayjs = useDayjs()

  const mapProductFromEndpointBody = (product) => ({
    uuid: product?.uuid,
    name: product?.name,
    description: product?.description,
    price: product?.price,
    image: product.image,
  })

  const mapUserFromEndpointBody = (user) => ({
    uuid: user?.uuid,
    username: user?.username,
    firstName: user?.first_name,
    lastName: user?.last_name,
    fullName: user?.full_name,
    cpf: user?.cpf,
    email: user?.email,
    isStaff: user?.is_staff,
  })

  const mapDeliveryAddressFromEndpointBody = (deliveryAddress) => ({
    uuid: deliveryAddress?.uuid,
    addressName: deliveryAddress?.address_name,
    addressDescription: deliveryAddress?.address_description,
    city: deliveryAddress?.city,
    state: deliveryAddress?.state,
    zipCode: deliveryAddress?.zip_code,
  })

  return {
    mapProductFromEndpointBody,
    mapUserFromEndpointBody,
    mapDeliveryAddressFromEndpointBody,
  }

}
