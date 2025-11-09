<script setup>                                                                                                                                                                
import { ref } from 'vue'                                                                                                                                                     
import { useI18n } from 'vue-i18n'                                                                                                                                            
                                                                                                                                                                              
definePageMeta({                                                                                                                                                              
  name: 'signup',                                                                                                                                                             
  layout: false, // Sem layout padrão                                                                                                                                         
})                                                                                                                                                                            
                                                                                                                                                                              
const { t } = useI18n()                                                                                                                                                       
                                                                                                                                                                              
useSeoMeta({                                                                                                                                                                  
  title: t('pages_signup_title'),                                                                                                                                             
  ogTitle: t('pages_signup_title'),                                                                                                                                           
})                                                                                                                                                                            
                                                                                                                                                                              
const auth = useAuth()                                                                                                                                                        
const router = useRouter()                                                                                                                                                    
                                                                                                                                                                              
// Estado do formulário                                                                                                                                                       
const formData = ref({                                                                                                                                                        
  username: '',                                                                                                                                                               
  first_name: '',                                                                                                                                                             
  last_name: '',                                                                                                                                                              
  email: '',                                                                                                                                                                  
  cpf: '',                                                                                                                                                                    
  password: '',                                                                                                                                                               
  confirmPassword: ''                                                                                                                                                         
})                                                                                                                                                                            
                                                                                                                                                                              
const loading = ref(false)                                                                                                                                                    
const error = ref('')                                                                                                                                                         
                                                                                                                                                                              
// Validação de senha                                                                                                                                                         
const passwordsMatch = computed(() => {                                                                                                                                       
  return formData.value.password === formData.value.confirmPassword                                                                                                           
})                                                                                                                                                                            
                                                                                                                                                                              
