<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Estado
const promotionProducts = ref([]);
const loading = ref(true);

// Service
const { productService } = useServices();

// Carregar produtos em promoção
const loadPromotionProducts = async () => {
  loading.value = true;

  try {
    const allProducts = await productService.getAllProducts();

    // Filtrar apenas produtos com promotion = true e pegar os 3 primeiros
    promotionProducts.value = allProducts
      .filter((product) => product.promotion === true)
      .slice(0, 3);
  } catch (err) {
    console.error("Erro ao carregar produtos em promoção:", err);
  } finally {
    loading.value = false;
  }
};

// Formatar preço
const formatPrice = (price) => {
  if (!price) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

// Navegar para o produto
const goToProduct = (productUuid) => {
  // Navega para a página de produtos e rola até o produto específico
  navigateTo(`/product#${productUuid}`);
};

onMounted(() => {
  loadPromotionProducts();
});
</script>

<template>
  <section
    class="relative bg-gradient-to-b from-[#20004b] to-[#3c0074] text-white pb-20"
  >
    <div class="flex flex-col items-center">
      <!-- Banner principal -->
      <div class="w-full flex justify-center mt-8">
        <img
          src="/banner.png"
          alt="Promoção"
          class="rounded-2xl shadow-2xl max-w-4xl border border-purple-600"
        >
      </div>

      <!-- Texto de destaque -->
      <h2
        class="text-5xl font-bold mt-10 italic text-yellow-300 drop-shadow-sm"
      >
        {{ t("components_hero_section_modal_destak-text") }}
      </h2>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center gap-8 mt-10">
        <div
          v-for="i in 3"
          :key="i"
          class="w-64 h-48 bg-[#ffffff22] rounded-2xl backdrop-blur shadow-lg animate-pulse"
        />
      </div>

      <!-- Cards de Produtos em Promoção -->
      <div v-else class="flex justify-center gap-8 mt-10 flex-wrap">
        <div
          v-for="product in promotionProducts"
          :key="product.uuid"
          class="w-64 h-48 bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-2xl backdrop-blur shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:scale-105 overflow-hidden"
          @click="goToProduct(product.uuid)"
        >
          <!-- Imagem do Produto -->
          <div class="h-28 overflow-hidden relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            >
          </div>

          <!-- Informações do Produto -->
          <div class="p-3 flex flex-col justify-between h-20">
            <!-- Nome do Produto -->
            <h3 class="text-white font-bold text-sm line-clamp-1">
              {{ product.name }}
            </h3>

            <!-- Preço -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-yellow-300 font-bold text-lg">
                  {{ formatPrice(product.price) }}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Placeholders se houver menos de 3 produtos -->
        <div
          v-for="i in Math.max(0, 3 - promotionProducts.length)"
          :key="`placeholder-${i}`"
          class="w-64 h-48 bg-[#ffffff22] rounded-2xl backdrop-blur shadow-lg flex items-center justify-center"
        >
          <p class="text-gray-400 text-sm text-center px-4">Produto em breve</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animação de pulse para loading */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Limitar linhas de texto */
.line-clamp-1 {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
