<script setup>
// import { useI18n } from 'vue-i18n'
// import { useFetch } from '#app'
import PAGE_ROUTER from '~/consts/PAGE_ROUTER'
// defineOptions({ name: 'ProductIndexPage' })

definePageMeta({
  name: PAGE_ROUTER.PRODUCT.LIST,
})

// const { t } = useI18n()

// useSeoMeta({
//   title: t('pages.product-list.title'),
//   ogTitle: t('pages.product-list.title'),
// })
debugger
const { productService } = useServices()

const { data: produtos, pending, error } = await productService.getAllProducts()

// const config = useRuntimeConfig()
// const endpoint = `${config.public.apiBase}/api/products/`

// const { data: produtos, pending, error } = await useFetch(endpoint)
console.log('Produtos carregados:', produtos)

</script>

<template>
  <div>
    <h1>Lista de Produtos</h1>

    <div v-if="pending">Carregando produtos...</div>
    <div v-else-if="error">Erro ao buscar produtos: {{ error.message }}</div>
    
    <div v-else class="product-list">
      <div v-for="produto in produtos" :key="produto.uuid" class="product-item">
        
        <img 
          :src="`${config.public.apiBase}/${produto.image}`" 
          :alt="produto.name" 
          class="product-image"
        />
        
        <h2>{{ produto.name }}</h2>
        <p>{{ produto.description }}</p>
        <p>Preço: R$ {{ produto.price.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>
