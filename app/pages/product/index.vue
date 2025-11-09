<script setup>
// import { decodeJWT, getUserInfoFromToken } from '~/utils/jwt.js'
import { useI18n } from 'vue-i18n'
import PAGE_ROUTER from '~/consts/PAGE_ROUTER'

definePageMeta({
  name: PAGE_ROUTER.PRODUCT.LIST,
})

const { t } = useI18n()

useSeoMeta({
  title: t('pages_product-list_title'),
  ogTitle: t('pages_product-list_title'),
})

const { productService } = useServices()

const config = useRuntimeConfig()

const baseUrl = config.public.apiBase

const produtos = ref([])                                                                                                                 
const pending = ref(true)                                                                                                                
const error = ref(null)

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyNjU1MTM0LCJpYXQiOjE3NjI2NTE1MzR9.4WvIMPD11ZZ0EsAgEEDFaqkYwN4ZkWlffc6SXwd2rSQ"

// const tokenContent = decodeJWT(token)
// console.log("TOKEN CONTENT:", tokenContent)

// const userInfo = getUserInfoFromToken(token)
// console.log("USER INFO FROM TOKEN:", userInfo)

produtos.value = await productService.getAllProducts()

if (produtos.value) {
  pending.value = false
} else {
  error.value = new Error(t('pages_product-list_error'))
  pending.value = false
}

</script>

<template>
  <div>
    <h1>{{ t('pages_product-list_title') }}</h1>

    <div v-if="pending">{{ t('pages_product-list_loading') }}</div>
    <div v-else-if="error">{{ error.message }}</div>
    
    <div v-else class="product-list">
      <div v-for="produto in produtos" :key="produto.uuid" class="product-item">
        
        <img 
          :src="`${baseUrl}/${produto.image}`" 
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
