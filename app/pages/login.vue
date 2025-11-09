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
  <div class="login-container">                                                                                                                                               
    <div class="login-card">                                                                                                                                                  
      <h1>{{ t('pages_login_title') }}</h1>                                                                                                                                   
                                                                                                                                                                              
      <form @submit.prevent="handleLogin" class="login-form">                                                                                                                 
        <div class="form-group">                                                                                                                                              
          <label for="username">{{ t('pages_login_username') }}</label>                                                                                                       
          <input                                                                                                                                                              
            id="username"                                                                                                                                                     
            v-model="username"                                                                                                                                                
            type="text"                                                                                                                                                       
            :placeholder="t('pages_login_username-placeholder')"                                                                                                              
            required                                                                                                                                                          
            :disabled="loading"                                                                                                                                               
          />                                                                                                                                                                  
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <div class="form-group">                                                                                                                                              
          <label for="password">{{ t('pages_login_password') }}</label>                                                                                                       
          <input                                                                                                                                                              
            id="password"                                                                                                                                                     
            v-model="password"                                                                                                                                                
            type="password"                                                                                                                                                   
            :placeholder="t('pages_login_password-placeholder')"                                                                                                              
            required                                                                                                                                                          
            :disabled="loading"                                                                                                                                               
          />                                                                                                                                                                  
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <div v-if="error" class="error-message">                                                                                                                              
          {{ error }}                                                                                                                                                         
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <button                                                                                                                                                               
          type="submit"                                                                                                                                                       
          class="btn-login"                                                                                                                                                   
          :disabled="loading"                                                                                                                                                 
        >                                                                                                                                                                     
          {{ loading ? t('pages_login_loading') : t('pages_login_submit') }}                                                                                                  
        </button>                                                                                                                                                             
      </form>                                                                                                                                                                 
                                                                                                                                                                              
      <div class="signup-link">                                                                                                                                               
        {{ t('pages_login_no-account') }}                                                                                                                                     
        <NuxtLink to="/signup">{{ t('pages_login_signup-link') }}</NuxtLink>                                                                                                  
      </div>                                                                                                                                                                  
    </div>                                                                                                                                                                    
  </div>                                                                                                                                                                      
</template>                                                                                                                                                                   
                                                                                                                                                                              
<style scoped>                                                                                                                                                                
.login-container {                                                                                                                                                            
  display: flex;                                                                                                                                                              
  justify-content: center;                                                                                                                                                    
  align-items: center;                                                                                                                                                        
  min-height: 100vh;                                                                                                                                                          
  background-color: #f5f5f5;                                                                                                                                                  
  padding: 20px;                                                                                                                                                              
}                                                                                                                                                                             
                                                                                                                                                                              
.login-card {                                                                                                                                                                 
  background: white;                                                                                                                                                          
  padding: 40px;                                                                                                                                                              
  border-radius: 8px;                                                                                                                                                         
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);                                                                                                                                  
  width: 100%;                                                                                                                                                                
  max-width: 400px;                                                                                                                                                           
}                                                                                                                                                                             
                                                                                                                                                                              
.login-card h1 {                                                                                                                                                              
  margin-bottom: 30px;                                                                                                                                                        
  text-align: center;                                                                                                                                                         
  color: #333;                                                                                                                                                                
}                                                                                                                                                                             
                                                                                                                                                                              
.login-form {                                                                                                                                                                 
  display: flex;                                                                                                                                                              
  flex-direction: column;                                                                                                                                                     
  gap: 20px;                                                                                                                                                                  
}                                                                                                                                                                             
                                                                                                                                                                              
.form-group {                                                                                                                                                                 
  display: flex;                                                                                                                                                              
  flex-direction: column;                                                                                                                                                     
  gap: 8px;                                                                                                                                                                   
}                                                                                                                                                                             
                                                                                                                                                                              
.form-group label {                                                                                                                                                           
  font-weight: 500;                                                                                                                                                           
  color: #555;                                                                                                                                                                
}                                                                                                                                                                             
                                                                                                                                                                              
.form-group input {                                                                                                                                                           
  padding: 12px;                                                                                                                                                              
  border: 1px solid #ddd;                                                                                                                                                     
  border-radius: 4px;                                                                                                                                                         
  font-size: 16px;                                                                                                                                                            
  transition: border-color 0.3s;                                                                                                                                              
}                                                                                                                                                                             
                                                                                                                                                                              
.form-group input:focus {                                                                                                                                                     
  outline: none;                                                                                                                                                              
  border-color: #4CAF50;                                                                                                                                                      
}                                                                                                                                                                             
                                                                                                                                                                              
.form-group input:disabled {                                                                                                                                                  
  background-color: #f5f5f5;                                                                                                                                                  
  cursor: not-allowed;                                                                                                                                                        
}                                                                                                                                                                             
                                                                                                                                                                              
.error-message {                                                                                                                                                              
  padding: 12px;                                                                                                                                                              
  background-color: #ffebee;                                                                                                                                                  
  color: #c62828;                                                                                                                                                             
  border-radius: 4px;                                                                                                                                                         
  font-size: 14px;                                                                                                                                                            
}                                                                                                                                                                             
                                                                                                                                                                              
.btn-login {                                                                                                                                                                  
  padding: 12px;                                                                                                                                                              
  background-color: #4CAF50;                                                                                                                                                  
  color: white;                                                                                                                                                               
  border: none;                                                                                                                                                               
  border-radius: 4px;                                                                                                                                                         
  font-size: 16px;                                                                                                                                                            
  font-weight: 500;                                                                                                                                                           
  cursor: pointer;                                                                                                                                                            
  transition: background-color 0.3s;                                                                                                                                          
}                                                                                                                                                                             
                                                                                                                                                                              
.btn-login:hover:not(:disabled) {                                                                                                                                             
  background-color: #45a049;                                                                                                                                                  
}                                                                                                                                                                             
                                                                                                                                                                              
.btn-login:disabled {                                                                                                                                                         
  background-color: #cccccc;                                                                                                                                                  
  cursor: not-allowed;                                                                                                                                                        
}                                                                                                                                                                             
                                                                                                                                                                              
.signup-link {                                                                                                                                                                
  margin-top: 20px;                                                                                                                                                           
  text-align: center;                                                                                                                                                         
  color: #666;                                                                                                                                                                
}                                                                                                                                                                             
                                                                                                                                                                              
.signup-link a {                                                                                                                                                              
  color: #4CAF50;                                                                                                                                                             
  text-decoration: none;                                                                                                                                                      
  font-weight: 500;                                                                                                                                                           
}                                                                                                                                                                             
                                                                                                                                                                              
.signup-link a:hover {                                                                                                                                                        
  text-decoration: underline;                                                                                                                                                 
}                                                                                                                                                                             
</style>
