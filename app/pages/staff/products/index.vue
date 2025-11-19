<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Middleware para garantir que o usuário é staff
definePageMeta({
  middleware: ["auth", "staff"],
});

// Estado
const products = ref([]);
const loading = ref(true);
const error = ref("");
const showDeleteModal = ref(false);
const productToDelete = ref(null);

// Service
const { productService } = useServices();

// Carregar produtos
const loadProducts = async () => {
  loading.value = true;
  error.value = "";

  try {
    products.value = await productService.getAllProducts();
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
    error.value = t("pages_staff_products_error-loading");
  } finally {
    loading.value = false;
  }
};

// Navegar para adicionar novo produto
const goToAddProduct = () => {
  navigateTo("/staff/products/new");
};

// Navegar para editar produto
const goToEditProduct = (uuid) => {
  navigateTo(`/staff/products/edit/${uuid}`);
};

// Confirmar exclusão
const confirmDelete = (product) => {
  productToDelete.value = product;
  showDeleteModal.value = true;
};

// Cancelar exclusão
const cancelDelete = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};

// Deletar produto
const deleteProduct = async () => {
  if (!productToDelete.value) return;

  try {
    await productService.deleteProductByUuid(productToDelete.value.uuid);

    // Remove da lista local
    products.value = products.value.filter(
      (prod) => prod.uuid !== productToDelete.value.uuid
    );

    showDeleteModal.value = false;
    productToDelete.value = null;
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    error.value = t("pages_staff_products_error-deleting");
    showDeleteModal.value = false;
  }
};

// Voltar para área staff
const goBack = () => {
  navigateTo("/product");
};

// Formatar preço
const formatPrice = (price) => {
  if (!price) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-7xl mx-auto">
        <!-- Cabeçalho -->
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <button
              class="text-gray-300 hover:text-white transition-colors"
              @click="goBack"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 class="text-3xl font-bold text-white">
                {{ t("pages_staff_products_title") }}
              </h1>
              <p class="text-gray-300 text-sm mt-1">
                {{ t("pages_staff_products_subtitle") }}
              </p>
            </div>
          </div>

          <button
            class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
            @click="goToAddProduct"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ t("pages_staff_products_add-new") }}
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"
          />
          <p class="text-gray-300 mt-4">
            {{ t("pages_staff_products_loading") }}
          </p>
        </div>

        <!-- Erro -->
        <div
          v-else-if="error"
          class="bg-red-900/30 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Lista vazia -->
        <div
          v-else-if="products.length === 0"
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-12 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 w-24 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">
            {{ t("pages_staff_products_no-products") }}
          </h3>
          <p class="text-gray-300 mb-6">
            {{ t("pages_staff_products_no-products-message") }}
          </p>
          <button
            class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
            @click="goToAddProduct"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ t("pages_staff_products_add-first-product") }}
          </button>
        </div>

        <!-- Lista de Produtos -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="product in products"
            :key="product.uuid"
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl overflow-hidden hover:shadow-xl transition-all"
          >
            <!-- Imagem do Produto -->
            <div class="relative h-48 bg-[#ffffff11] overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover"
              >
              <!-- Badge de Promoção -->
              <div
                v-if="product.promotion"
                class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                {{ t("pages_staff_products_promotion") }}
              </div>
            </div>

            <!-- Informações do Produto -->
            <div class="p-6">
              <!-- Nome do Produto -->
              <h3 class="text-xl font-bold text-white mb-2 line-clamp-2">
                {{ product.name }}
              </h3>

              <!-- Descrição -->
              <p
                v-if="product.description"
                class="text-gray-300 text-sm mb-4 line-clamp-3"
              >
                {{ product.description }}
              </p>

              <!-- Preços -->
              <div class="mb-4">
                <!-- <div v-if="product.promotion" class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl font-bold text-yellow-300">
                      {{ formatPrice(product.promotion) }}
                    </span>
                    <span class="text-sm text-gray-400 line-through">
                      {{ formatPrice(product.price) }}
                    </span>
                  </div>
                  <p class="text-xs text-green-400">
                    {{
                      t("pages_staff_products_discount", {
                        percent: Math.round(
                          ((product.price - product.promotion) /
                            product.price) *
                            100
                        ),
                      })
                    }}
                  </p>
                </div>
                <div v-else> -->
                <div>
                  <span class="text-2xl font-bold text-yellow-300">
                    {{ formatPrice(product.price) }}
                  </span>
                </div>
              </div>

              <!-- Quantidade em Estoque -->
              <!-- <div
                class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg mb-4"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-400">
                    {{ t("pages_staff_products_stock") }}
                  </span>
                  <span
                    :class="[
                      'font-semibold',
                      product.quantity > 10
                        ? 'text-green-400'
                        : product.quantity > 0
                        ? 'text-yellow-400'
                        : 'text-red-400',
                    ]"
                  >
                    {{ product.quantity || 0 }}
                    {{ t("pages_staff_products_units") }}
                  </span>
                </div>
              </div> -->

              <!-- Ações -->
              <div class="flex gap-3">
                <button
                  class="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  @click="goToEditProduct(product.uuid)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  {{ t("pages_staff_products_edit") }}
                </button>

                <button
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  @click="confirmDelete(product)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  {{ t("pages_staff_products_delete") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <Transition name="fade">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="cancelDelete"
      >
        <Transition name="scale">
          <div
            v-if="showDeleteModal"
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8 w-full max-w-md"
            @click.stop
          >
            <div class="text-center mb-6">
              <div
                class="bg-red-600/20 p-4 rounded-full border border-red-500/30 w-16 h-16 mx-auto mb-4 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">
                {{ t("pages_staff_products_delete-confirmation") }}
              </h3>
              <p class="text-gray-300">
                {{ t("pages_staff_products_delete-confirmation-message") }}
                <span class="font-semibold text-white">{{
                  productToDelete?.name
                }}</span
                >?
              </p>
              <p class="text-gray-400 text-sm mt-2">
                {{ t("pages_staff_products_delete-confirmation-warning") }}
              </p>
            </div>

            <div class="flex gap-3">
              <button
                class="flex-1 px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white font-semibold rounded-lg hover:bg-[#ffffff22] transition-colors"
                @click="cancelDelete"
              >
                {{ t("pages_staff_products_delete-confirmation-cancel") }}
              </button>
              <button
                class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                @click="deleteProduct"
              >
                {{ t("pages_staff_products_delete-confirmation-confirm") }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Animação do backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animação do modal */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Limitar linhas de texto */
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animação de spin para loading */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
