<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

definePageMeta({
  name: 'login',
  layout: false, // Sem layout padrão                                                                                                                                         
})

const { t } = useI18n()

useSeoMeta({
  title: t('pages_login_title'),
  ogTitle: t('pages_login_title'),
})

const auth = useAuth()
const route = useRoute()
const router = useRouter()

// Estado do formulário                                                                                                                                                       
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

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
      // Redireciona para a página de destino ou para produtos                                                                                                                
      const redirectPath = route.query.redirect || '/product'
      await router.push(redirectPath)
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

// Redireciona se já estiver autenticado                                                                                                                                      
onMounted(() => {
  if (auth.isAuthenticated.value) {
    router.push('/product')
  }
})                                                                                                                                                                            
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 class="text-3xl font-bold text-gray-800 text-center mb-8">
          {{ t('pages_login_title') }}
        </h1>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('pages_login_username') }}
            </label>
            <input id="username" v-model="username" type="text" :placeholder="t('pages_login_username-placeholder')"
              required :disabled="loading" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition 
disabled:bg-gray-100 disabled:cursor-not-allowed" />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('pages_login_password') }}
            </label>
            <input id="password" v-model="password" type="password" :placeholder="t('pages_login_password-placeholder')"
              required :disabled="loading" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition 
disabled:bg-gray-100 disabled:cursor-not-allowed" />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:bg-gray-400         
disabled:cursor-not-allowed">
            {{ loading ? t('pages_login_loading') : t('pages_login_submit') }}
          </button>
        </form>

        <div class="mt-6 text-center text-gray-600">
          {{ t('pages_login_no-account') }}
          <NuxtLink to="/signup" class="text-green-600 hover:text-green-700 font-medium hover:underline">
            {{ t('pages_login_signup-link') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
