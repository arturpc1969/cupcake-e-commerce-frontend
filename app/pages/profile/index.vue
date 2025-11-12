<script setup>                                                                                                                                
import { useI18n } from 'vue-i18n';

const { user, isAuthenticated, logout } = useAuth();                                                                                          
                                                                                                                                              
const { t } = useI18n();                                                                                                                      
                                                                                                                                              
// Middleware para garantir que o usuário está autenticado                                                                                    
definePageMeta({
  middleware: 'auth'                                                                                                                          
});                                                                                                                                           
                                                                                                                                              
// Redireciona para login se não estiver autenticado                                                                                          
onMounted(() => {                                                                                                                             
  if (!isAuthenticated.value) {                                                                                                               
    navigateTo('/product');                                                                                                                     
  }                                                                                                                                           
});                                                                                                                                           
                                                                                                                                              
const goToAddresses = () => {                                                                                                                 
  navigateTo('/profile/addresses');                                                                                                           
};                                                                                                                                            
                                                                                                                                              
const goToOrders = () => {                                                                                                                    
  navigateTo('/profile/orders');                                                                                                              
};                                                                                                                                            
                                                                                                                                              
const handleLogout = () => {                                                                                                                  
  logout();                                                                                                                                   
};                                                                                                                                            
</script>                                                                                                                                     
                                                                                                                                              
<template>                                                                                                                                    
  <div class="min-h-screen bg-gradient-to-br from-[#1b074b] to-[#100033]">                                                                    
    <NavBar />                                                                                                                                
                                                                                                                                              
    <div class="container mx-auto px-4 py-8">                                                                                                 
      <div class="max-w-4xl mx-auto">                                                                                                         
        <!-- Cabeçalho do Perfil -->                                                                                                          
        <div class="bg-white rounded-lg shadow-lg p-8 mb-6">                                                                                  
          <div class="flex items-center justify-between mb-6">                                                                                
            <h1 class="text-3xl font-bold text-gray-800">                                                                                     
              {{ t('pages_profile_title') || 'Meu Perfil' }}                                                                                  
            </h1>                                                                                                                             
            <button                                                                                                                           
              @click="handleLogout"                                                                                                           
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"                                           
            >                                                                                                                                 
              {{ t('pages_profile_logout') || 'Sair' }}                                                                                       
            </button>                                                                                                                         
          </div>                                                                                                                              
                                                                                                                                              
          <!-- Informações do Usuário -->                                                                                                     
          <div class="space-y-4">                                                                                                             
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">                                                                               
              <!-- Username -->                                                                                                               
              <div class="bg-gray-50 p-4 rounded-lg">                                                                                         
                <label class="block text-sm font-semibold text-gray-600 mb-1">                                                                
                  {{ t('pages_profile_username') || 'Nome de Usuário' }}                                                                      
                </label>                                                                                                                      
                <p class="text-lg text-gray-800">{{ user?.username || '-' }}</p>                                                              
              </div>                                                                                                                          
                                                                                                                                              
              <!-- Email -->                                                                                                                  
              <div class="bg-gray-50 p-4 rounded-lg">                                                                                         
                <label class="block text-sm font-semibold text-gray-600 mb-1">                                                                
                  {{ t('pages_profile_email') || 'E-mail' }}                                                                                  
                </label>                                                                                                                      
                <p class="text-lg text-gray-800">{{ user?.email || '-' }}</p>                                                                 
              </div>                                                                                                                          
                                                                                                                                              
              <!-- First Name -->                                                                                                             
              <div class="bg-gray-50 p-4 rounded-lg">                                                                                         
                <label class="block text-sm font-semibold text-gray-600 mb-1">                                                                
                  {{ t('pages_profile_first_name') || 'Nome' }}                                                                               
                </label>                                                                                                                      
                <p class="text-lg text-gray-800">{{ user?.firstName || '-' }}</p>                                                             
              </div>                                                                                                                          
                                                                                                                                              
              <!-- Last Name -->                                                                                                              
              <div class="bg-gray-50 p-4 rounded-lg">                                                                                         
                <label class="block text-sm font-semibold text-gray-600 mb-1">                                                                
                  {{ t('pages_profile_last_name') || 'Sobrenome' }}                                                                           
                </label>                                                                                                                      
                <p class="text-lg text-gray-800">{{ user?.lastName || '-' }}</p>                                                              
              </div>                                                                                                                          
                                                                                                                                              
              <!-- CPF -->                                                                                                                    
              <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">                                                                           
                <label class="block text-sm font-semibold text-gray-600 mb-1">                                                                
                  {{ t('pages_profile_cpf') || 'CPF' }}                                                                                       
                </label>                                                                                                                      
                <p class="text-lg text-gray-800">{{ user?.cpf || '-' }}</p>                                                                   
              </div>                                                                                                                          
            </div>                                                                                                                            
          </div>                                                                                                                              
        </div>                                                                                                                                
                                                                                                                                              
        <!-- Links de Navegação -->                                                                                                           
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">                                                                                   
          <!-- Meus Endereços -->                                                                                                             
          <div                                                                                                                                
            @click="goToAddresses"                                                                                                            
            class="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow hover:scale-105 transform               
transition-transform"                                                                                                                         
          >                                                                                                                                   
            <div class="flex items-center space-x-4">                                                                                         
              <div class="bg-purple-100 p-4 rounded-full">                                                                                    
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827  
0l-4.244-4.243a8 8 0 1111.314 0z" />                                                                                                          
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />               
                </svg>                                                                                                                        
              </div>                                                                                                                          
              <div>                                                                                                                           
                <h2 class="text-xl font-bold text-gray-800">                                                                                  
                  {{ t('pages_profile_my_addresses') || 'Meus Endereços' }}                                                                   
                </h2>                                                                                                                         
                <p class="text-gray-600">                                                                                                     
                  {{ t('pages_profile_manage_addresses') || 'Gerencie seus endereços de entrega' }}                                           
                </p>                                                                                                                          
              </div>                                                                                                                          
            </div>                                                                                                                            
          </div>                                                                                                                              
                                                                                                                                              
          <!-- Meus Pedidos -->                                                                                                               
          <div                                                                                                                                
            @click="goToOrders"                                                                                                               
            class="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow hover:scale-105 transform               
transition-transform"                                                                                                                         
          >                                                                                                                                   
            <div class="flex items-center space-x-4">                                                                                         
              <div class="bg-yellow-100 p-4 rounded-full">                                                                                    
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />     
                </svg>                                                                                                                        
              </div>                                                                                                                          
              <div>                                                                                                                           
                <h2 class="text-xl font-bold text-gray-800">                                                                                  
                  {{ t('pages_profile_my_orders') || 'Meus Pedidos' }}                                                                        
                </h2>                                                                                                                         
                <p class="text-gray-600">                                                                                                     
                  {{ t('pages_profile_view_orders') || 'Visualize seu histórico de pedidos' }}                                                
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
