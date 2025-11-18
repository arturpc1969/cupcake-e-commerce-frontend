export const useMapEndpointResponse = () => {

  const mapProductFromEndpointBody = (product) => ({
    uuid: product?.uuid,
    name: product?.name,
    description: product?.description,
    price: product?.price,
    promotion: product?.promotion,
    image: product.image,
    quantity: product?.quantity ?? null,
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

  const mapOrderFromEndpointBody = (order) => ({
    uuid: order?.uuid,
    orderNumber: order?.order_number,
    orderDate: order?.order_date,
    paymentMethod: order?.payment_method,
    status: order?.status,
    deliveryAddress: mapDeliveryAddressFromEndpointBody(order?.delivery_address),
    user: mapUserFromEndpointBody(order?.user),
  })

  const mapOrderItemsFromEndpointBody = (orderItems) => ({
    orderUuid: orderItems?.order_uuid,
    orderNumber: orderItems?.order_number,
    orderDate: orderItems?.order_date,
    paymentMethod: orderItems?.payment_method,
    status: orderItems?.status,
    deliveryAddress: mapDeliveryAddressFromEndpointBody(orderItems?.delivery_address),
    products: orderItems?.products?.map(mapProductFromEndpointBody) || [],
    user: mapUserFromEndpointBody(orderItems?.user),
  })

  return {
    mapProductFromEndpointBody,
    mapUserFromEndpointBody,
    mapDeliveryAddressFromEndpointBody,
    mapOrderFromEndpointBody,
    mapOrderItemsFromEndpointBody,
  }

}
