<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { openLoginModal } = useLoginModal()
const { isAuthenticated, user } = useAuth()

const goToProfile = () => {  
  navigateTo('/profile')                                                                                                                      
}

</script>

<template>
  <header
    class="bg-gradient-to-r from-[#1b074b] to-[#100033] text-white flex items-center justify-between px-8 py-3 shadow-md">
    <div class="flex items-center space-x-2">
      <img src="/logo.svg" alt="Logo" class="w-72" />
      <div class="w-20 ml-2">
        <img src="/imagotipo.svg" alt="Planet" />
      </div>
    </div>

    <nav class="flex items-center space-x-64 text-lg font-semibold bg-[#ffffff22] px-4 py-2 rounded-full backdrop-blur">
      <NuxtLink to="/product" class="hover:text-yellow-300 mr-8">                                                                                   
        {{ t("components_nav-bar_home") }}                                                                                                          
      </NuxtLink>
      <a href="#" class="hover:text-yellow-300">{{ t("components_nav-bar_about") }}</a>
      <a href="#" class="hover:text-yellow-300">{{ t("components_nav-bar_contact") }}</a>
    </nav>

    <div class="flex items-center space-x-4">
      <!-- Mostra nome do usuário se estiver logado, senão mostra Login -->                                                                   
      <p v-if="isAuthenticated" class="hover:text-yellow-300 cursor-pointer" @click.prevent="goToProfile">                                    
        {{ user?.firstName || user?.username }}                                                                                               
      </p>                                                                                                                                    
      <p v-else class="hover:text-yellow-300 cursor-pointer" @click.prevent="openLoginModal">                                                 
        {{ t("components_nav-bar_login") }}                                                                                                   
      </p>

      <button class="relative">
          <img
            src="/cart.svg"
            alt="Carrinho"
            class="w-6 h-6"
          >
      </button>
    </div>
  </header>
</template>
