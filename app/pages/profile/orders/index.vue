<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Middleware para garantir que o usuário está autenticado
definePageMeta({
  middleware: "auth",
});

// Estado
const orders = ref([]);
const loading = ref(true);
const error = ref("");

// Service
const { orderItemsService } = useServices();

// Carregar pedidos
const loadOrders = async () => {
  loading.value = true;
  error.value = "";

  try {
    orders.value = await orderItemsService.getAllOrdersItems();
  } catch (err) {
    console.error("Erro ao carregar pedidos:", err);
    error.value =
      t("pages_profile_orders_load_error");
  } finally {
    loading.value = false;
  }
};

// Navegar para detalhes do pedido
const goToOrderDetails = (uuid) => {
  navigateTo(`/profile/orders/${uuid}`);
};

// Voltar para perfil
const goBack = () => {
  navigateTo("/profile");
};

// Formatar data
const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Formatar preço
const formatPrice = (price) => {
  if (!price) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

// Calcular total do pedido
const calculateOrderTotal = (products) => {
  if (!products || products.length === 0) return 0;

  return products.reduce((total, product) => {
    const price = product.price || 0;
    const quantity = product.quantity || 1;
    return total + price * quantity;
  }, 0);
};

// Obter cor do status
const getStatusColor = (status) => {
  const statusColors = {
    DRAFT: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    PENDING: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    CONFIRMED: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    PREPARATION: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    DELIVERY: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    WAITING_PAYMENT: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    DELIVERED: "bg-green-500/20 text-green-300 border-green-500/30",
    FINISHED: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    CANCELED: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  return (
    statusColors[status] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
  );
};

// Traduzir status
const translateStatus = (status) => {
  const statusTranslations = {
    DRAFT: t("pages_profile_orders_status_draft"),
    PENDING: t("pages_profile_orders_status_pending"),
    CONFIRMED: t("pages_profile_orders_status_confirmed"),
    PREPARATION: t("pages_profile_orders_status_preparation"),
    DELIVERY: t("pages_profile_orders_status_delivery"),
    WAITING_PAYMENT: t("pages_profile_orders_status_waiting_payment"),
    DELIVERED: t("pages_profile_orders_status_delivered"),
    FINISHED: t("pages_profile_orders_status_finished"),
    CANCELED: t("pages_profile_orders_status_canceled"),
  };

  return statusTranslations[status] || status;
};

// Traduzir método de pagamento
const translatePaymentMethod = (method) => {
  const paymentTranslations = {
    CREDIT_CARD: t("pages_staff_orders_payment_credit_card"),
    DEBIT_CARD: t("pages_staff_orders_payment_debit_card"),
    BANK_SLIP: t("pages_staff_orders_payment_bank_slip"),
    PIX: t("pages_staff_orders_payment_pix"),
    CASH: t("pages_staff_orders_payment_cash"),
  };

  return paymentTranslations[method] || method;
};

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <div
    class="page-content-with-navbar min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Cabeçalho -->
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <button
              class="text-gray-300 hover:text-white transition-colors"
              @click="goBack"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 class="text-3xl font-bold text-white">
              {{ t("pages_profile_orders_title") }}
            </h1>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"
          />
          <p class="text-gray-300 mt-4">
            {{ t("pages_profile_orders_loading") }}
          </p>
        </div>

        <!-- Erro -->
        <div
          v-else-if="error"
          class="bg-red-900/30 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Lista vazia -->
        <div
          v-else-if="orders.length === 0"
          class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-12 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 w-24 text-gray-400 mx-auto mb-4"
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
          <h3 class="text-xl font-semibold text-white mb-2">
            {{ t("pages_profile_orders_empty_title") }}
          </h3>
          <p class="text-gray-300 mb-6">
            {{ t("pages_profile_orders_empty_description") }}
          </p>
          <button
            class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
            @click="navigateTo('/product')"
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {{ t("pages_profile_orders_empty_button") }}
          </button>
        </div>

        <!-- Lista de Pedidos -->
        <div v-else class="space-y-6">
          <div
            v-for="order in orders"
            :key="order.orderUuid"
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl overflow-hidden hover:shadow-xl transition-all"
          >
            <!-- Cabeçalho do Pedido -->
            <div class="bg-[#ffffff11] border-b border-[#ffffff22] p-6">
              <div class="flex items-start justify-between flex-wrap gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="bg-yellow-400/20 p-2 rounded-full border border-yellow-300/30"
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
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-white">
                        {{ t("pages_profile_orders_order_number") }}
                        #{{ order.orderNumber }}
                      </h3>
                      <p class="text-sm text-gray-300">
                        {{ formatDate(order.orderDate) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Status -->
                <div>
                  <span
                    :class="[
                      'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border',
                      getStatusColor(order.status),
                    ]"
                  >
                    {{ translateStatus(order.status) }}
                  </span>
                </div>
              </div>

              <!-- Informações do Pedido -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-xs text-gray-400 mb-1">
                    {{ t("pages_profile_orders_payment_method") }}
                  </p>
                  <p class="text-sm text-white font-semibold">
                    {{ translatePaymentMethod(order.paymentMethod) }}
                  </p>
                </div>

                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-xs text-gray-400 mb-1">
                    {{ t("pages_profile_orders_items_count") }}
                  </p>
                  <p class="text-sm text-white font-semibold">
                    {{ order.products?.length || 0 }}
                    {{
                      order.products?.length === 1
                        ? t("pages_profile_orders_item")
                        : t("pages_profile_orders_items")
                    }}
                  </p>
                </div>

                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-xs text-gray-400 mb-1">
                    {{ t("pages_profile_orders_total") }}
                  </p>
                  <p class="text-lg text-yellow-300 font-bold">
                    {{ formatPrice(calculateOrderTotal(order.products)) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Produtos do Pedido -->
            <div class="p-6">
              <h4 class="text-sm font-semibold text-gray-300 mb-4">
                {{ t("pages_profile_orders_products") }}
              </h4>

              <div class="space-y-3">
                <div
                  v-for="product in order.products"
                  :key="product.uuid"
                  class="flex items-center gap-4 bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
                >
                  <!-- Imagem do Produto -->
                  <div class="flex-shrink-0">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-16 h-16 object-cover rounded-lg border border-[#ffffff22]"
                    >
                  </div>

                  <!-- Informações do Produto -->
                  <div class="flex-1 min-w-0">
                    <h5 class="text-white font-semibold truncate">
                      {{ product.name }}
                    </h5>
                    <p class="text-sm text-gray-400">
                      {{ t("pages_profile_orders_quantity") }}:
                      {{ product.quantity }}
                    </p>
                  </div>

                  <!-- Preço -->
                  <div class="text-right">
                    <p class="text-white font-semibold">
                      {{ formatPrice(product.price) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Endereço de Entrega -->
              <div
                v-if="order.deliveryAddress"
                class="mt-6 bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
              >
                <h4
                  class="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2"
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
                  {{ t("pages_profile_orders_delivery_address") }}
                </h4>
                <div class="text-sm text-gray-300 space-y-1">
                  <p class="text-white font-semibold">
                    {{ order.deliveryAddress.addressName }}
                  </p>
                  <p>{{ order.deliveryAddress.addressDescription }}</p>
                  <p>
                    {{ order.deliveryAddress.city }} -
                    {{ order.deliveryAddress.state }}
                  </p>
                  <p>
                    {{ t("pages_profile_orders_zip_code") }}:
                    {{ order.deliveryAddress.zipCode }}
                  </p>
                </div>
              </div>

              <!-- Botão Ver Detalhes -->
              <div class="mt-6">
                <button
                  class="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  @click="goToOrderDetails(order.orderUuid)"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {{ t("pages_profile_orders_view_details") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animação de spin para loading */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
