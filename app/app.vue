<script setup>
const auth = useAuth();

// Inicializa o estado de autenticação ao carregar a aplicação
onMounted(async () => {
  await auth.initAuth();
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <NavBar />

    <!-- Conteúdo das páginas com padding-top dinâmico -->
    <main class="pt-[var(--navbar-height,88px)]">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
/* Transição suave quando a altura da navbar muda */
main {
  transition: padding-top 0.3s ease;
}
</style>
