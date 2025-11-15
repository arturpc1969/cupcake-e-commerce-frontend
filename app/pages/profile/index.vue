<script setup>
import { useI18n } from "vue-i18n";

const { user, isAuthenticated } = useAuth();

const { t } = useI18n();

// Middleware para garantir que o usuário está autenticado
definePageMeta({
  middleware: "auth",
});

// Redireciona para login se não estiver autenticado
onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo("/product");
  }
});

// Voltar para produtos
const goBack = () => {
  navigateTo("/product");
};

const goToAddresses = () => {
  navigateTo("/profile/addresses");
};

const goToOrders = () => {
  navigateTo("/profile/orders");
};

const goToEditProfile = () => {
  navigateTo("/profile/edit");
};

// Formatar CPF para exibição                                                                                                                 
const formatCPF = (cpf) => {                                                                                                                  
  if (!cpf) return "-";                                                                                                                       
                                                                                                                                              
  // Remove qualquer formatação existente                                                                                                     
  let cleanCPF = cpf.replace(/\D/g, "");                                                                                                      
                                                                                                                                              
  // Aplica a formatação                                                                                                                      
  if (cleanCPF.length <= 11) {                                                                                                                
    cleanCPF = cleanCPF.replace(/(\d{3})(\d)/, "$1.$2");                                                                                      
    cleanCPF = cleanCPF.replace(/(\d{3})(\d)/, "$1.$2");                                                                                      
    cleanCPF = cleanCPF.replace(/(\d{3})(\d{1,2})$/, "$1-$2");                                                                                
    return cleanCPF;                                                                                                                          
  }                                                                                                                                           
                                                                                                                                              
  return cpf;                                                                                                                                 
};
</script>

<template>
  <div
    class="page-content-with-navbar min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Cabeçalho do Perfil -->
        <div
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8 mb-6"
        >
          <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
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
                {{ t("pages_profile_title") }}
              </h1>
            </div>
            <div class="flex gap-3">
              <button
                class="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
                @click="goToEditProfile"
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
                {{ t("pages_profile_edit") }}
              </button>
            </div>
          </div>

          <!-- Informações do Usuário -->
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Username -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
              >
                <label class="block text-sm font-semibold text-gray-300 mb-1">
                  {{ t("pages_profile_username") }}
                </label>
                <p class="text-lg text-white">{{ user?.username || "-" }}</p>
              </div>

              <!-- Email -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
              >
                <label class="block text-sm font-semibold text-gray-300 mb-1">
                  {{ t("pages_profile_email") }}
                </label>
                <p class="text-lg text-white">{{ user?.email || "-" }}</p>
              </div>

              <!-- First Name -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
              >
                <label class="block text-sm font-semibold text-gray-300 mb-1">
                  {{ t("pages_profile_first_name") }}
                </label>
                <p class="text-lg text-white">{{ user?.firstName || "-" }}</p>
              </div>

              <!-- Last Name -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
              >
                <label class="block text-sm font-semibold text-gray-300 mb-1">
                  {{ t("pages_profile_last_name") }}
                </label>
                <p class="text-lg text-white">{{ user?.lastName || "-" }}</p>
              </div>

              <!-- CPF -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg md:col-span-2"
              >
                <label class="block text-sm font-semibold text-gray-300 mb-1">
                  {{ t("pages_profile_cpf") }}
                </label>
                <p class="text-lg text-white">{{ formatCPF(user?.cpf) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Links de Navegação -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Meus Endereços -->
          <div
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 transform hover:border-yellow-300"
            @click="goToAddresses"
          >
            <div class="flex items-center space-x-4">
              <div
                class="bg-yellow-400/20 p-4 rounded-full border border-yellow-300/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-yellow-300"
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
              <div>
                <h2 class="text-xl font-bold text-white">
                  {{ t("pages_profile_my_addresses") }}
                </h2>
                <p class="text-gray-300">
                  {{ t("pages_profile_manage_addresses") }}
                </p>
              </div>
            </div>
          </div>

          <!-- Meus Pedidos -->
          <div
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 transform hover:border-yellow-300"
            @click="goToOrders"
          >
            <div class="flex items-center space-x-4">
              <div
                class="bg-yellow-400/20 p-4 rounded-full border border-yellow-300/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">
                  {{ t("pages_profile_my_orders") }}
                </h2>
                <p class="text-gray-300">
                  {{ t("pages_profile_view_orders") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionais se necessário */
</style>
