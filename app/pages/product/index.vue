<script setup>
import NavBar from "~/components/NavBar.vue";
import HeroSection from "~/components/HeroSection.vue";
import ProductDataView from "~/components/ProductDataView.vue";

const {
  isOpen: isLoginOpen,
  openLoginModal,
  closeLoginModal,
} = useLoginModal();
const {
  isOpen: isSignupOpen,
  openSignupModal,
  closeSignupModal,
} = useSignupModal();

// Callback quando login for bem-sucedido
const handleLoginSuccess = () => {
  console.log("Login realizado com sucesso!");
  // Você pode adicionar lógica adicional aqui, como recarregar dados
};

// Callback quando signup for bem-sucedido
const handleSignupSuccess = () => {
  console.log("Cadastro realizado com sucesso!");
};

// Troca entre modais
const switchToSignup = () => {
  closeLoginModal();
  openSignupModal();
};

const switchToLogin = () => {
  closeSignupModal();
  openLoginModal();
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar @open-login="openLoginModal" />
    <HeroSection />
    <ProductDataView />

    <!-- Modal de Login -->
    <LoginModal
      v-model="isLoginOpen"
      @login-success="handleLoginSuccess"
      @switch-to-signup="switchToSignup"
    />

    <!-- Modal de Signup -->
    <SignupModal
      v-model="isSignupOpen"
      @signup-success="handleSignupSuccess"
      @switch-to-login="switchToLogin"
    />
  </div>
</template>
