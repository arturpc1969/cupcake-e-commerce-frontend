<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { onClickOutside } from "@vueuse/core";

const { t } = useI18n();

const { openLoginModal } = useLoginModal();
const { isAuthenticated, user, logout, isStaff } = useAuth();
const { cartItemCount } = useCart();
const toast = useToast();

// Estado do dropdown
const showUserMenu = ref(false);
const userMenuRef = ref(null);

// Fechar dropdown ao clicar fora
onClickOutside(userMenuRef, () => {
  showUserMenu.value = false;
});

// Toggle do menu do usuário
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

// Navegar e fechar menu
const navigateAndClose = (path) => {
  showUserMenu.value = false;
  navigateTo(path);
};

// Logout
const handleLogout = () => {
  showUserMenu.value = false;
  logout();
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
        <nav class="flex items-center space-x-32 text-lg font-semibold">
          <NuxtLink
            to="/product"
            class="hover:text-yellow-300 bg-[#ffffff22] px-6 py-2 rounded-full backdrop-blur w-48 text-center"
          >
            {{ t("components_nav-bar_home") }}
          </NuxtLink>
          <a
            href="#"
            class="hover:text-yellow-300 bg-[#ffffff22] px-6 py-2 rounded-full backdrop-blur w-48 text-center"
          >
            {{ t("components_nav-bar_about") }}
          </a>
          <a
            href="#"
            class="hover:text-yellow-300 bg-[#ffffff22] px-6 py-2 rounded-full backdrop-blur w-48 text-center"
          >
            {{ t("components_nav-bar_contact") }}
          </a>
        </nav>
      </div>

      <!-- Login/Usuário e Carrinho à direita -->
      <div
        class="absolute right-8 top-1/2 -translate-y-1/2 flex items-center space-x-4"
      >
        <!-- Menu do Usuário com Dropdown -->
        <div v-if="isAuthenticated" ref="userMenuRef" class="relative">
          <button
            class="flex items-center gap-2 hover:text-yellow-300 cursor-pointer transition-colors"
            @click="toggleUserMenu"
          >
            <span>{{ user?.firstName || user?.username }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform"
              :class="{ 'rotate-180': showUserMenu }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition name="dropdown">
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-3 w-64 bg-gradient-to-b from-[#1b074b] to-[#100033] border border-[#ffffff22] rounded-lg shadow-2xloverflow-hidden"
            >
              <!-- Informações do Usuário -->
              <div class="px-4 py-3 border-b border-[#ffffff22] bg-[#ffffff11]">
                <p class="text-sm text-gray-400">
                  {{ t("components_nav-bar_logged-in-as") }}
                </p>
                <p class="text-white font-semibold truncate">
                  {{ user?.fullName || user?.username }}
                </p>
                <p class="text-xs text-gray-400 truncate">
                  {{ user?.email }}
                </p>
              </div>

              <!-- Links do Menu -->
              <div class="py-2">
                <!-- Meu Perfil -->
                <button
                  class="w-full px-4 py-2 text-left hover:bg-[#ffffff11] transition-colors flex items-center gap-3"
                  @click="navigateAndClose('/profile')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{{ t("components_nav-bar_my-profile") }}</span>
                </button>

                <!-- Meus Pedidos -->
                <button
                  class="w-full px-4 py-2 text-left hover:bg-[#ffffff11] transition-colors flex items-center gap-3"
                  @click="navigateAndClose('/profile/orders')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>{{ t("components_nav-bar_my-orders") }}</span>
                </button>

                <!-- Meus Endereços -->
                <button
                  class="w-full px-4 py-2 text-left hover:bg-[#ffffff11] transition-colors flex items-center gap-3"
                  @click="navigateAndClose('/profile/addresses')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{{ t("components_nav-bar_my-addresses") }}</span>
                </button>

                <!-- Divisor para área Staff -->
                <div v-if="isStaff" class="my-2 border-t border-[#ffffff22]" />

                <!-- Área Staff -->
                <div v-if="isStaff" class="bg-[#ffffff05]">
                  <!-- Título Staff -->
                  <div class="px-4 py-2">
                    <p class="text-xs text-yellow-300 font-semibold uppercase">
                      {{ t("components_nav-bar_staff-area") }}
                    </p>
                  </div>

                  <!-- Gerenciar Produtos -->
                  <button
                    class="w-full px-4 py-2 text-left hover:bg-[#ffffff11] transition-colors flex items-center gap-3"
                    @click="navigateAndClose('/staff/products')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-yellow-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span>{{ t("components_nav-bar_manage-products") }}</span>
                  </button>

                  <!-- Gerenciar Pedidos -->
                  <button
                    class="w-full px-4 py-2 text-left hover:bg-[#ffffff11] transition-colors flex items-center gap-3"
                    @click="navigateAndClose('/staff/orders')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-yellow-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <span>{{ t("components_nav-bar_manage-orders") }}</span>
                  </button>
                </div>

                <!-- Divisor antes do Logout -->
                <div class="my-2 border-t border-[#ffffff22]" />

                <!-- Logout -->
                <button
                  class="w-full px-4 py-2 text-left hover:bg-red-900/30 transition-colors flex items-center gap-3 text-red-300"
                  @click="handleLogout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>{{ t("components_nav-bar_logout") }}</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Botão de Login (quando não autenticado) -->
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

<style scoped>
/* Animação do dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Rotação suave da seta */
svg {
  transition: transform 0.2s ease;
}
</style>
