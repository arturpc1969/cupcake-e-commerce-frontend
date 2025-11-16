export const useContactModal = () => {                                                                                                        
  const isOpen = useState("contact_modal_open", () => false);                                                                                 
                                                                                                                                              
  const openContactModal = () => {                                                                                                            
    isOpen.value = true;                                                                                                                      
  };                                                                                                                                          
                                                                                                                                              
  const closeContactModal = () => {                                                                                                           
    isOpen.value = false;                                                                                                                     
  };                                                                                                                                          
                                                                                                                                              
  const toggleContactModal = () => {                                                                                                          
    isOpen.value = !isOpen.value;                                                                                                             
  };                                                                                                                                          
                                                                                                                                              
  return {                                                                                                                                    
    isOpen,                                                                                                                                   
    openContactModal,                                                                                                                         
    closeContactModal,                                                                                                                        
    toggleContactModal,                                                                                                                       
  };                                                                                                                                          
};
