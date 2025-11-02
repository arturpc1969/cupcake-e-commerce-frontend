<script setup>
import { useFetch } from '#app'
defineOptions({ name: 'ProductIndexPage' })

const config = useRuntimeConfig()
const endpoint = `${config.public.apiBase}/api/products/`

const { data: produtos, pending, error } = await useFetch(endpoint)

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
