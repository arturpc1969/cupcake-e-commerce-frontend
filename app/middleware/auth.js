// import { useAuth } from '~/composables/useAuth'
// export default defineNuxtRouteMiddleware((to) => {                                                                                                                      
//     const auth = useAuth()                                                                                                                                                    
                                                                                                                                                                              
//     // Verifica se o usuário está autenticado                                                                                                                                 
//     if (!auth.isAuthenticated.value) {                                                                                                                                        
//         // Salva a rota de destino para redirecionar após o login                                                                                                             
//         const redirectPath = to.fullPath                                                                                                                                      
                                                                                                                                                                              
//         return navigateTo({                                                                                                                                                   
//             path: '/login',                                                                                                                                                   
//             query: { redirect: redirectPath }                                                                                                                                 
//         })                                                                                                                                                                    
//     }                                                                                                                                                                         
// })

export default defineNuxtRouteMiddleware(() => {                                                                                      
  const { isAuthenticated } = useAuth()                                                                                                       
                                                                                                                                              
  if (!isAuthenticated.value) {                                                                                                               
    return navigateTo('/product')                                                                                                               
  }                                                                                                                                           
})
