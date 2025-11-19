<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";

const { t } = useI18n();
const toast = useToast();

// Middleware para garantir que o usuário está autenticado
definePageMeta({
  middleware: "auth",
});

const { user, fetchUserData } = useAuth();

// Estado do formulário
const formData = ref({
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  cpf: "",
});

const loading = ref(false);
const errors = ref({});

// Service
const { userService } = useServices();

// Carregar dados do usuário
const loadUserData = () => {
  if (user.value) {
    formData.value = {
      username: user.value.username || "",
      firstName: user.value.firstName || "",
      lastName: user.value.lastName || "",
      email: user.value.email || "",
      cpf: user.value.cpf || "",
    };
    // Formata o CPF após carregar                                                                                                            
    formatCPF();
  }
};

// Validar formulário
const validateForm = () => {
  errors.value = {};

  if (!formData.value.username || formData.value.username.trim() === "") {
    errors.value.username = t("pages_profile_edit_error-username-required");
  }

  if (!formData.value.firstName || formData.value.firstName.trim() === "") {
    errors.value.firstName = t("pages_profile_edit_error-first-name-required");
  }

  if (!formData.value.lastName || formData.value.lastName.trim() === "") {
    errors.value.lastName = t("pages_profile_edit_error-last-name-required");
  }

  if (!formData.value.email || formData.value.email.trim() === "") {
    errors.value.email = t("pages_profile_edit_error-email-required");
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = t("pages_profile_edit_error-email-invalid");
  }

  if (!formData.value.cpf || formData.value.cpf.trim() === "") {
    errors.value.cpf = t("pages_profile_edit_error-cpf-required");
  }

  return Object.keys(errors.value).length === 0;
};

// Validar email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Atualizar perfil
const updateProfile = async () => {
  if (!validateForm()) {
    toast.add({
      severity: "error",
      summary: t("pages_profile_edit_validation-error"),
      detail: t("pages_profile_edit_validation-error-message"),
      life: 3000,
    });
    return;
  }

  loading.value = true;

  try {
    const userData = {
      username: formData.value.username.trim(),
      first_name: formData.value.firstName.trim(),
      last_name: formData.value.lastName.trim(),
      email: formData.value.email.trim(),
      cpf: formData.value.cpf.replace(/\D/g, ""),
    };

    await userService.updateMyUserData(userData);

    // Atualizar dados do usuário no estado global
    await fetchUserData();

    toast.add({
      severity: "success",
      summary: t("pages_profile_edit_success"),
      detail: t("pages_profile_edit_success-message"),
      life: 3000,
    });

    // Redirecionar para perfil
    setTimeout(() => {
      navigateTo("/profile");
    }, 1000);
  } catch (err) {
    console.error("Erro ao atualizar perfil:", err);
    toast.add({
      severity: "error",
      summary: t("pages_profile_edit_error"),
      detail: t("pages_profile_edit_error-message"),
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

// Cancelar e voltar
const cancel = () => {
  navigateTo("/profile");
};

// Formatar CPF
const formatCPF = () => {
  let cpf = formData.value.cpf.replace(/\D/g, "");

  if (cpf.length <= 11) {
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    formData.value.cpf = cpf;
  }
};

onMounted(() => {
  loadUserData();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />
    <Toast />

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
              {{ t("pages_profile_edit_title") }}
            </h1>
            <p class="text-gray-300 text-sm mt-1">
              {{ t("pages_profile_edit_subtitle") }}
            </p>
          </div>
        </div>

        <!-- Formulário -->
        <div
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8"
        >
          <form @submit.prevent="updateProfile">
            <!-- Username -->
            <div class="mb-6">
              <label class="block text-white font-semibold mb-2">
                {{ t("pages_profile_edit_username") }}
                <span class="text-red-400">*</span>
              </label>
              <input
                v-model="formData.username"
                type="text"
                :placeholder="t('pages_profile_edit_username-placeholder')"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                :class="{ 'border-red-500': errors.username }"
              >
              <p v-if="errors.username" class="text-red-400 text-sm mt-1">
                {{ errors.username }}
              </p>
            </div>

            <!-- Nome e Sobrenome -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Primeiro Nome -->
              <div>
                <label class="block text-white font-semibold mb-2">
                  {{ t("pages_profile_edit_first-name") }}
                  <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  :placeholder="t('pages_profile_edit_first-name-placeholder')"
                  class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  :class="{ 'border-red-500': errors.firstName }"
                >
                <p v-if="errors.firstName" class="text-red-400 text-sm mt-1">
                  {{ errors.firstName }}
                </p>
              </div>

              <!-- Sobrenome -->
              <div>
                <label class="block text-white font-semibold mb-2">
                  {{ t("pages_profile_edit_last-name") }}
                  <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  :placeholder="t('pages_profile_edit_last-name-placeholder')"
                  class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  :class="{ 'border-red-500': errors.lastName }"
                >
                <p v-if="errors.lastName" class="text-red-400 text-sm mt-1">
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="mb-6">
              <label class="block text-white font-semibold mb-2">
                {{ t("pages_profile_edit_email") }}
                <span class="text-red-400">*</span>
              </label>
              <input
                v-model="formData.email"
                type="email"
                :placeholder="t('pages_profile_edit_email-placeholder')"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                :class="{ 'border-red-500': errors.email }"
              >
              <p v-if="errors.email" class="text-red-400 text-sm mt-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- CPF -->
            <div class="mb-6">
              <label class="block text-white font-semibold mb-2">
                {{ t("pages_profile_edit_cpf") }}
                <span class="text-red-400">*</span>
              </label>
              <input
                v-model="formData.cpf"
                type="text"
                maxlength="14"
                :placeholder="t('pages_profile_edit_cpf-placeholder')"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                :class="{ 'border-red-500': errors.cpf }"
                @input="formatCPF"
              >
              <p v-if="errors.cpf" class="text-red-400 text-sm mt-1">
                {{ errors.cpf }}
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
                {{ t("pages_profile_edit_info") }}
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
                {{ t("pages_profile_edit_cancel") }}
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
                  {{ t("pages_profile_edit_saving") }}
                </span>
                <span v-else>
                  {{ t("pages_profile_edit_save") }}
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
</style>
