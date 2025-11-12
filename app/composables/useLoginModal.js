export const useLoginModal = () => {
  const isOpen = useState("login_modal_open", () => false);

  const openLoginModal = () => {
    isOpen.value = true;
  };

  const closeLoginModal = () => {
    isOpen.value = false;
  };

  const toggleLoginModal = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    openLoginModal,
    closeLoginModal,
    toggleLoginModal,
  };
};
