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
  <header
    class="fixed top-0 left-0 right-0 z-50 text-white shadow-md bg-gradient-to-r from-[#1b074b] to-[#100033] rounded-b-3xl"
  >
    <div class="relative px-8 py-8">
      <!-- Logo à esquerda -->
      <div
        class="absolute left-8 top-1/2 -translate-y-1/2 flex items-center space-x-2"
      >
        <img src="/logo.svg" alt="Logo" class="w-64" >
        <div class="w-16 ml-2">
          <img src="/imagotipo.svg" alt="Planet" >
        </div>
      </div>

      <!-- Menu centralizado (independente dos outros elementos) -->
      <div class="flex justify-center">
        <nav
          class="flex items-center space-x-32 text-lg font-semibold"
        >
          <NuxtLink to="/product" class="hover:text-yellow-300 bg-[#ffffff22] px-6 py-2 rounded-full backdrop-blur w-48 text-center">
            {{ t("components_nav-bar_home") }}
          </NuxtLink>
          <a href="#" class="hover:text-yellow-300 bg-[#ffffff22] px-6 py-2 rounded-full backdrop-blur w-48 text-center">
            {{ t("components_nav-bar_about") }}
          </a>
          <a href="#" class="hover:text-yellow-300 bg-[#ffffff22] px-6 py-2 rounded-full backdrop-blur w-48 text-center">
            {{ t("components_nav-bar_contact") }}
          </a>
        </nav>
      </div>

      <!-- Login/Usuário e Carrinho à direita -->
      <div
        class="absolute right-8 top-1/2 -translate-y-1/2 flex items-center space-x-4"
      >
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
  </header>
</template>
