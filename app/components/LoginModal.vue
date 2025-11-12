<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'login-success', 'switch-to-signup'])

const { t } = useI18n()
const auth = useAuth()

// Estado do formulário                                                                                                                       
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// Função para fechar o modal                                                                                                                 
const closeModal = () => {
  emit('update:modelValue', false)
}

// Função de login                                                                                                                            
const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await auth.login({
      username: username.value,
      password: password.value
    })

    if (result.success) {
      // Limpa o formulário                                                                                                                   
      username.value = ''
      password.value = ''
      error.value = ''

      // Emite evento de sucesso e fecha o modal                                                                                              
      emit('login-success')
      closeModal()
    } else {
      error.value = result.error || t('pages_login_error-generic')
    }
  } catch (err) {
    console.error('Erro no login:', err)
    error.value = t('pages_login_error-generic')
  } finally {
    loading.value = false
  }
}

// Limpa erros quando o modal é fechado                                                                                                       
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    error.value = ''
    username.value = ''
    password.value = ''
  }
})

// Previne scroll do body quando modal está aberto                                                                                            
watch(() => props.modelValue, (isOpen) => {
  if (import.meta.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Fecha modal ao pressionar ESC                                                                                                              
const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.modelValue) {
    closeModal()
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})                                                                                                                                            
</script>

<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="closeModal">
      <!-- Modal Container -->
      <Transition name="scale">
        <div v-if="modelValue"
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-8 w-full max-w-md relative"
          @click.stop>
          <!-- Botão Fechar -->
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-300 hover:text-white transition"
            :disabled="loading">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Título -->
          <h2 class="text-3xl font-bold text-white text-center mb-8">
            {{ t('pages_login_title') }}
          </h2>

          <!-- Formulário -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="modal-username" class="block text-sm font-medium text-gray-300 mb-2">
                {{ t('pages_login_username') }}
              </label>
              <input id="modal-username" v-model="username" type="text"
                :placeholder="t('pages_login_username-placeholder')" required :disabled="loading" class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2      
focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed" />
            </div>

            <div>
              <label for="modal-password" class="block text-sm font-medium text-gray-300 mb-2">
                {{ t('pages_login_password') }}
              </label>
              <input id="modal-password" v-model="password" type="password"
                :placeholder="t('pages_login_password-placeholder')" required :disabled="loading" class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] text-white placeholder-gray-400 rounded-lg focus:ring-2      
focus:ring-yellow-300 focus:border-transparent transition disabled:bg-[#ffffff05] disabled:cursor-not-allowed" />
            </div>

            <div v-if="error" class="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
              {{ error }}
            </div>

            <button type="submit" :disabled="loading" class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition disabled:bg-gray-600
disabled:text-gray-400 disabled:cursor-not-allowed">
              {{ loading ? t('pages_login_loading') : t('pages_login_submit') }}
            </button>
          </form>

          <!-- Link para Signup -->
          <div class="mt-6 text-center text-gray-300">
            {{ t('pages_login_no-account') }}
            <button                                                                                                                                   
              @click="$emit('switch-to-signup')"                                                                                                      
              class="text-yellow-300 hover:text-yellow-400 font-medium hover:underline"                                                               
            >                                                                                                                                         
              {{ t('pages_login_signup-link') }}                                                                                                      
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
</style>
