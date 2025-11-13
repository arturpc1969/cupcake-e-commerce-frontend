<script setup>
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";

const { t } = useI18n();

const { openLoginModal } = useLoginModal();
const { isAuthenticated, user } = useAuth();
const { cartItemCount } = useCart();
const toast = useToast();

const goToProfile = () => {
  navigateTo("/profile");
};

const goToCart = () => {
  if (!isAuthenticated.value) {
    toast.add({
      severity: "warn",
      summary: t("components_nav-bar_login-required"),
      detail: t("components_nav-bar_login-required-message"),
      life: 3000,
    });
    return;
  }

  if (cartItemCount.value === 0) {
    toast.add({
      severity: "info",
      summary: t("components_nav-bar_cart-empty"),
      detail: t("components_nav-bar_cart-empty-message"),
      life: 3000,
    });
    return;
  }

  navigateTo("/order");
};
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 text-white shadow-md">
    <!-- Primeira linha: Logo e ações do usuário -->
    <div
      class="bg-gradient-to-r from-[#1b074b] to-[#100033] flex items-center justify-between px-8 py-3"
    >
      <div class="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo" class="w-64" >
        <div class="w-16 ml-2">
          <img src="/imagotipo.svg" alt="Planet" >
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Mostra nome do usuário se estiver logado, senão mostra Login -->
        <p
          v-if="isAuthenticated"
          class="hover:text-yellow-300 cursor-pointer"
          @click.prevent="goToProfile"
        >
          {{ user?.firstName || user?.username }}
        </p>
        <p
          v-else
          class="hover:text-yellow-300 cursor-pointer"
          @click.prevent="openLoginModal"
        >
          {{ t("components_nav-bar_login") }}
        </p>

        <!-- Ícone do Carrinho com Badge -->
        <button
          class="relative hover:opacity-80 transition-opacity"
          @click="goToCart"
        >
          <img src="/cart.svg" alt="Carrinho" class="w-6 h-6" >
          <!-- Badge com quantidade de itens -->
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cartItemCount > 99 ? "99+" : cartItemCount }}
          </span>
        </button>
      </div>
    </div>

    <!-- Segunda linha: Navegação (sobreposta) -->
    <div class="flex justify-center -mt-16 relative z-10">
      <nav
        class="flex items-center space-x-64 text-lg font-semibold bg-[#ffffff22] px-4 py-2 rounded-full backdrop-blur"
      >
        <NuxtLink to="/product" class="hover:text-yellow-300 mr-8">
          {{ t("components_nav-bar_home") }}
        </NuxtLink>
        <a href="#" class="hover:text-yellow-300">{{
          t("components_nav-bar_about")
        }}</a>
        <a href="#" class="hover:text-yellow-300">{{
          t("components_nav-bar_contact")
        }}</a>
      </nav>
    </div>
  </header>
</template>
