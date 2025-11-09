import { isTokenExpired, isTokenExpiringSoon } from '~/utils/jwt'
import { useI18n } from 'vue-i18n'                                                                            
                                                                                                                                                                              
export const useAuth = () => {
    
    const { t } = useI18n()

    // Estado reativo para autenticação                                                                                                                                       
    const accessToken = useState('auth_access_token', () => null)                                                                                                             
    const refreshToken = useState('auth_refresh_token', () => null)                                                                                                           
    const user = useState('auth_user', () => null)                                                                                                                            
    const isAuthenticated = computed(() => !!accessToken.value && !!user.value)                                                                                               
    const isStaff = computed(() => user.value?.is_staff || false)                                                                                                             
                                                                                                                                                                              
    const config = useRuntimeConfig()                                                                                                                                         
    const baseUrl = config.public.apiBase                                                                                                                                     
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Salva os tokens no estado e no localStorage                                                                                                                            
     */                                                                                                                                                                       
    const setTokens = (access, refresh) => {                                                                                                                                  
        accessToken.value = access                                                                                                                                            
        refreshToken.value = refresh                                                                                                                                          
                                                                                                                                                                              
        if (import.meta.client) {                                                                                                                                             
            localStorage.setItem('access_token', access)                                                                                                                      
            localStorage.setItem('refresh_token', refresh)                                                                                                                    
        }                                                                                                                                                                     
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Remove os tokens do estado e do localStorage                                                                                                                           
     */                                                                                                                                                                       
    const clearTokens = () => {                                                                                                                                               
        accessToken.value = null                                                                                                                                              
        refreshToken.value = null                                                                                                                                             
        user.value = null                                                                                                                                                     
                                                                                                                                                                              
        if (import.meta.client) {                                                                                                                                             
            localStorage.removeItem('access_token')                                                                                                                           
            localStorage.removeItem('refresh_token')                                                                                                                          
        }                                                                                                                                                                     
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Busca os dados do usuário autenticado                                                                                                                                  
     */                                                                                                                                                                       
    const fetchUserData = async () => {                                                                                                                                       
        try {                                                                                                                                                                 
            const endpoint = `${baseUrl}/api/users/me`                                                                                                                        
            const userData = await $fetch(endpoint, {                                                                                                                         
                method: 'GET',                                                                                                                                                
                headers: {                                                                                                                                                    
                    'Authorization': `Bearer ${accessToken.value}`                                                                                                            
                }                                                                                                                                                             
            })                                                                                                                                                                
            user.value = userData                                                                                                                                             
            return userData                                                                                                                                                   
        } catch (error) {                                                                                                                                                     
            console.error(error)                                                                                                          
            clearTokens()                                                                                                                                                     
            throw error                                                                                                                                                       
        }                                                                                                                                                                     
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Faz login do usuário                                                                                                                                                   
     */                                                                                                                                                                       
    const login = async (credentials) => {                                                                                                                                    
        try {                                                                                                                                                                 
            const endpoint = `${baseUrl}/api/auth/login`                                                                                                                      
            const response = await $fetch(endpoint, {                                                                                                                         
                method: 'POST',                                                                                                                                               
                body: credentials,                                                                                                                                            
                headers: {                                                                                                                                                    
                    'Content-Type': 'application/json',                                                                                                                       
                }                                                                                                                                                             
            })                                                                                                                                                                
                                                                                                                                                                              
            if (response.access && response.refresh) {                                                                                                                        
                setTokens(response.access, response.refresh)                                                                                                                  
                await fetchUserData()                                                                                                                                         
                return { success: true, user: user.value }                                                                                                                    
            }                                                                                                                                                                 
                                                                                                                                                                              
            return { success: false, error: t('composables_use-auth_login_tokens-not-received-error') }                                                                                                          
        } catch (error) {                                                                                                                                                     
            console.error(error)                                                                                                                            
            return { success: false, error: error.message || t('composables_use-auth_login_error-message') }                                                                                          
        }                                                                                                                                                                     
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Faz logout do usuário                                                                                                                                                  
     */                                                                                                                                                                       
    const logout = () => {                                                                                                                                                    
        clearTokens()                                                                                                                                                         
        navigateTo('/login')                                                                                                                                                  
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Registra um novo usuário                                                                                                                                               
     */                                                                                                                                                                       
    const signup = async (userData) => {                                                                                                                                      
        try {                                                                                                                                                                 
            const endpoint = `${baseUrl}/api/auth/signup`                                                                                                                     
            const response = await $fetch(endpoint, {                                                                                                                         
                method: 'POST',                                                                                                                                               
                body: userData,                                                                                                                                               
                headers: {                                                                                                                                                    
                    'Content-Type': 'application/json',                                                                                                                       
                }                                                                                                                                                             
            })                                                                                                                                                                
                                                                                                                                                                              
            if (response.uuid) {                                                                                                                                              
                // Após criar o usuário, faz login automaticamente                                                                                                            
                const loginResult = await login({                                                                                                                             
                    username: userData.username,                                                                                                                              
                    password: userData.password                                                                                                                               
                })                                                                                                                                                            
                                                                                                                                                                              
                return loginResult                                                                                                                                            
            }                                                                                                                                                                 
                                                                                                                                                                              
            return { success: false, error: t('composables_use-auth_signup_error-message') }                                                                                                         
        } catch (error) {                                                                                                                                                     
            console.error(error)                                                                                                                           
            return { success: false, error: error.message || t('composables_use-auth_signup_error-message') }                                                                                          
        }                                                                                                                                                                     
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Atualiza o access token usando o refresh token                                                                                                                         
     */                                                                                                                                                                       
    const refreshAccessToken = async () => {                                                                                                                                  
        try {                                                                                                                                                                 
            if (!refreshToken.value) {                                                                                                                                        
                throw new Error(t('composables_use-auth_refresh-access-token_no-refresh-token-error'))                                                                                                               
            }                                                                                                                                                                 
                                                                                                                                                                              
            const endpoint = `${baseUrl}/api/auth/refresh`                                                                                                                    
            const response = await $fetch(endpoint, {                                                                                                                         
                method: 'POST',                                                                                                                                               
                body: { refresh: refreshToken.value },                                                                                                                        
                headers: {                                                                                                                                                    
                    'Content-Type': 'application/json',                                                                                                                       
                }                                                                                                                                                             
            })                                                                                                                                                                
                                                                                                                                                                              
            if (response.access) {                                                                                                                                            
                accessToken.value = response.access                                                                                                                           
                                                                                                                                                                              
                if (import.meta.client) {                                                                                                                                     
                    localStorage.setItem('access_token', response.access)                                                                                                     
                }                                                                                                                                                             
                                                                                                                                                                              
                return response.access                                                                                                                                        
            }                                                                                                                                                                 
                                                                                                                                                                              
            throw new Error(t('composables_use-auth_refresh-access-token_not-received-new-access-token-error'))                                                                                                                 
        } catch (error) {                                                                                                                                                     
            console.error(error)                                                                                                                    
            clearTokens()                                                                                                                                                     
            navigateTo('/login')                                                                                                                                              
            throw error                                                                                                                                                       
        }                                                                                                                                                                     
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Verifica se o token precisa ser renovado e renova se necessário                                                                                                        
     */                                                                                                                                                                       
    const ensureValidToken = async () => {                                                                                                                                    
        if (!accessToken.value) {                                                                                                                                             
            return null                                                                                                                                                       
        }                                                                                                                                                                     
                                                                                                                                                                              
        if (isTokenExpired(accessToken.value)) {                                                                                                                              
            // Token expirado, tenta renovar                                                                                                                                  
            return await refreshAccessToken()                                                                                                                                 
        }                                                                                                                                                                     
                                                                                                                                                                              
        if (isTokenExpiringSoon(accessToken.value)) {                                                                                                                         
            // Token expira em breve, renova proativamente                                                                                                                    
            try {                                                                                                                                                             
                return await refreshAccessToken()                                                                                                                             
            } catch (error) {
                console.error(error)                                                                                                                                        
                // Se falhar, usa o token atual até expirar                                                                                                                   
                return accessToken.value                                                                                                                                      
            }                                                                                                                                                                 
        }                                                                                                                                                                     
                                                                                                                                                                              
        return accessToken.value                                                                                                                                              
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Inicializa o estado de autenticação (carrega tokens do localStorage)                                                                                                   
     */                                                                                                                                                                       
    const initAuth = async () => {                                                                                                                                            
        if (import.meta.client) {                                                                                                                                             
            const storedAccessToken = localStorage.getItem('access_token')                                                                                                    
            const storedRefreshToken = localStorage.getItem('refresh_token')                                                                                                  
                                                                                                                                                                              
            if (storedAccessToken && storedRefreshToken) {                                                                                                                    
                accessToken.value = storedAccessToken                                                                                                                         
                refreshToken.value = storedRefreshToken                                                                                                                       
                                                                                                                                                                              
                // Verifica se o token ainda é válido                                                                                                                         
                if (!isTokenExpired(storedAccessToken)) {                                                                                                                     
                    try {                                                                                                                                                     
                        await fetchUserData()                                                                                                                                 
                    } catch (error) {
                        console.error(error)                                                                                                                                         
                        // Se falhar ao buscar dados, limpa tudo                                                                                                              
                        clearTokens()                                                                                                                                         
                    }                                                                                                                                                         
                } else {                                                                                                                                                      
                    // Token expirado, tenta renovar                                                                                                                          
                    try {                                                                                                                                                     
                        await refreshAccessToken()                                                                                                                            
                        await fetchUserData()                                                                                                                                 
                    } catch (error) {
                        console.error(error)                                                                                                                                         
                        clearTokens()                                                                                                                                         
                    }                                                                                                                                                         
                }                                                                                                                                                             
            }                                                                                                                                                                 
        }                                                                                                                                                                     
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Verifica se o usuário tem permissão de staff                                                                                                                           
     */                                                                                                                                                                       
    const requireStaff = () => {                                                                                                                                              
        if (!isStaff.value) {                                                                                                                                                 
            navigateTo('/product')                                                                                                                                            
            return false                                                                                                                                                      
        }                                                                                                                                                                     
        return true                                                                                                                                                           
    }                                                                                                                                                                         
                                                                                                                                                                              
    /**                                                                                                                                                                       
     * Verifica se o usuário está autenticado                                                                                                                                 
     */                                                                                                                                                                       
    const requireAuth = () => {                                                                                                                                               
        if (!isAuthenticated.value) {                                                                                                                                         
            navigateTo('/login')                                                                                                                                              
            return false                                                                                                                                                      
        }                                                                                                                                                                     
        return true                                                                                                                                                           
    }                                                                                                                                                                         
                                                                                                                                                                              
    return {                                                                                                                                                                  
        // Estado                                                                                                                                                             
        accessToken: readonly(accessToken),                                                                                                                                   
        refreshToken: readonly(refreshToken),                                                                                                                                 
        user: readonly(user),                                                                                                                                                 
        isAuthenticated,                                                                                                                                                      
        isStaff,                                                                                                                                                              
                                                                                                                                                                              
        // Métodos                                                                                                                                                            
        login,                                                                                                                                                                
        logout,                                                                                                                                                               
        signup,                                                                                                                                                               
        refreshAccessToken,                                                                                                                                                   
        ensureValidToken,                                                                                                                                                     
        initAuth,                                                                                                                                                             
        fetchUserData,                                                                                                                                                        
        requireStaff,                                                                                                                                                         
        requireAuth,                                                                                                                                                          
    }                                                                                                                                                                         
}
