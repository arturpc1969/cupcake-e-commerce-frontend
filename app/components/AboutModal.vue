<script setup>
import { watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();

// Função para fechar o modal
const closeModal = () => {
  emit("update:modelValue", false);
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
              {{ t("components_about_modal_title") }}
            </h2>
            <p class="text-yellow-300 text-lg font-semibold">
              {{ t("components_about_modal_subtitle") }}
            </p>
          </div>

          <!-- Conteúdo -->
          <div class="space-y-6">
            <!-- Nossa História -->
            <div
              class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-6"
            >
              <div class="flex items-center gap-3 mb-4">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">
                  {{ t("components_about_modal_history_title") }}
                </h3>
              </div>
              <p class="text-gray-300 leading-relaxed">
                {{ t("components_about_modal_history_text") }}
              </p>
            </div>

            <!-- Nossa Missão -->
            <div
              class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-6"
            >
              <div class="flex items-center gap-3 mb-4">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">
                  {{ t("components_about_modal_mission_title") }}
                </h3>
              </div>
              <p class="text-gray-300 leading-relaxed">
                {{ t("components_about_modal_mission_text") }}
              </p>
            </div>

            <!-- Nossos Valores -->
            <div
              class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-6"
            >
              <div class="flex items-center gap-3 mb-4">
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
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">
                  {{ t("components_about_modal_values_title") }}
                </h3>
              </div>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-yellow-300 flex-shrink-0 mt-0.5"
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
                  <div>
                    <p class="text-white font-semibold">
                      {{ t("components_about_modal_value_quality_title") }}
                    </p>
                    <p class="text-gray-300 text-sm">
                      {{ t("components_about_modal_value_quality_text") }}
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-yellow-300 flex-shrink-0 mt-0.5"
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
                  <div>
                    <p class="text-white font-semibold">
                      {{ t("components_about_modal_value_innovation_title") }}
                    </p>
                    <p class="text-gray-300 text-sm">
                      {{ t("components_about_modal_value_innovation_text") }}
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-yellow-300 flex-shrink-0 mt-0.5"
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
                  <div>
                    <p class="text-white font-semibold">
                      {{
                        t("components_about_modal_value_sustainability_title")
                      }}
                    </p>
                    <p class="text-gray-300 text-sm">
                      {{
                        t("components_about_modal_value_sustainability_text")
                      }}
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-yellow-300 flex-shrink-0 mt-0.5"
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
                  <div>
                    <p class="text-white font-semibold">
                      {{ t("components_about_modal_value_customer_title") }}
                    </p>
                    <p class="text-gray-300 text-sm">
                      {{ t("components_about_modal_value_customer_text") }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Localização -->
            <div
              class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg p-6"
            >
              <div class="flex items-center gap-3 mb-4">
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
                <h3 class="text-2xl font-bold text-white">
                  {{ t("components_about_modal_location_title") }}
                </h3>
              </div>
              <div class="space-y-2">
                <p class="text-gray-300">
                  <span class="text-white font-semibold"
                    >{{ t("components_about_modal_location_city") }}:</span
                  >
                  Santa Rita do Sapucaí, MG
                </p>
                <p class="text-gray-300">
                  <span class="text-white font-semibold"
                    >{{ t("components_about_modal_location_country") }}:</span
                  >
                  Brasil
                </p>
                <p class="text-gray-300">
                  <span class="text-white font-semibold"
                    >{{ t("components_about_modal_location_founded") }}:</span
                  >
                  2025
                </p>
              </div>
            </div>

            <!-- Diferenciais -->
            <div
              class="bg-gradient-to-r from-yellow-400/10 to-purple-400/10 border border-yellow-300/30 rounded-lg p-6"
            >
              <h3 class="text-2xl font-bold text-white mb-4 text-center">
                {{ t("components_about_modal_differentials_title") }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center">
                  <div
                    class="bg-yellow-400/20 p-4 rounded-full border border-yellow-300/30 w-16 h-16 mx-auto mb-3 flex items-center justify-center"
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p class="text-white font-semibold mb-1">
                    {{
                      t("components_about_modal_differential_delivery_title")
                    }}
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{ t("components_about_modal_differential_delivery_text") }}
                  </p>
                </div>

                <div class="text-center">
                  <div
                    class="bg-yellow-400/20 p-4 rounded-full border border-yellow-300/30 w-16 h-16 mx-auto mb-3 flex items-center justify-center"
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
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <p class="text-white font-semibold mb-1">
                    {{
                      t("components_about_modal_differential_ingredients_title")
                    }}
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{
                      t("components_about_modal_differential_ingredients_text")
                    }}
                  </p>
                </div>

                <div class="text-center">
                  <div
                    class="bg-yellow-400/20 p-4 rounded-full border border-yellow-300/30 w-16 h-16 mx-auto mb-3 flex items-center justify-center"
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p class="text-white font-semibold mb-1">
                    {{
                      t(
                        "components_about_modal_differential_customization_title"
                      )
                    }}
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{
                      t(
                        "components_about_modal_differential_customization_text"
                      )
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Botão Fechar -->
          <div class="mt-8 text-center">
            <button
              class="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
              @click="closeModal"
            >
              {{ t("components_about_modal_close") }}
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
