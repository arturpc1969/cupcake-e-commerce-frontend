import { useAuth } from '~/composables/useAuth'
export default defineNuxtRouteMiddleware(() => {                                                                                                                      
    const auth = useAuth()
                                                                                                                                                                              
    // Verifica se o usuário está autenticado                                                                                                                                 
    if (!auth.isAuthenticated.value) {                                                                                                                                        
        return navigateTo('/login')                                                                                                                                           
    }                                                                                                                                                                         
                                                                                                                                                                              
    // Verifica se o usuário é staff                                                                                                                                          
    if (!auth.isStaff.value) {                                                                                                                                                
        // Redireciona para a página de produtos com mensagem de erro                                                                                                         
        return navigateTo({                                                                                                                                                   
            path: '/product',                                                                                                                                                 
            query: { error: 'Access denied. This area is restricted to employees.' }                                                                                                                                  
        })                                                                                                                                                                    
    }                                                                                                                                                                         
})
