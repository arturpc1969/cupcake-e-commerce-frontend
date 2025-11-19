<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Middleware para garantir que o usuário é staff
definePageMeta({
  middleware: ["auth", "staff"],
});

// Estado
const orders = ref([]);
const filteredOrders = ref([]); // NOVO: lista filtrada
const loading = ref(true);
const error = ref("");
const selectedStatus = ref("ALL"); // NOVO: status selecionado

// Service
const { orderItemsService } = useServices();

// Carregar pedidos
const loadOrders = async () => {
  loading.value = true;
  error.value = "";

  try {
    orders.value = await orderItemsService.getAllOrdersItemsStaff();
    filterOrders(); // NOVO: aplica filtro após carregar
  } catch (err) {
    console.error("Erro ao carregar pedidos:", err);
    error.value = t("pages_staff_orders_error-loading");
  } finally {
    loading.value = false;
  }
};

// NOVO: Filtrar pedidos por status
const filterOrders = () => {
  if (selectedStatus.value === "ALL") {
    filteredOrders.value = orders.value;
  } else {
    filteredOrders.value = orders.value.filter(
      (order) => order.status === selectedStatus.value
    );
  }
};

// NOVO: Manipular mudança de filtro
const handleFilterChange = () => {
  filterOrders();
};

// Navegar para detalhes/edição do pedido
const goToOrderDetails = (uuid) => {
  navigateTo(`/staff/orders/${uuid}`);
};

// Voltar para área staff
const goBack = () => {
  navigateTo("/product");
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
    const price = product.promotion || product.price || 0;
    const quantity = product.quantity || 1;
    return total + price * quantity;
  }, 0);
};

