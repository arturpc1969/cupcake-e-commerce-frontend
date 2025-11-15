<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";

const { t } = useI18n();
const toast = useToast();
const route = useRoute();

// Middleware para garantir que o usuário é staff
definePageMeta({
  middleware: ["auth", "staff"],
});

// Estado do formulário
const formData = ref({
  name: "",
  description: "",
  price: "",
  promotion: false,
  image: null,
});

const currentImage = ref(null);
const imagePreview = ref(null);
const loading = ref(false);
const loadingProduct = ref(true);
const errors = ref({});
const productUuid = ref(route.params.uuid);

// Service
const { productService } = useServices();

// Carregar dados do produto
const loadProduct = async () => {
  loadingProduct.value = true;

  try {
    const product = await productService.getProductByUuid(productUuid.value);

    formData.value = {
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      promotion: product.promotion === true || product.promotion === "true",
      image: null,
    };

    currentImage.value = product.image;
  } catch (err) {
    console.error("Erro ao carregar produto:", err);
    toast.add({
      severity: "error",
      summary: t("pages_staff_products_edit_error-loading"),
      detail: t("pages_staff_products_edit_error-loading-message"),
      life: 3000,
    });

    // Redirecionar para lista após erro
    setTimeout(() => {
      navigateTo("/staff/products");
    }, 2000);
  } finally {
    loadingProduct.value = false;
  }
};

// Validar formulário
const validateForm = () => {
  errors.value = {};

  if (!formData.value.name || formData.value.name.trim() === "") {
    errors.value.name = t("pages_staff_products_edit_error-name-required");
  }

  if (!formData.value.description || formData.value.description.trim() === "") {
    errors.value.description = t(
      "pages_staff_products_edit_error-description-required"
    );
  }

  if (!formData.value.price || formData.value.price <= 0) {
    errors.value.price = t("pages_staff_products_edit_error-price-required");
  }

  return Object.keys(errors.value).length === 0;
};

// Manipular seleção de imagem
const handleImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      errors.value.image = t("pages_staff_products_edit_error-image-invalid");
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      errors.value.image = t("pages_staff_products_edit_error-image-size");
      return;
    }

    formData.value.image = file;
    errors.value.image = null;

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Remover nova imagem selecionada
const removeNewImage = () => {
  formData.value.image = null;
  imagePreview.value = null;
  // Limpar input file
  const fileInput = document.getElementById("image-input");
  if (fileInput) {
    fileInput.value = "";
  }
};

