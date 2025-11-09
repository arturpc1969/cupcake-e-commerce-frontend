<script setup>                                                                                                                                                                
const auth = useAuth()                                                                                                                                                        
                                                                                                                                                                              
// Inicializa o estado de autenticação ao carregar a aplicação                                                                                                                
onMounted(async () => {                                                                                                                                                       
  await auth.initAuth()                                                                                                                                                       
})                                                                                                                                                                            
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    
    <NuxtPage />
  </div>
</template>
