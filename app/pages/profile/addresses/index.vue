<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Middleware para garantir que o usuário está autenticado
definePageMeta({
  middleware: "auth",
});

// Estado
const addresses = ref([]);
const loading = ref(true);
const error = ref("");
const showDeleteModal = ref(false);
const addressToDelete = ref(null);

// Service
const { deliveryAddressService } = useServices();

// Formatar CEP para exibição (00000-000)
const formatZipCode = (value) => {
  if (!value) return "";
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 5) {
    return numbers;
  }
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
};

// Carregar endereços
const loadAddresses = async () => {
  loading.value = true;
  error.value = "";

  try {
    addresses.value = await deliveryAddressService.getAllDeliveryAddresses();
  } catch (err) {
    console.error("Erro ao carregar endereços:", err);
    error.value = t("pages_delivery_address-error-loading");
  } finally {
    loading.value = false;
  }
};

// Navegar para adicionar novo endereço
const goToAddAddress = () => {
  navigateTo("/profile/addresses/new");
};

// Navegar para editar endereço
const goToEditAddress = (uuid) => {
  navigateTo(`/profile/addresses/edit/${uuid}`);
};

// Confirmar exclusão
const confirmDelete = (address) => {
  addressToDelete.value = address;
  showDeleteModal.value = true;
};

// Cancelar exclusão
const cancelDelete = () => {
  showDeleteModal.value = false;
  addressToDelete.value = null;
};

// Deletar endereço
const deleteAddress = async () => {
  if (!addressToDelete.value) return;

  try {
    await deliveryAddressService.deleteDeliveryAddress(
      addressToDelete.value.uuid
    );

    // Remove da lista local
    addresses.value = addresses.value.filter(
      (addr) => addr.uuid !== addressToDelete.value.uuid
    );

    showDeleteModal.value = false;
    addressToDelete.value = null;
  } catch (err) {
    console.error("Erro ao deletar endereço:", err);
    error.value = t("pages_delivery_address-error-deleting");
    showDeleteModal.value = false;
  }
};

// Voltar para perfil
const goBack = () => {
  navigateTo("/profile");
};

onMounted(() => {
  loadAddresses();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
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
            <h1 class="text-3xl font-bold text-white">
              {{ t("pages_delivery_address-title") }}
            </h1>
          </div>

          <button
            class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
            @click="goToAddAddress"
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
            {{ t("pages_delivery_address-add-new") }}
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"
          />
          <p class="text-gray-300 mt-4">
            {{ t("pages_delivery_address-loading") }}
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
          v-else-if="addresses.length === 0"
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">
            {{ t("pages_delivery_address-no-addresses") }}
          </h3>
          <p class="text-gray-300 mb-6">
            {{ t("pages_delivery_address-no-addresses-message") }}
          </p>
          <button
            class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
            @click="goToAddAddress"
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
            {{ t("pages_delivery_address-add-first-address") }}
          </button>
        </div>

        <!-- Lista de Endereços -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="address in addresses"
            :key="address.uuid"
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-6 hover:shadow-xl transition-all"
          >
            <!-- Nome do Endereço -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="bg-yellow-400/20 p-3 rounded-full border border-yellow-300/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white">
                  {{ address.addressName }}
                </h3>
              </div>
            </div>

            <!-- Detalhes do Endereço -->
            <div class="space-y-3 mb-6">
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
              >
                <p class="text-sm text-gray-300 mb-1">
                  {{ t("pages_delivery_address-form-description") }}
                </p>
                <p class="text-white">{{ address.addressDescription }}</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-sm text-gray-300 mb-1">
                    {{ t("pages_delivery_address-form-city") }}
                  </p>
                  <p class="text-white">{{ address.city }}</p>
                </div>

                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-sm text-gray-300 mb-1">
                    {{ t("pages_delivery_address-form-state") }}
                  </p>
                  <p class="text-white">{{ address.state }}</p>
                </div>
              </div>

              <div
                class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
              >
                <p class="text-sm text-gray-300 mb-1">
                  {{ t("pages_delivery_address-form-zip-code") }}
                </p>
                <p class="text-white">{{ formatZipCode(address.zipCode) }}</p>
              </div>
            </div>

            <!-- Ações -->
            <div class="flex gap-3">
              <button
                class="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                @click="goToEditAddress(address.uuid)"
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
                {{ t("pages_delivery_address-edit") }}
              </button>

              <button
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                @click="confirmDelete(address)"
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
                {{ t("pages_delivery_address-delete") }}
              </button>
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
                {{ t("pages_delivery_address-delete-confirmation") }}
              </h3>
              <p class="text-gray-300">
                {{
                  t("pages_delivery_address-delete-confirmation-modal-message")
                }}
                <span class="font-semibold text-white">{{
                  addressToDelete?.addressName
                }}</span
                >?
              </p>
              <p class="text-gray-400 text-sm mt-2">
                {{
                  t("pages_delivery_address-delete-confirmation-modal-warning")
                }}
              </p>
            </div>

            <div class="flex gap-3">
              <button
                class="flex-1 px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white font-semibold rounded-lg hover:bg-[#ffffff22] transition-colors"
                @click="cancelDelete"
              >
                {{
                  t("pages_delivery_address-delete-confirmation-modal-cancel")
                }}
              </button>
              <button
                class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                @click="deleteAddress"
              >
                {{
                  t("pages_delivery_address-delete-confirmation-modal-confirm")
                }}
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
</style>
