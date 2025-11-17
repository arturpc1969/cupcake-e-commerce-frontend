<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

// Middleware para garantir que o usuário está autenticado
definePageMeta({
  middleware: "auth",
});

// Estado
const loading = ref(true);
const saving = ref(false);
const error = ref("");
const successMessage = ref("");

// Dados do formulário
const formData = ref({
  addressName: "",
  addressDescription: "",
  city: "",
  state: "",
  zipCode: "",
});

// Validação
const errors = ref({
  addressName: "",
  addressDescription: "",
  city: "",
  state: "",
  zipCode: "",
});

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
  formData.value.zipCode = formatted;                                                                                                                                         
};

// Service
const { deliveryAddressService } = useServices();

// UUID do endereço
const addressUuid = computed(() => route.params.uuid);

// Carregar dados do endereço
const loadAddress = async () => {
  loading.value = true;
  error.value = "";

  try {
    const address = await deliveryAddressService.getDeliveryAddressByUuid(
      addressUuid.value
    );

    formData.value = {
      addressName: address.addressName,
      addressDescription: address.addressDescription,
      city: address.city,
      state: address.state,
      zipCode: formatZipCode(address.zipCode),
    };
  } catch (err) {
    console.error("Erro ao carregar endereço:", err);
    error.value = t("pages_delivery_address-edit-error-loading");
  } finally {
    loading.value = false;
  }
};

// Validar formulário
const validateForm = () => {
  let isValid = true;
  errors.value = {
    addressName: "",
    addressDescription: "",
    city: "",
    state: "",
    zipCode: "",
  };

  if (!formData.value.addressName.trim()) {
    errors.value.addressName = t(
      "pages_delivery_address-edit-error-name-required"
    );
    isValid = false;
  }

  if (!formData.value.addressDescription.trim()) {
    errors.value.addressDescription = t(
      "pages_delivery_address-edit-error-description-required"
    );
    isValid = false;
  }

  if (!formData.value.city.trim()) {
    errors.value.city = t("pages_delivery_address-edit-error-city-required");
    isValid = false;
  }

  if (!formData.value.state.trim()) {
    errors.value.state = t("pages_delivery_address-edit-error-state-required");
    isValid = false;
  }

  if (!formData.value.zipCode.trim()) {
    errors.value.zipCode = t(
      "pages_delivery_address-edit-error-zipcode-required"
    );
    isValid = false;
  } else if (!/^\d{5}-\d{3}$/.test(formData.value.zipCode)) {
    errors.value.zipCode = t(
      "pages_delivery_address-edit-error-zipcode-invalid"
    );
    isValid = false;
  }

  return isValid;
};

// Salvar alterações
const saveAddress = async () => {
  if (!validateForm()) {
    return;
  }

  saving.value = true;
  error.value = "";
  successMessage.value = "";

  try {
    // CRIAR OBJETO COM CEP SEM FORMATAÇÃO                                                                                                                                    
    const dataToSend = {                                                                                                                                                      
      address_name: formData.value.addressName,
      address_description: formData.value.addressDescription,
      city: formData.value.city,
      state: formData.value.state,
      zip_code: unformatZipCode(formData.value.zipCode), // REMOVER FORMATAÇÃO                                                                                                 
    };
    await deliveryAddressService.updateDeliveryAddress(
      addressUuid.value,
      dataToSend
    );

    successMessage.value = t("pages_delivery_address-edit-success");

    // Redireciona após 2 segundos
    setTimeout(() => {
      navigateTo("/profile/addresses");
    }, 2000);
  } catch (err) {
    console.error("Erro ao atualizar endereço:", err);
    error.value = t("pages_delivery_address-edit-error-saving");
  } finally {
    saving.value = false;
  }
};

// Cancelar e voltar
const cancel = () => {
  navigateTo("/profile/addresses");
};

// Voltar para listagem
const goBack = () => {
  navigateTo("/profile/addresses");
};

onMounted(() => {
  loadAddress();
});
</script>

