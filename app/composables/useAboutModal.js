export const useAboutModal = () => {                                                                                                          
  const isOpen = useState("about_modal_open", () => false);                                                                                   
                                                                                                                                              
  const openAboutModal = () => {                                                                                                              
    isOpen.value = true;                                                                                                                      
  };                                                                                                                                          
                                                                                                                                              
  const closeAboutModal = () => {                                                                                                             
    isOpen.value = false;                                                                                                                     
  };                                                                                                                                          
                                                                                                                                              
  const toggleAboutModal = () => {                                                                                                            
    isOpen.value = !isOpen.value;                                                                                                             
  };                                                                                                                                          
                                                                                                                                              
  return {                                                                                                                                    
    isOpen,                                                                                                                                   
    openAboutModal,                                                                                                                           
    closeAboutModal,                                                                                                                          
    toggleAboutModal,                                                                                                                         
  };                                                                                                                                          
};