// Função de cadastro                                                                                                                                                         
const handleSignup = async () => {                                                                                                                                            
  error.value = ''                                                                                                                                                            
                                                                                                                                                                              
  // Valida se as senhas coincidem                                                                                                                                            
  if (!passwordsMatch.value) {                                                                                                                                                
    error.value = t('pages_signup_password-mismatch-error')                                                                                                                   
    return                                                                                                                                                                    
  }                                                                                                                                                                           
                                                                                                                                                                              
  loading.value = true                                                                                                                                                        
                                                                                                                                                                              
  try {                                                                                                                                                                       
    const { confirmPassword, ...userData } = formData.value                                                                                                                   
                                                                                                                                                                              
    const result = await auth.signup(userData)                                                                                                                                
                                                                                                                                                                              
    if (result.success) {                                                                                                                                                     
      // Redireciona para a página de produtos após cadastro bem-sucedido                                                                                                     
      await router.push('/product')                                                                                                                                           
    } else {                                                                                                                                                                  
      error.value = result.error || t('pages_signup_generic-error')                                                                                                           
    }                                                                                                                                                                         
  } catch (err) {                                                                                                                                                             
    console.error('Erro no cadastro:', err)                                                                                                                                   
    error.value = t('pages_signup_generic-error')                                                                                                                             
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
  <div class="signup-container">                                                                                                                                              
    <div class="signup-card">                                                                                                                                                 
      <h1>{{ t('pages_signup_title') }}</h1>                                                                                                                                  
                                                                                                                                                                              
      <form @submit.prevent="handleSignup" class="signup-form">                                                                                                               
        <div class="form-group">                                                                                                                                              
          <label for="username">{{ t('pages_signup_username') }}</label>                                                                                                      
          <input                                                                                                                                                              
            id="username"                                                                                                                                                     
            v-model="formData.username"                                                                                                                                       
            type="text"                                                                                                                                                       
            :placeholder="t('pages_signup_username-placeholder')"                                                                                                             
            required                                                                                                                                                          
            :disabled="loading"                                                                                                                                               
          />                                                                                                                                                                  
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <div class="form-row">                                                                                                                                                
          <div class="form-group">                                                                                                                                            
            <label for="first_name">{{ t('pages_signup_first-name') }}</label>                                                                                                
            <input                                                                                                                                                            
              id="first_name"                                                                                                                                                 
              v-model="formData.first_name"                                                                                                                                   
              type="text"                                                                                                                                                     
              :placeholder="t('pages_signup_first-name-placeholder')"                                                                                                         
              required                                                                                                                                                        
              :disabled="loading"                                                                                                                                             
            />                                                                                                                                                                
          </div>                                                                                                                                                              
                                                                                                                                                                              
          <div class="form-group">                                                                                                                                            
            <label for="last_name">{{ t('pages_signup_last-name') }}</label>                                                                                                  
            <input                                                                                                                                                            
              id="last_name"                                                                                                                                                  
              v-model="formData.last_name"                                                                                                                                    
              type="text"                                                                                                                                                     
              :placeholder="t('pages_signup_last-name-placeholder')"                                                                                                          
              required                                                                                                                                                        
              :disabled="loading"                                                                                                                                             
            />                                                                                                                                                                
          </div>                                                                                                                                                              
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <div class="form-group">                                                                                                                                              
          <label for="email">{{ t('pages_signup_email') }}</label>                                                                                                            
          <input                                                                                                                                                              
            id="email"                                                                                                                                                        
            v-model="formData.email"                                                                                                                                          
            type="email"                                                                                                                                                      
            :placeholder="t('pages_signup_email-placeholder')"                                                                                                                
            required                                                                                                                                                          
            :disabled="loading"                                                                                                                                               
          />                                                                                                                                                                  
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <div class="form-group">                                                                                                                                              
          <label for="cpf">{{ t('pages_signup_cpf') }}</label>                                                                                                                
          <input                                                                                                                                                              
            id="cpf"                                                                                                                                                          
            v-model="formData.cpf"                                                                                                                                            
            type="text"                                                                                                                                                       
            :placeholder="t('pages_signup_cpf-placeholder')"                                                                                                                  
            required                                                                                                                                                          
            :disabled="loading"                                                                                                                                               
            maxlength="14"                                                                                                                                                    
          />                                                                                                                                                                  
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <div class="form-group">                                                                                                                                              
          <label for="password">{{ t('pages_signup_password') }}</label>                                                                                                      
          <input                                                                                                                                                              
            id="password"                                                                                                                                                     
            v-model="formData.password"                                                                                                                                       
            type="password"                                                                                                                                                   
            :placeholder="t('pages_signup_password-placeholder')"                                                                                                             
            required                                                                                                                                                          
            :disabled="loading"                                                                                                                                               
          />                                                                                                                                                                  
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <div class="form-group">                                                                                                                                              
          <label for="confirmPassword">{{ t('pages_signup_confirm-password') }}</label>                                                                                       
          <input                                                                                                                                                              
            id="confirmPassword"                                                                                                                                              
            v-model="formData.confirmPassword"                                                                                                                                
            type="password"                                                                                                                                                   
            :placeholder="t('pages_signup_confirm-password-placeholder')"                                                                                                     
            required                                                                                                                                                          
            :disabled="loading"                                                                                                                                               
            :class="{ 'error-input': formData.confirmPassword && !passwordsMatch }"                                                                                           
          />                                                                                                                                                                  
          <span v-if="formData.confirmPassword && !passwordsMatch" class="field-error">                                                                                       
            {{ t('pages_signup_password-mismatch-error') }}                                                                                                                   
          </span>                                                                                                                                                             
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <div v-if="error" class="error-message">                                                                                                                              
          {{ error }}                                                                                                                                                         
        </div>                                                                                                                                                                
                                                                                                                                                                              
        <button                                                                                                                                                               
          type="submit"                                                                                                                                                       
          class="btn-signup"                                                                                                                                                  
          :disabled="loading || !passwordsMatch"                                                                                                                              
        >                                                                                                                                                                     
          {{ loading ? t('pages_signup_loading') : t('pages_signup_submit') }}                                                                                                
        </button>                                                                                                                                                             
      </form>                                                                                                                                                                 
                                                                                                                                                                              
      <div class="login-link">                                                                                                                                                
        {{ t('pages_signup_have-account') }}                                                                                                                                  
        <NuxtLink to="/login">{{ t('pages_signup_login-link') }}</NuxtLink>                                                                                                   
      </div>                                                                                                                                                                  
    </div>                                                                                                                                                                    
  </div>                                                                                                                                                                      
</template>                                                                                                                                                                   
                                                                                                                                                                              
<style scoped>                                                                                                                                                                
.signup-container {                                                                                                                                                           
  display: flex;                                                                                                                                                              
  justify-content: center;                                                                                                                                                    
  align-items: center;                                                                                                                                                        
  min-height: 100vh;                                                                                                                                                          
  background-color: #f5f5f5;                                                                                                                                                  
  padding: 20px;                                                                                                                                                              
}                                                                                                                                                                             
                                                                                                                                                                              
.signup-card {                                                                                                                                                                
  background: white;                                                                                                                                                          
  padding: 40px;                                                                                                                                                              
  border-radius: 8px;                                                                                                                                                         
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);                                                                                                                                  
  width: 100%;                                                                                                                                                                
  max-width: 500px;                                                                                                                                                           
}                                                                                                                                                                             
                                                                                                                                                                              
.signup-card h1 {                                                                                                                                                             
  margin-bottom: 30px;                                                                                                                                                        
  text-align: center;                                                                                                                                                         
  color: #333;                                                                                                                                                                
}                                                                                                                                                                             
                                                                                                                                                                              
.signup-form {                                                                                                                                                                
  display: flex;                                                                                                                                                              
  flex-direction: column;                                                                                                                                                     
  gap: 20px;                                                                                                                                                                  
}                                                                                                                                                                             
                                                                                                                                                                              
.form-row {                                                                                                                                                                   
  display: grid;                                                                                                                                                              
  grid-template-columns: 1fr 1fr;                                                                                                                                             
  gap: 15px;                                                                                                                                                                  
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
                                                                                                                                                                              
.error-input {                                                                                                                                                                
  border-color: #c62828 !important;                                                                                                                                           
}                                                                                                                                                                             
                                                                                                                                                                              
.field-error {                                                                                                                                                                
  color: #c62828;                                                                                                                                                             
  font-size: 12px;                                                                                                                                                            
  margin-top: -4px;                                                                                                                                                           
}                                                                                                                                                                             
                                                                                                                                                                              
.error-message {                                                                                                                                                              
  padding: 12px;                                                                                                                                                              
  background-color: #ffebee;                                                                                                                                                  
  color: #c62828;                                                                                                                                                             
  border-radius: 4px;                                                                                                                                                         
  font-size: 14px;                                                                                                                                                            
}                                                                                                                                                                             
                                                                                                                                                                              
.btn-signup {                                                                                                                                                                 
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
                                                                                                                                                                              
.btn-signup:hover:not(:disabled) {                                                                                                                                            
  background-color: #45a049;                                                                                                                                                  
}                                                                                                                                                                             
                                                                                                                                                                              
.btn-signup:disabled {                                                                                                                                                        
  background-color: #cccccc;                                                                                                                                                  
  cursor: not-allowed;                                                                                                                                                        
}                                                                                                                                                                             
                                                                                                                                                                              
.login-link {                                                                                                                                                                 
  margin-top: 20px;                                                                                                                                                           
  text-align: center;                                                                                                                                                         
  color: #666;                                                                                                                                                                
}                                                                                                                                                                             
                                                                                                                                                                              
.login-link a {                                                                                                                                                               
  color: #4CAF50;                                                                                                                                                             
  text-decoration: none;                                                                                                                                                      
  font-weight: 500;                                                                                                                                                           
}                                                                                                                                                                             
                                                                                                                                                                              
.login-link a:hover {                                                                                                                                                         
  text-decoration: underline;                                                                                                                                                 
}                                                                                                                                                                             
                                                                                                                                                                              
@media (max-width: 600px) {                                                                                                                                                   
  .form-row {                                                                                                                                                                 
    grid-template-columns: 1fr;                                                                                                                                               
  }                                                                                                                                                                           
}                                                                                                                                                                             
</style>
