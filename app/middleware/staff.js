import { useAuth } from '~/composables/useAuth'
import { useI18n } from 'vue-i18n'
export default defineNuxtRouteMiddleware(() => {                                                                                                                      
    const auth = useAuth()
    const { t } = useI18n()                                                                                                                                                    
                                                                                                                                                                              
    // Verifica se o usuário está autenticado                                                                                                                                 
    if (!auth.isAuthenticated.value) {                                                                                                                                        
        return navigateTo('/login')                                                                                                                                           
    }                                                                                                                                                                         
                                                                                                                                                                              
    // Verifica se o usuário é staff                                                                                                                                          
    if (!auth.isStaff.value) {                                                                                                                                                
        // Redireciona para a página de produtos com mensagem de erro                                                                                                         
        return navigateTo({                                                                                                                                                   
            path: '/product',                                                                                                                                                 
            query: { error: t('middleware_staff_access-denied') }                                                                                                                                  
        })                                                                                                                                                                    
    }                                                                                                                                                                         
})
