<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Middleware para garantir que o usuário está autenticado
definePageMeta({
  middleware: "auth",
});

// Estado do formulário
const formData = ref({
  address_name: "",
  address_description: "",
  city: "",
  state: "",
  zip_code: "",
});

const loading = ref(false);
const error = ref("");
const success = ref(false);

// Formatar CEP para exibição (00000-000)
const formatZipCode = (value) => {
  if (!value) return "";
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 5) {
    return numbers;
  }
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
};

// Remover formatação do CEP (apenas dígitos)
const unformatZipCode = (value) => {
  return value.replace(/\D/g, "");
};

// Handler para input do CEP
const handleZipCodeInput = (event) => {
  const formatted = formatZipCode(event.target.value);
  formData.value.zip_code = formatted;
};

// Service
const { deliveryAddressService } = useServices();

// Voltar para lista de endereços
const goBack = () => {
  navigateTo("/profile/addresses");
};

// Salvar endereço
const saveAddress = async () => {
  error.value = "";
  loading.value = true;

  try {
    // CRIAR OBJETO COM CEP SEM FORMATAÇÃO
    const dataToSend = {
      ...formData.value,
      zip_code: unformatZipCode(formData.value.zip_code), // REMOVER FORMATAÇÃO
    };

    await deliveryAddressService.createDeliveryAddress(dataToSend);

    success.value = true;

    // Redireciona após 1.5 segundos
    setTimeout(() => {
      navigateTo("/profile/addresses");
    }, 1500);
  } catch (err) {
    console.error("Erro ao criar endereço:", err);
    error.value = t("pages_profile_addresses_new_error");
  } finally {
    loading.value = false;
  }
};

// Validação básica
const isFormValid = computed(() => {
  const zipCodeValid = /^\d{5}-\d{3}$/.test(formData.value.zip_code); // VALIDAR FORMATO

  return (
    formData.value.address_name.trim() !== "" &&
    formData.value.address_description.trim() !== "" &&
    formData.value.city.trim() !== "" &&
    formData.value.state.trim() !== "" &&
    zipCodeValid // USAR VALIDAÇÃO DO FORMATO
  );
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- Cabeçalho -->
        <div class="flex items-center gap-4 mb-8">
          <button
            class="text-gray-300 hover:text-white transition-colors"
            :disabled="loading"
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
          <h1 class="text-3xl font-bold text-white">
            {{ t("pages_profile_addresses_new_title") }}
          </h1>
        </div>

        <!-- Formulário -->
        <div
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8"
        >
          <!-- Mensagem de Sucesso -->
          <div
            v-if="success"
            class="bg-green-900/30 border border-green-500/50 text-green-200 px-6 py-4 rounded-lg mb-6 flex items-center gap-3"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ t("pages_profile_addresses_new_success") }}</span>
          </div>

          <!-- Mensagem de Erro -->
          <div
            v-if="error"
            class="bg-red-900/30 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg mb-6 flex items-center gap-3"
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ error }}</span>
          </div>

          <form class="space-y-6" @submit.prevent="saveAddress">
            <!-- Nome do Endereço -->
            <div>
              <label
                for="address-name"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                {{ t("pages_profile_addresses_new_address_name") }}
                <span class="text-red-400">*</span>
              </label>
              <input
                id="address-name"
                v-model="formData.address_name"
                type="text"
                :placeholder="
                  t('pages_profile_addresses_new_address_name_placeholder')
                "
                required
                :disabled="loading || success"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
              >
            </div>

            <!-- Endereço Completo -->
            <div>
              <label
                for="address-description"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                {{ t("pages_profile_addresses_new_address_description") }}
                <span class="text-red-400">*</span>
              </label>
              <textarea
                id="address-description"
                v-model="formData.address_description"
                rows="3"
                :placeholder="
                  t(
                    'pages_profile_addresses_new_address_description_placeholder'
                  )
                "
                required
                :disabled="loading || success"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed resize-none"
              />
            </div>

            <!-- Cidade e Estado -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="city"
                  class="block text-sm font-medium text-gray-300 mb-2"
                >
                  {{ t("pages_profile_addresses_new_city") }}
                  <span class="text-red-400">*</span>
                </label>
                <input
                  id="city"
                  v-model="formData.city"
                  type="text"
                  :placeholder="
                    t('pages_profile_addresses_new_city_placeholder')
                  "
                  required
                  :disabled="loading || success"
                  class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
                >
              </div>

              <div>
                <label
                  for="state"
                  class="block text-sm font-medium text-gray-300 mb-2"
                >
                  {{ t("pages_profile_addresses_new_state") }}
                  <span class="text-red-400">*</span>
                </label>
                <input
                  id="state"
                  v-model="formData.state"
                  type="text"
                  :placeholder="
                    t('pages_profile_addresses_new_state_placeholder')
                  "
                  required
                  maxlength="2"
                  :disabled="loading || success"
                  class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed uppercase"
                  @input="formData.state = formData.state.toUpperCase()"
                >
              </div>
            </div>

            <!-- CEP -->
            <div>
              <label
                for="zip-code"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                {{ t("pages_profile_addresses_new_zip_code") }}
                <span class="text-red-400">*</span>
              </label>
              <input
                id="zip-code"
                v-model="formData.zip_code"
                type="text"
                :placeholder="
                  t('pages_profile_addresses_new_zip_code_placeholder')
                "
                required
                maxlength="9"
                :disabled="loading || success"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
                @input="handleZipCodeInput"
              >
            </div>

            <!-- Botões -->
            <div class="flex gap-4 pt-4">
              <button
                type="button"
                :disabled="loading || success"
                class="flex-1 px-6 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white font-semibold rounded-lg hover:bg-[#ffffff22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                @click="goBack"
              >
                {{ t("pages_profile_addresses_new_cancel") }}
              </button>

              <button
                type="submit"
                :disabled="loading || success || !isFormValid"
                class="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c03.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <svg
                  v-else-if="success"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <svg
                  v-else
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span v-if="loading">{{
                  t("pages_profile_addresses_new_saving")
                }}</span>
                <span v-else-if="success">{{
                  t("pages_profile_addresses_new_saved")
                }}</span>
                <span v-else>{{ t("pages_profile_addresses_new_save") }}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Informação adicional -->
        <div class="mt-6 text-center text-gray-400 text-sm">
          <p>
            {{ t("pages_profile_addresses_new_info") }}
          </p>
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
</style>
