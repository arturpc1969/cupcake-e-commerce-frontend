import { useAuth } from '~/composables/useAuth'
export default class AuthService {                                                                                                                                            
    constructor(baseUrl) {                                                                                                                                                    
        this.baseUrl = baseUrl                                                                                                                                                
    }                                                                                                                                                                         
                                                                                                                                                                              
    async login(userLoginData) {                                                                                                                                              
        const auth = useAuth()                                                                                                                                                
        return await auth.login(userLoginData)                                                                                                                                
    }                                                                                                                                                                         
                                                                                                                                                                              
    async signup(userData) {                                                                                                                                                  
        const auth = useAuth()                                                                                                                                                
        return await auth.signup(userData)                                                                                                                                    
    }                                                                                                                                                                         
                                                                                                                                                                              
    async refreshToken() {                                                                                                                                    
        const auth = useAuth()                                                                                                                                                
        return await auth.refreshAccessToken()                                                                                                                                
    }                                                                                                                                                                         
                                                                                                                                                                              
    async logout() {                                                                                                                                                          
        const auth = useAuth()                                                                                                                                                
        return auth.logout()                                                                                                                                                  
    }                                                                                                                                                                         
                                                                                                                                                                              
    async getCurrentUser() {                                                                                                                                                  
        const auth = useAuth()                                                                                                                                                
        return auth.user.value                                                                                                                                                
    }                                                                                                                                                                         
                                                                                                                                                                              
    async isAuthenticated() {                                                                                                                                                 
        const auth = useAuth()                                                                                                                                                
        return auth.isAuthenticated.value                                                                                                                                     
    }                                                                                                                                                                         
                                                                                                                                                                              
    async isStaff() {                                                                                                                                                         
        const auth = useAuth()                                                                                                                                                
        return auth.isStaff.value                                                                                                                                             
    }                                                                                                                                                                         
}