<template>
  <div
    class="page-content-with-navbar min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- Cabeçalho -->
        <div class="flex items-center gap-4 mb-8">
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
          <h1 class="text-3xl font-bold text-white">
            {{ t("pages_delivery_address-edit-title") }}
          </h1>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"
          />
          <p class="text-gray-300 mt-4">
            {{ t("pages_delivery_address-edit-loading") }}
          </p>
        </div>

        <!-- Formulário -->
        <div
          v-else
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8"
        >
          <!-- Mensagem de Sucesso -->
          <div
            v-if="successMessage"
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
            {{ successMessage }}
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
            {{ error }}
          </div>

          <form class="space-y-6" @submit.prevent="saveAddress" >
            <!-- Nome do Endereço -->
            <div>
              <label
                for="addressName"
                class="block text-sm font-semibold text-gray-200 mb-2"
              >
                {{ t("pages_delivery_address-edit-form-name") }}
                <span class="text-red-400">*</span>
              </label>
              <input
                id="addressName"
                v-model="formData.addressName"
                type="text"
                class="w-full px-4 py-3 bg-[#ffffff11] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                :class="
                  errors.addressName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#ffffff22] focus:ring-yellow-400'
                "
                :placeholder="
                  t('pages_delivery_address-edit-form-name-placeholder')
                "
              >
              <p v-if="errors.addressName" class="text-red-400 text-sm mt-2">
                {{ errors.addressName }}
              </p>
            </div>

            <!-- Descrição do Endereço -->
            <div>
              <label
                for="addressDescription"
                class="block text-sm font-semibold text-gray-200 mb-2"
              >
                {{ t("pages_delivery_address-edit-form-description") }}
                <span class="text-red-400">*</span>
              </label>
              <textarea
                id="addressDescription"
                v-model="formData.addressDescription"
                rows="3"
                class="w-full px-4 py-3 bg-[#ffffff11] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none"
                :class="
                  errors.addressDescription
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#ffffff22] focus:ring-yellow-400'
                "
                :placeholder="
                  t('pages_delivery_address-edit-form-description-placeholder')
                "
              />
              <p
                v-if="errors.addressDescription"
                class="text-red-400 text-sm mt-2"
              >
                {{ errors.addressDescription }}
              </p>
            </div>

            <!-- Cidade e Estado -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Cidade -->
              <div>
                <label
                  for="city"
                  class="block text-sm font-semibold text-gray-200 mb-2"
                >
                  {{ t("pages_delivery_address-edit-form-city") }}
                  <span class="text-red-400">*</span>
                </label>
                <input
                  id="city"
                  v-model="formData.city"
                  type="text"
                  class="w-full px-4 py-3 bg-[#ffffff11] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                  :class="
                    errors.city
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-[#ffffff22] focus:ring-yellow-400'
                  "
                  :placeholder="
                    t('pages_delivery_address-edit-form-city-placeholder')
                  "
                >
                <p v-if="errors.city" class="text-red-400 text-sm mt-2">
                  {{ errors.city }}
                </p>
              </div>

              <!-- Estado -->
              <div>
                <label
                  for="state"
                  class="block text-sm font-semibold text-gray-200 mb-2"
                >
                  {{ t("pages_delivery_address-edit-form-state") }}
                  <span class="text-red-400">*</span>
                </label>
                <input
                  id="state"
                  v-model="formData.state"
                  type="text"
                  maxlength="2"
                  class="w-full px-4 py-3 bg-[#ffffff11] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all uppercase"
                  :class="
                    errors.state
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-[#ffffff22] focus:ring-yellow-400'
                  "
                  :placeholder="
                    t('pages_delivery_address-edit-form-state-placeholder')
                  "
                >
                <p v-if="errors.state" class="text-red-400 text-sm mt-2">
                  {{ errors.state }}
                </p>
              </div>
            </div>

            <!-- CEP -->
            <div>
              <label
                for="zipCode"
                class="block text-sm font-semibold text-gray-200 mb-2"
              >
                {{ t("pages_delivery_address-edit-form-zipcode") }}
                <span class="text-red-400">*</span>
              </label>
              <input
                id="zipCode"
                v-model="formData.zipCode"
                type="text"
                maxlength="9"
                class="w-full px-4 py-3 bg-[#ffffff11] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                :class="
                  errors.zipCode
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#ffffff22] focus:ring-yellow-400'
                  "
                :placeholder="
                  t('pages_delivery_address-edit-form-zipcode-placeholder')
                  "
                @input="handleZipCodeInput"
              >
              <p v-if="errors.zipCode" class="text-red-400 text-sm mt-2">
                {{ errors.zipCode }}
              </p>
            </div>

            <!-- Botões de Ação -->
            <div class="flex gap-4 pt-4">
              <button
                type="button"
                class="flex-1 px-6 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white font-semibold rounded-lg hover:bg-[#ffffff22] transition-colors"
                :disabled="saving"
                @click="cancel"
              >
                {{ t("pages_delivery_address-edit-form-cancel") }}
              </button>

              <button
                type="submit"
                class="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                :disabled="saving"
                :class="{ 'opacity-50 cursor-not-allowed': saving }"
              >
                <svg
                  v-if="saving"
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
                {{
                  saving
                    ? t("pages_delivery_address-edit-form-saving")
                    : t("pages_delivery_address-edit-form-save")
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animações já estão no Tailwind, mas podemos adicionar customizações se necessário */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}
</style>
