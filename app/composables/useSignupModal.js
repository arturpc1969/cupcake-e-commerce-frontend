export const useSignupModal = () => {                                                                                                         
  const isOpen = useState('signup_modal_open', () => false)                                                                                   
                                                                                                                                              
  const openSignupModal = () => {                                                                                                             
    isOpen.value = true                                                                                                                       
  }                                                                                                                                           
                                                                                                                                              
  const closeSignupModal = () => {                                                                                                            
    isOpen.value = false                                                                                                                      
  }                                                                                                                                           
                                                                                                                                              
  const toggleSignupModal = () => {                                                                                                           
    isOpen.value = !isOpen.value                                                                                                              
  }                                                                                                                                           
                                                                                                                                              
  return {                                                                                                                                    
    isOpen,                                                                                                                                   
    openSignupModal,                                                                                                                          
    closeSignupModal,                                                                                                                         
    toggleSignupModal                                                                                                                         
  }                                                                                                                                           
}
