<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { openLoginModal } = useLoginModal()

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
      <a href="#" class="hover:text-yellow-300 mr-8">{{ t("components_nav-bar_home") }}</a>
      <a href="#" class="hover:text-yellow-300">{{ t("components_nav-bar_about") }}</a>
      <a href="#" class="hover:text-yellow-300">{{ t("components_nav-bar_contact") }}</a>
    </nav>

    <div class="flex items-center space-x-4">
      <p class="hover:text-yellow-300 cursor-pointer" @click.prevent="openLoginModal">{{ t("components_nav-bar_login")
      }}
      </p>
      <button class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.2A1 1 0 007 20h10a1 1 0 00.96-.74L20 13M7 13V6m10 7V6" />
        </svg>
      </button>
    </div>
  </header>
</template>
