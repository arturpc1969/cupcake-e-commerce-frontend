<script setup>
import NavBar from '~/components/NavBar.vue'
import HeroSection from '~/components/HeroSection.vue'
import ProductDataView from '~/components/ProductDataView.vue';

// import { ref } from 'vue'

const { isOpen, openLoginModal } = useLoginModal()

// const auth = useAuth()                                                                                                                        
// const showLoginModal = ref(false)                                                                                                             
                                                                                                                                              
// // Abre o modal de login                                                                                                                      
// const openLoginModal = () => {                                                                                                                
//   showLoginModal.value = true                                                                                                                 
// }                                                                                                                                             
                                                                                                                                              
// Callback quando login for bem-sucedido                                                                                                     
const handleLoginSuccess = () => {                                                                                                            
  console.log('Login realizado com sucesso!')                                                                                                 
  // Você pode adicionar lógica adicional aqui, como recarregar dados                                                                         
}                                                                                                                                             
                                                                                                                                              
// Verifica se o usuário não está autenticado ao montar                                                                                       
// onMounted(() => {                                                                                                                             
//   if (!auth.isAuthenticated.value) {                                                                                                          
//     // Opcional: abrir modal automaticamente se não estiver autenticado                                                                       
//     // openLoginModal()                                                                                                                       
//   }                                                                                                                                           
// })                                                                                                                                            
                                                                                                                                              
// Expõe a função para outros componentes (ex: NavBar)                                                                                        
// defineExpose({                                                                                                                                
//   openLoginModal                                                                                                                              
// })

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar @open-login="openLoginModal" />
    <HeroSection />
    <ProductDataView />
    <!-- Modal de Login -->                                                                                                                   
    <LoginModal                                                                                                                               
      v-model="isOpen"                                                                                                                
      @login-success="handleLoginSuccess"                                                                                                     
    />
  </div>
</template>
