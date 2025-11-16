<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();
const toast = useToast();

// Estado do formulário
const formData = ref({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const loading = ref(false);
const errors = ref({});

// Função para fechar o modal
const closeModal = () => {
  emit("update:modelValue", false);
};

// Validar formulário
const validateForm = () => {
  errors.value = {};

  if (!formData.value.name || formData.value.name.trim() === "") {
    errors.value.name = t("components_contact_modal_error-name-required");
  }

  if (!formData.value.email || formData.value.email.trim() === "") {
    errors.value.email = t("components_contact_modal_error-email-required");
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = t("components_contact_modal_error-email-invalid");
  }

  if (!formData.value.subject || formData.value.subject.trim() === "") {
    errors.value.subject = t("components_contact_modal_error-subject-required");
  }

  if (!formData.value.message || formData.value.message.trim() === "") {
    errors.value.message = t("components_contact_modal_error-message-required");
  }

  return Object.keys(errors.value).length === 0;
};

// Validar email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Formatar telefone
const formatPhone = () => {
  let phone = formData.value.phone.replace(/\D/g, "");

  if (phone.length <= 11) {
    if (phone.length <= 10) {
      // Formato: (00) 0000-0000
      phone = phone.replace(/(\d{2})(\d)/, "($1) $2");
      phone = phone.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      // Formato: (00) 00000-0000
      phone = phone.replace(/(\d{2})(\d)/, "($1) $2");
      phone = phone.replace(/(\d{5})(\d)/, "$1-$2");
    }
    formData.value.phone = phone;
  }
};

// Enviar mensagem
const sendMessage = async () => {
  if (!validateForm()) {
    toast.add({
      severity: "error",
      summary: t("components_contact_modal_validation-error"),
      detail: t("components_contact_modal_validation-error-message"),
      life: 3000,
    });
    return;
  }

  loading.value = true;

  try {
    // Simular envio (aqui você implementaria a chamada real à API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.add({
      severity: "success",
      summary: t("components_contact_modal_success"),
      detail: t("components_contact_modal_success-message"),
      life: 3000,
    });

    // Limpar formulário
    formData.value = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    };

    // Fechar modal após sucesso
    setTimeout(() => {
      closeModal();
    }, 1000);
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    toast.add({
      severity: "error",
      summary: t("components_contact_modal_error"),
      detail: t("components_contact_modal_error-message"),
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

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

// Limpa formulário quando modal fecha
watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      errors.value = {};
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
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Botão Fechar -->
          <button
            class="absolute top-4 right-4 text-gray-300 hover:text-white transition z-10"
            :disabled="loading"
            @click="closeModal"
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

          <!-- Cabeçalho -->
          <div class="text-center mb-8">
            <div class="flex items-center justify-center gap-4 mb-4">
              <img src="/logo.svg" alt="Galaxy Cupcakes" class="h-16" >
              <img src="/imagotipo.svg" alt="Planet" class="h-16" >
            </div>
            <h2 class="text-4xl font-bold text-white mb-2">
              {{ t("components_contact_modal_title") }}
            </h2>
            <p class="text-gray-300">
              {{ t("components_contact_modal_subtitle") }}
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Informações de Contato -->
            <div class="space-y-6">
              <h3 class="text-2xl font-bold text-white mb-4">
                {{ t("components_contact_modal_info_title") }}
              </h3>

              <!-- Telefone -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-4 flex items-start gap-4"
              >
                <div
                  class="bg-yellow-400/20 p-3 rounded-full border border-yellow-300/30 flex-shrink-0"
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-400 mb-1">
                    {{ t("components_contact_modal_phone") }}
                  </p>
                  <p class="text-white font-semibold">(35) 3471-2000</p>
                  <p class="text-white font-semibold">(35) 99999-8888</p>
                </div>
              </div>

              <!-- Email -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-4 flex items-start gap-4"
              >
                <div
                  class="bg-yellow-400/20 p-3 rounded-full border border-yellow-300/30 flex-shrink-0"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-400 mb-1">
                    {{ t("components_contact_modal_email") }}
                  </p>
                  <p class="text-white font-semibold">
                    contato@galaxycupcakes.com.br
                  </p>
                  <p class="text-white font-semibold">
                    vendas@galaxycupcakes.com.br
                  </p>
                </div>
              </div>

              <!-- WhatsApp -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-4 flex items-start gap-4"
              >
                <div
                  class="bg-green-400/20 p-3 rounded-full border border-green-300/30 flex-shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347 .446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0.16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-400 mb-1">
                    {{ t("components_contact_modal_whatsapp") }}
                  </p>
                  <p class="text-white font-semibold">(35) 99999-8888</p>
                </div>
              </div>

              <!-- Endereço -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-4 flex items-start gap-4"
              >
                <div
                  class="bg-yellow-400/20 p-3 rounded-full border border-yellow-300/30 flex-shrink-0"
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
                <div>
                  <p class="text-sm text-gray-400 mb-1">
                    {{ t("components_contact_modal_address") }}
                  </p>
                  <p class="text-white font-semibold">
                    Rua das Estrelas, 1000<br >
                    Centro - Santa Rita do Sapucaí, MG<br >
                    CEP: 37540-000
                  </p>
                </div>
              </div>

              <!-- Horário de Atendimento -->
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-4 flex items-start gap-4"
              >
                <div
                  class="bg-yellow-400/20 p-3 rounded-full border border-yellow-300/30 flex-shrink-0"
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-400 mb-1">
                    {{ t("components_contact_modal_hours") }}
                  </p>
                  <p class="text-white font-semibold">
                    {{ t("components_contact_modal_hours_weekdays") }}: 08:00 -
                    18:00<br >
                    {{ t("components_contact_modal_hours_saturday") }}: 08:00 -
                    14:00<br >
                    {{ t("components_contact_modal_hours_sunday") }}:
                    {{ t("components_contact_modal_hours_closed") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Formulário de Contato -->
            <div>
              <h3 class="text-2xl font-bold text-white mb-4">
                {{ t("components_contact_modal_form_title") }}
              </h3>

              <form class="space-y-4" @submit.prevent="sendMessage" >
                <!-- Nome -->
                <div>
                  <label class="block text-white font-semibold mb-2">
                    {{ t("components_contact_modal_form_name") }}
                    <span class="text-red-400">*</span>
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    :placeholder="
                      t('components_contact_modal_form_name-placeholder')
                    "
                    class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    :class="{ 'border-red-500': errors.name }"
                    :disabled="loading"
                  >
                  <p v-if="errors.name" class="text-red-400 text-sm mt-1">
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-white font-semibold mb-2">
                    {{ t("components_contact_modal_form_email") }}
                    <span class="text-red-400">*</span>
                  </label>
                  <input
                    v-model="formData.email"
                    type="email"
                    :placeholder="
                      t('components_contact_modal_form_email-placeholder')
                    "
                    class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    :class="{ 'border-red-500': errors.email }"
                    :disabled="loading"
                  >
                  <p v-if="errors.email" class="text-red-400 text-sm mt-1">
                    {{ errors.email }}
                  </p>
                </div>

                <!-- Telefone -->
                <div>
                  <label class="block text-white font-semibold mb-2">
                    {{ t("components_contact_modal_form_phone") }}
                    <span class="text-gray-400 text-sm font-normal">
                      ({{ t("components_contact_modal_form_optional") }})
                    </span>
                  </label>
                  <input
                    v-model="formData.phone"
                    type="text"
                    maxlength="15"
                    :placeholder="
                      t('components_contact_modal_form_phone-placeholder')
                    "
                    class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    :disabled="loading"
                    @input="formatPhone"
                  >
                </div>

                <!-- Assunto -->
                <div>
                  <label class="block text-white font-semibold mb-2">
                    {{ t("components_contact_modal_form_subject") }}
                    <span class="text-red-400">*</span>
                  </label>
                  <input
                    v-model="formData.subject"
                    type="text"
                    :placeholder="
                      t('components_contact_modal_form_subject-placeholder')
                    "
                    class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    :class="{ 'border-red-500': errors.subject }"
                    :disabled="loading"
                  >
                  <p v-if="errors.subject" class="text-red-400 text-sm mt-1">
                    {{ errors.subject }}
                  </p>
                </div>

                <!-- Mensagem -->
                <div>
                  <label class="block text-white font-semibold mb-2">
                    {{ t("components_contact_modal_form_message") }}
                    <span class="text-red-400">*</span>
                  </label>
                  <textarea
                    v-model="formData.message"
                    rows="4"
                    :placeholder="
                      t('components_contact_modal_form_message-placeholder')
                    "
                    class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    :class="{ 'border-red-500': errors.message }"
                    :disabled="loading"
                  />
                  <p v-if="errors.message" class="text-red-400 text-sm mt-1">
                    {{ errors.message }}
                  </p>
                </div>

                <!-- Botão Enviar -->
                <button
                  type="submit"
                  class="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    {{ t("components_contact_modal_form_sending") }}
                  </span>
                  <span v-else>
                    {{ t("components_contact_modal_form_send") }}
                  </span>
                </button>
              </form>
            </div>
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

/* Animação de spin para loading */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
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