// Opções de status para o filtro
const statusOptions = ref([
  { value: "ALL", label: "pages_staff_orders_filter_all" },
  { value: "DRAFT", label: "pages_staff_orders_status_draft" },
  { value: "PENDING", label: "pages_staff_orders_status_pending" },
  { value: "CONFIRMED", label: "pages_staff_orders_status_confirmed" },
  { value: "PREPARATION", label: "pages_staff_orders_status_preparation" },
  { value: "DELIVERY", label: "pages_staff_orders_status_delivery" },
  {
    value: "WAITING_PAYMENT",
    label: "pages_staff_orders_status_waiting_payment",
  },
  { value: "DELIVERED", label: "pages_staff_orders_status_delivered" },
  { value: "FINISHED", label: "pages_staff_orders_status_finished" },
  { value: "CANCELED", label: "pages_staff_orders_status_canceled" },
]);

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
    DRAFT: t("pages_staff_orders_status_draft"),
    PENDING: t("pages_staff_orders_status_pending"),
    CONFIRMED: t("pages_staff_orders_status_confirmed"),
    PREPARATION: t("pages_staff_orders_status_preparation"),
    DELIVERY: t("pages_staff_orders_status_delivery"),
    WAITING_PAYMENT: t("pages_staff_orders_status_waiting_payment"),
    DELIVERED: t("pages_staff_orders_status_delivered"),
    FINISHED: t("pages_staff_orders_status_finished"),
    CANCELED: t("pages_staff_orders_status_canceled"),
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
    class="min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]"
  >
    <NavBar />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-7xl mx-auto">
        <!-- Cabeçalho -->
        <div class="mb-8">
          <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
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
              <div>
                <h1 class="text-3xl font-bold text-white">
                  {{ t("pages_staff_orders_title") }}
                </h1>
                <p class="text-gray-300 text-sm mt-1">
                  {{ t("pages_staff_orders_subtitle") }}
                </p>
              </div>
            </div>

            <!-- Estatísticas rápidas -->
            <div class="flex gap-4">
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg px-4 py-2"
              >
                <p class="text-xs text-gray-400">
                  {{ t("pages_staff_orders_total_orders") }}
                </p>
                <p class="text-2xl font-bold text-white">
                  {{ orders.length }}
                </p>
              </div>
              <div
                class="bg-[#ffffff11] border border-[#ffffff22] rounded-lg px-4 py-2"
              >
                <p class="text-xs text-gray-400">
                  {{ t("pages_staff_orders_filtered_orders") }}
                </p>
                <p class="text-2xl font-bold text-yellow-300">
                  {{ filteredOrders.length }}
                </p>
              </div>
            </div>
          </div>

          <!-- Filtro por Status -->
          <div class="flex items-center gap-4">
            <label class="text-white font-semibold flex items-center gap-2">
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {{ t("pages_staff_orders_filter_by_status") }}
            </label>
            <select
              v-model="selectedStatus"
              class="px-4 py-2 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
              @change="handleFilterChange"
            >
              <option
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
                class="bg-[#1b074b] text-white"
              >
                {{ t(option.label) }}
              </option>
            </select>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"
          />
          <p class="text-gray-300 mt-4">
            {{ t("pages_staff_orders_loading") }}
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
          v-else-if="filteredOrders.length === 0"
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 0122"
            />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">
            {{ t("pages_staff_orders_no-orders") }}
          </h3>
          <p class="text-gray-300">
            {{ t("pages_staff_orders_no-orders-message") }}
          </p>
        </div>

        <!-- Lista de Pedidos -->
        <div v-else class="space-y-6">
          <div
            v-for="order in filteredOrders"
            :key="order.orderUuid"
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl overflow-hidden hover:shadow-xl transition-all"
          >
            <!-- Cabeçalho do Pedido -->
            <div class="bg-[#ffffff11] border-b border-[#ffffff22] p-6">
              <div class="flex items-start justify-between flex-wrap gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-3">
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
                        {{ t("pages_staff_orders_order_number") }}
                        #{{ order.orderNumber }}
                      </h3>
                      <p class="text-sm text-gray-300">
                        {{ formatDate(order.orderDate) }}
                      </p>
                    </div>
                  </div>

                  <!-- Informações do Cliente -->
                  <div
                    v-if="order.user"
                    class="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
                    <span class="font-semibold text-white">
                      {{ order.user.fullName }}
                    </span>
                    <span class="text-gray-400">•</span>
                    <span>{{ order.user.email }}</span>
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
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-xs text-gray-400 mb-1">
                    {{ t("pages_staff_orders_payment_method") }}
                  </p>
                  <p class="text-sm text-white font-semibold">
                    {{ translatePaymentMethod(order.paymentMethod) }}
                  </p>
                </div>

                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-xs text-gray-400 mb-1">
                    {{ t("pages_staff_orders_items_count") }}
                  </p>
                  <p class="text-sm text-white font-semibold">
                    {{ order.products?.length || 0 }}
                    {{
                      order.products?.length === 1
                        ? t("pages_staff_orders_item")
                        : t("pages_staff_orders_items")
                    }}
                  </p>
                </div>

                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-xs text-gray-400 mb-1">
                    {{ t("pages_staff_orders_total") }}
                  </p>
                  <p class="text-lg text-yellow-300 font-bold">
                    {{ formatPrice(calculateOrderTotal(order.products)) }}
                  </p>
                </div>

                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-xs text-gray-400 mb-1">
                    {{ t("pages_staff_orders_delivery_city") }}
                  </p>
                  <p class="text-sm text-white font-semibold">
                    {{ order.deliveryAddress?.city || "-" }} -
                    {{ order.deliveryAddress?.state || "-" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Produtos do Pedido (Preview) -->
            <div class="p-6">
              <h4 class="text-sm font-semibold text-gray-300 mb-3">
                {{ t("pages_staff_orders_products") }}
              </h4>

              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4"
              >
                <div
                  v-for="product in order.products.slice(0, 3)"
                  :key="product.uuid"
                  class="flex items-center gap-3 bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <!-- Imagem do Produto -->
                  <div class="flex-shrink-0">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-12 h-12 object-cover rounded border border-[#ffffff22]"
                    >
                  </div>

                  <!-- Informações do Produto -->
                  <div class="flex-1 min-w-0">
                    <h5 class="text-white text-sm font-semibold truncate">
                      {{ product.name }}
                    </h5>
                    <p class="text-xs text-gray-400">
                      {{ t("pages_staff_orders_quantity") }}:
                      {{ product.quantity }}
                    </p>
                  </div>
                </div>

                <!-- Indicador de mais produtos -->
                <div
                  v-if="order.products.length > 3"
                  class="flex items-center justify-center bg-[#ffffff11] border border-[#ffffff22] p-3 rounded-lg"
                >
                  <p class="text-gray-300 text-sm">
                    +{{ order.products.length - 3 }}
                    {{
                      order.products.length - 3 === 1
                        ? t("pages_staff_orders_more_item")
                        : t("pages_staff_orders_more_items")
                    }}
                  </p>
                </div>
              </div>

              <!-- Botão Ver/Editar Detalhes -->
              <div class="mt-4">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  {{ t("pages_staff_orders_view_edit") }}
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

/* Limitar linhas de texto */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
