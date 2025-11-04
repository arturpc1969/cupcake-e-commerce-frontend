<script setup>
// import { useI18n } from 'vue-i18n'
import PAGE_ROUTER from '~/consts/PAGE_ROUTER'

definePageMeta({
  name: PAGE_ROUTER.PRODUCT.LIST,
})

// const { t } = useI18n()

// useSeoMeta({
//   title: t('pages.product-list.title'),
//   ogTitle: t('pages.product-list.title'),
// })

const { productService } = useServices()

const config = useRuntimeConfig()

const baseUrl = config.public.apiBase

const produtos = ref([])                                                                                                                 
const pending = ref(true)                                                                                                                
const error = ref(null)

produtos.value = await productService.getAllProducts()

console.log('Produtos carregados:', produtos)

if (produtos.value) {
  pending.value = false
} else {
  error.value = new Error('Falha ao carregar produtos.')
  pending.value = false
}

</script>

<template>
  <div>
    <h1>Lista de Produtos</h1>

    <div v-if="pending">Carregando produtos...</div>
    <div v-else-if="error">Erro ao buscar produtos: {{ error.message }}</div>
    
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
