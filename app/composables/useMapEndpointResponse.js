// import { useDayjs } from '#dayjs'

export const useUseMapEndpointResponse = () => {
  // const dayjs = useDayjs()

  const mapProductFromEndpointBody = (product) => ({
    uuid: product?.uuid,
    name: product?.name,
    description: product?.description,
    price: product?.price,
    image: product.image,
  })

  return {
    mapProductFromEndpointBody,
  }
}
