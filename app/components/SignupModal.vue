<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "signup-success"]);

const { t } = useI18n();
const auth = useAuth();

// Estado do formulário
const formData = ref({
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  cpf: "",
  password: "",
  confirmPassword: "",
});

const loading = ref(false);
const error = ref("");

// Validação de senha
const passwordsMatch = computed(() => {
  return formData.value.password === formData.value.confirmPassword;
});

// Função para fechar o modal
const closeModal = () => {
  emit("update:modelValue", false);
};

// Função de cadastro
const handleSignup = async () => {
  error.value = "";

  // Valida se as senhas coincidem
  if (!passwordsMatch.value) {
    error.value = t("pages_signup_password-mismatch-error");
    return;
  }

  loading.value = true;

  try {
    const { confirmPassword, ...userData } = formData.value;

    const result = await auth.signup(userData);

    if (result.success) {
      // Limpa o formulário
      formData.value = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
      };
      error.value = "";

      // Emite evento de sucesso e fecha o modal
      emit("signup-success");
      closeModal();
    } else {
      error.value = result.error || t("pages_signup_generic-error");
    }
  } catch (err) {
    console.error("Erro no cadastro:", err);
    error.value = t("pages_signup_generic-error");
  } finally {
    loading.value = false;
  }
};

// Limpa erros e formulário quando o modal é fechado
watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      error.value = "";
      formData.value = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
      };
    }
  }
);

// Previne scroll do body quando modal está aberto
watch(
  () => props.modelValue,
  (isOpen) => {
    if (import.meta.client) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }
);

// Fecha modal ao pressionar ESC
const handleKeydown = (e) => {
  if (e.key === "Escape" && props.modelValue) {
    closeModal();
  }
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("keydown", handleKeydown);
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <!-- Modal Container -->
      <Transition name="scale">
        <div
          v-if="modelValue"
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Botão Fechar -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-300 hover:text-white transition z-10"
            :disabled="loading"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Título -->
          <h2 class="text-3xl font-bold text-white text-center mb-8">
            {{ t("pages_signup_title") }}
          </h2>

          <!-- Formulário -->
          <form @submit.prevent="handleSignup" class="space-y-5">
            <!-- Username -->
            <div>
              <label
                for="modal-username"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                {{ t("pages_signup_username") }}
              </label>
              <input
                id="modal-username"
                v-model="formData.username"
                type="text"
                :placeholder="t('pages_signup_username-placeholder')"
                required
                :disabled="loading"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
              />
            </div>

            <!-- First Name e Last Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="modal-first-name"
                  class="block text-sm font-medium text-gray-300 mb-2"
                >
                  {{ t("pages_signup_first-name") }}
                </label>
                <input
                  id="modal-first-name"
                  v-model="formData.first_name"
                  type="text"
                  :placeholder="t('pages_signup_first-name-placeholder')"
                  required
                  :disabled="loading"
                  class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  for="modal-last-name"
                  class="block text-sm font-medium text-gray-300 mb-2"
                >
                  {{ t("pages_signup_last-name") }}
                </label>
                <input
                  id="modal-last-name"
                  v-model="formData.last_name"
                  type="text"
                  :placeholder="t('pages_signup_last-name-placeholder')"
                  required
                  :disabled="loading"
                  class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label
                for="modal-email"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                {{ t("pages_signup_email") }}
              </label>
              <input
                id="modal-email"
                v-model="formData.email"
                type="email"
                :placeholder="t('pages_signup_email-placeholder')"
                required
                :disabled="loading"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
              />
            </div>

            <!-- CPF -->
            <div>
              <label
                for="modal-cpf"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                {{ t("pages_signup_cpf") }}
              </label>
              <input
                id="modal-cpf"
                v-model="formData.cpf"
                type="text"
                :placeholder="t('pages_signup_cpf-placeholder')"
                required
                :disabled="loading"
                maxlength="14"
                class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
              />
            </div>

            <!-- Password e Confirm Password -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="modal-password"
                  class="block text-sm font-medium text-gray-300 mb-2"
                >
                  {{ t("pages_signup_password") }}
                </label>
                <input
                  id="modal-password"
                  v-model="formData.password"
                  type="password"
                  :placeholder="t('pages_signup_password-placeholder')"
                  required
                  :disabled="loading"
                  class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  for="modal-confirm-password"
                  class="block text-sm font-medium text-gray-300 mb-2"
                >
                  {{ t("pages_signup_confirm-password") }}
                </label>
                <input
                  id="modal-confirm-password"
                  v-model="formData.confirmPassword"
                  type="password"
                  :placeholder="t('pages_signup_confirm-password-placeholder')"
                  required
                  :disabled="loading"
                  :class="[ 'w-full px-4 py-3 bg-[#ffffff11] border text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed', formData.confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-[#ffffff22]' ]"
                />
                <span
                  v-if="formData.confirmPassword && !passwordsMatch"
                  class="text-red-400 text-xs mt-1 block"
                >
                  {{ t("pages_signup_password-mismatch-error") }}
                </span>
              </div>
            </div>

            <!-- Mensagem de Erro -->
            <div
              v-if="error"
              class="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm"
            >
              {{ error }}
            </div>

            <!-- Botão Submit -->
            <button
              type="submit"
              :disabled="loading || !passwordsMatch"
              class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {{
                loading ? t("pages_signup_loading") : t("pages_signup_submit")
              }}
            </button>
          </form>

          <!-- Link para Login -->
          <div class="mt-6 text-center text-gray-300">
            {{ t("pages_signup_have-account") }}
            <button
              @click="$emit('switch-to-login')"
              class="text-yellow-300 hover:text-yellow-400 font-medium hover:underline"
            >
              {{ t("pages_signup_login-link") }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
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

/* Customização da scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