// Atualizar produto
const updateProduct = async () => {
  if (!validateForm()) {
    toast.add({
      severity: "error",
      summary: t("pages_staff_products_edit_validation-error"),
      detail: t("pages_staff_products_edit_validation-error-message"),
      life: 3000,
    });
    return;
  }

  loading.value = true;

  try {
    const productData = {
      name: formData.value.name.trim(),
      description: formData.value.description.trim(),
      price: formData.value.price,
      promotion: formData.value.promotion.toString(),
    };
    // Adicionar imagem apenas se uma nova foi selecionada
    if (formData.value.image) {
      productData.image = formData.value.image;
    }

    await productService.updateProduct(productUuid.value, productData);

    toast.add({
      severity: "success",
      summary: t("pages_staff_products_edit_success"),
      detail: t("pages_staff_products_edit_success-message"),
      life: 3000,
    });

    // Redirecionar para lista de produtos
    setTimeout(() => {
      navigateTo("/staff/products");
    }, 1000);
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    toast.add({
      severity: "error",
      summary: t("pages_staff_products_edit_error"),
      detail: t("pages_staff_products_edit_error-message"),
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

// Cancelar e voltar
const cancel = () => {
  navigateTo("/staff/products");
};

// Formatar input de preço
const formatPriceInput = (field) => {
  const value = formData.value[field];
  if (value) {
    // Remove caracteres não numéricos exceto ponto e vírgula
    const cleaned = value.toString().replace(/[^\d.,]/g, "");
    // Substitui vírgula por ponto
    formData.value[field] = cleaned.replace(",", ".");
  }
};

onMounted(() => {
  loadProduct();
});
</script>

<template>
  <div
    class="page-content-with-navbar min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Cabeçalho -->
        <div class="flex items-center gap-4 mb-8">
          <button
            class="text-gray-300 hover:text-white transition-colors"
            @click="cancel"
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
              {{ t("pages_staff_products_edit_title") }}
            </h1>
            <p class="text-gray-300 text-sm mt-1">
              {{ t("pages_staff_products_edit_subtitle") }}
            </p>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loadingProduct" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"
          />
          <p class="text-gray-300 mt-4">
            {{ t("pages_staff_products_edit_loading") }}
          </p>
        </div>

        <!-- Formulário -->
        <div
          v-else
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8"
        >
          <form @submit.prevent="updateProduct">
            <!-- Nome do Produto -->
            <div class="mb-6">
              <label class="block text-white font-semibold mb-2">
                {{ t("pages_staff_products_edit_name") }}
                <span class="text-red-400">*</span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                :placeholder="t('pages_staff_products_edit_name-placeholder')"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                :class="{ 'border-red-500': errors.name }"
              >
              <p v-if="errors.name" class="text-red-400 text-sm mt-1">
                {{ errors.name }}
              </p>
            </div>

            <!-- Descrição -->
            <div class="mb-6">
              <label class="block text-white font-semibold mb-2">
                {{ t("pages_staff_products_edit_description") }}
                <span class="text-red-400">*</span>
              </label>
              <textarea
                v-model="formData.description"
                rows="4"
                :placeholder="
                  t('pages_staff_products_edit_description-placeholder')
                "
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                :class="{ 'border-red-500': errors.description }"
              />
              <p v-if="errors.description" class="text-red-400 text-sm mt-1">
                {{ errors.description }}
              </p>
            </div>

            <!-- Preço e Promoção -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Preço -->
              <div>
                <label class="block text-white font-semibold mb-2">
                  {{ t("pages_staff_products_edit_price") }}
                  <span class="text-red-400">*</span>
                </label>
                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    R$
                  </span>
                  <input
                    v-model="formData.price"
                    type="number"
                    step="0.01"
                    min="0"
                    :placeholder="
                      t('pages_staff_products_edit_price-placeholder')
                    "
                    class="w-full pl-12 pr-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    :class="{ 'border-red-500': errors.price }"
                    @blur="formatPriceInput('price')"
                  >
                </div>
                <p v-if="errors.price" class="text-red-400 text-sm mt-1">
                  {{ errors.price }}
                </p>
              </div>

              <!-- Promoção (Checkbox) -->
              <div>
                <label class="block text-white font-semibold mb-2">
                  {{ t("pages_staff_products_edit_promotion") }}
                </label>
                <div
                  class="flex items-center h-[52px] px-4 bg-[#ffffff11] border border-[#ffffff22] rounded-lg"
                >
                  <label class="flex items-center cursor-pointer">
                    <input
                      v-model="formData.promotion"
                      type="checkbox"
                      class="w-5 h-5 text-yellow-400 bg-[#ffffff11] border-[#ffffff22] rounded focus:ring-yellow-400 focus:ring-2"
                    >
                    <span class="ml-3 text-gray-300">
                      {{
                        t("pages_staff_products_edit_promotion-checkbox-label")
                      }}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Imagem do Produto -->
            <div class="mb-8">
              <label class="block text-white font-semibold mb-2">
                {{ t("pages_staff_products_edit_image") }}
              </label>

              <!-- Imagem Atual -->
              <div v-if="currentImage && !imagePreview" class="mb-4">
                <p class="text-sm text-gray-400 mb-2">
                  {{ t("pages_staff_products_edit_current-image") }}
                </p>
                <img
                  :src="currentImage"
                  alt="Imagem atual"
                  class="w-48 h-48 object-cover rounded-lg border-2 border-[#ffffff22]"
                >
              </div>

              <!-- Preview da Nova Imagem -->
              <div v-if="imagePreview" class="mb-4 relative inline-block">
                <p class="text-sm text-gray-400 mb-2">
                  {{ t("pages_staff_products_edit_new-image") }}
                </p>
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-48 h-48 object-cover rounded-lg border-2 border-yellow-400"
                >
                <button
                  type="button"
                  class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
                  @click="removeNewImage"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Input de Upload -->
              <div
                class="border-2 border-dashed border-[#ffffff22] rounded-lg p-8 text-center hover:border-yellow-400 transition-colors cursor-pointer"
                :class="{ 'border-red-500': errors.image }"
                @click="$refs.fileInput.click()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 text-gray-400 mx-auto mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p class="text-white mb-1 text-sm">
                  {{ t("pages_staff_products_edit_image-upload") }}
                </p>
                <p class="text-gray-400 text-xs">
                  {{ t("pages_staff_products_edit_image-formats") }}
                </p>
              </div>

              <input
                id="image-input"
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageSelect"
              >

              <p v-if="errors.image" class="text-red-400 text-sm mt-2">
                {{ errors.image }}
              </p>

              <p class="text-gray-400 text-xs mt-2">
                {{ t("pages_staff_products_edit_image-info") }}
              </p>
            </div>

            <!-- Informação -->
            <div
              class="bg-blue-900/30 border border-blue-500/50 text-blue-200 px-4 py-3 rounded-lg mb-6 flex items-start gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-sm">
                {{ t("pages_staff_products_edit_info") }}
              </p>
            </div>

            <!-- Botões -->
            <div class="flex gap-4">
              <button
                type="button"
                class="flex-1 px-6 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white font-semibold rounded-lg hover:bg-[#ffffff22] transition-colors"
                :disabled="loading"
                @click="cancel"
              >
                {{ t("pages_staff_products_edit_cancel") }}
              </button>
              <button
                type="submit"
                class="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                :disabled="loading"
              >
                <svg
                  v-if="loading"
                  class="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span v-if="loading">
                  {{ t("pages_staff_products_edit_saving") }}
                </span>
                <span v-else>
                  {{ t("pages_staff_products_edit_save") }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animação de spin para loading */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Remover setas do input number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
