<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";

const { t } = useI18n();
const toast = useToast();
const route = useRoute();

// Middleware para garantir que o usuário é staff
definePageMeta({
  middleware: ["auth", "staff"],
});

// Estado
const order = ref(null);
const loading = ref(true);
const saving = ref(false);
const error = ref("");
const orderUuid = ref(route.params.uuid);

// Estado do formulário de edição
const formData = ref({
  status: "",
});

// Service
const { orderItemsService, orderService } = useServices();

// Opções de status
const statusOptions = ref([
  { value: "DRAFT", label: "pages_staff_orders_edit_status_draft" },
  { value: "PENDING", label: "pages_staff_orders_edit_status_pending" },
  { value: "CONFIRMED", label: "pages_staff_orders_edit_status_confirmed" },
  { value: "PREPARATION", label: "pages_staff_orders_edit_status_preparation" },
  { value: "DELIVERY", label: "pages_staff_orders_edit_status_delivery" },
  {
    value: "WAITING_PAYMENT",
    label: "pages_staff_orders_edit_status_waiting_payment",
  },
  { value: "DELIVERED", label: "pages_staff_orders_edit_status_delivered" },
  { value: "FINISHED", label: "pages_staff_orders_edit_status_finished" },
  { value: "CANCELED", label: "pages_staff_orders_edit_status_canceled" },
]);

// Carregar detalhes do pedido
const loadOrderDetails = async () => {
  loading.value = true;
  error.value = "";

  try {
    order.value = await orderItemsService.getOrderItemsByUuidStaff(
      orderUuid.value
    );

    // Preencher formulário com dados atuais
    formData.value.status = order.value.status;
  } catch (err) {
    console.error("Erro ao carregar detalhes do pedido:", err);
    error.value = t("pages_staff_orders_edit_load_error");

    // Redirecionar após erro
    setTimeout(() => {
      navigateTo("/staff/orders");
    }, 2000);
  } finally {
    loading.value = false;
  }
};

// Atualizar status do pedido
const updateOrderStatus = async () => {
  saving.value = true;

  try {
    const updateData = {
      payment_method: order.value.paymentMethod,
      delivery_address_uuid: order.value.deliveryAddress.uuid,
      status: formData.value.status,
    };
    await orderService.updateOrder(orderUuid.value, updateData);

    toast.add({
      severity: "success",
      summary: t("pages_staff_orders_edit_success"),
      detail: t("pages_staff_orders_edit_success_message"),
      life: 3000,
    });

    // Recarregar dados do pedido
    await loadOrderDetails();
  } catch (err) {
    console.error("Erro ao atualizar pedido:", err);
    toast.add({
      severity: "error",
      summary: t("pages_staff_orders_edit_error"),
      detail: t("pages_staff_orders_edit_error_message"),
      life: 3000,
    });
  } finally {
    saving.value = false;
  }
};

// Voltar para lista de pedidos
const goBack = () => {
  navigateTo("/staff/orders");
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

// Calcular subtotal de um produto
const calculateProductSubtotal = (product) => {
  const price = product.price || 0;
  const quantity = product.quantity || 1;
  return price * quantity;
};

// Calcular total do pedido
const calculateOrderTotal = computed(() => {
  if (!order.value?.products || order.value.products.length === 0) return 0;

  return order.value.products.reduce((total, product) => {
    return total + calculateProductSubtotal(product);
  }, 0);
});

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

// Traduzir método de pagamento
const translatePaymentMethod = (method) => {
  const paymentTranslations = {
    CREDIT_CARD: t("pages_staff_orders_edit_payment_credit_card"),
    DEBIT_CARD: t("pages_staff_orders_edit_payment_debit_card"),
    PIX: t("pages_staff_orders_edit_payment_pix"),
    BANK_SLIP: t("pages_staff_orders_edit_payment_bank_slip"),
    CASH: t("pages_staff_orders_edit_payment_cash"),
  };

  return paymentTranslations[method] || method;
};

onMounted(() => {
  loadOrderDetails();
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
              {{ t("pages_staff_orders_edit_title") }}
            </h1>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"
          />
          <p class="text-gray-300 mt-4">
            {{ t("pages_staff_orders_edit_loading") }}
          </p>
        </div>

        <!-- Erro -->
        <div
          v-else-if="error"
          class="bg-red-900/30 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Detalhes do Pedido -->
        <div v-else-if="order" class="space-y-6">
          <!-- Card Principal do Pedido -->
          <div
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl overflow-hidden"
          >
            <!-- Cabeçalho do Pedido -->
            <div class="bg-[#ffffff11] border-b border-[#ffffff22] p-6">
              <div class="flex items-start justify-between flex-wrap gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-3">
                    <div
                      class="bg-yellow-400/20 p-3 rounded-full border border-yellow-300/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-yellow-300"
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
                      <h2 class="text-2xl font-bold text-white">
                        {{ t("pages_staff_orders_edit_order_number") }}
                        #{{ order.orderNumber }}
                      </h2>
                      <p class="text-sm text-gray-300">
                        {{ t("pages_staff_orders_edit_order_date") }}:
                        {{ formatDate(order.orderDate) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Status Atual -->
                <div>
                  <span
                    :class="[
                      'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border',
                      getStatusColor(order.status),
                    ]"
                  >
                    {{
                      t(
                        `pages_staff_orders_edit_status_${order.status.toLowerCase()}`
                      )
                    }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Informações do Pedido -->
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
                >
                  <div class="flex items-center gap-3 mb-2">
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <p class="text-sm text-gray-400">
                      {{ t("pages_staff_orders_edit_payment_method") }}
                    </p>
                  </div>
                  <p class="text-lg text-white font-semibold">
                    {{ translatePaymentMethod(order.paymentMethod) }}
                  </p>
                </div>

                <div
                  class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
                >
                  <div class="flex items-center gap-3 mb-2">
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
                    <p class="text-sm text-gray-400">
                      {{ t("pages_staff_orders_edit_items_count") }}
                    </p>
                  </div>
                  <p class="text-lg text-white font-semibold">
                    {{ order.products?.length || 0 }}
                    {{
                      order.products?.length === 1
                        ? t("pages_staff_orders_edit_item")
                        : t("pages_staff_orders_edit_items")
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Editar Status -->
          <div
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-6"
          >
            <h3
              class="text-xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-300"
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
              {{ t("pages_staff_orders_edit_update_status") }}
            </h3>

            <form @submit.prevent="updateOrderStatus">
              <div class="mb-6">
                <label class="block text-white font-semibold mb-2">
                  {{ t("pages_staff_orders_edit_new_status") }}
                </label>
                <select
                  v-model="formData.status"
                  class="w-full px-4 py-3 bg-[#ffffff11] border border-[#ffffff22] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
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

              <button
                type="submit"
                class="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                :disabled="saving || formData.status === order.status"
              >
                <svg
                  v-if="saving"
                  class="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span v-if="saving">
                  {{ t("pages_staff_orders_edit_saving") }}
                </span>
                <span v-else>
                  {{ t("pages_staff_orders_edit_save") }}
                </span>
              </button>
            </form>
          </div>

          <!-- Produtos do Pedido -->
          <div
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-6"
          >
            <h3
              class="text-xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-300"
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
              {{ t("pages_staff_orders_edit_products_title") }}
            </h3>

            <div class="space-y-4">
              <div
                v-for="product in order.products"
                :key="product.uuid"
                class="flex items-center gap-4 bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg hover:bg-[#ffffff16] transition-colors"
              >
                <!-- Imagem do Produto -->
                <div class="flex-shrink-0">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-20 h-20 object-cover rounded-lg border border-[#ffffff22]"
                  >
                </div>

                <!-- Informações do Produto -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-white font-semibold text-lg mb-1">
                    {{ product.name }}
                  </h4>
                  <p
                    v-if="product.description"
                    class="text-sm text-gray-400 line-clamp-2"
                  >
                    {{ product.description }}
                  </p>
                  <div class="flex items-center gap-4 mt-2">
                    <span class="text-sm text-gray-300">
                      {{ t("pages_staff_orders_edit_quantity") }}:
                      <span class="font-semibold text-white">{{
                        product.quantity
                      }}</span>
                    </span>
                    <span class="text-sm text-gray-300">
                      {{ t("pages_staff_orders_edit_unit_price") }}:
                      <span class="font-semibold text-white">{{
                        formatPrice(product.price)
                      }}</span>
                    </span>
                  </div>
                </div>

                <!-- Preço Total do Item -->
                <div class="text-right">
                  <p class="text-sm text-gray-400 mb-1">
                    {{ t("pages_staff_orders_edit_subtotal") }}
                  </p>
                  <p class="text-xl text-yellow-300 font-bold">
                    {{ formatPrice(calculateProductSubtotal(product)) }}
                  </p>
                  <p>
                    {{ formatPrice(product.price * (product.quantity || 1)) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Total do Pedido -->
            <div
              class="mt-6 pt-6 border-t border-[#ffffff22] flex justify-between items-center"
            >
              <span class="text-xl font-semibold text-white">
                {{ t("pages_staff_orders_edit_total") }}
              </span>
              <span class="text-3xl font-bold text-yellow-300">
                {{ formatPrice(calculateOrderTotal) }}
              </span>
            </div>
          </div>

          <!-- Endereço de Entrega -->
          <div
            v-if="order.deliveryAddress"
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-6"
          >
            <h3
              class="text-xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-300"
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
              {{ t("pages_staff_orders_edit_delivery_address") }}
            </h3>

            <div
              class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
            >
              <div class="space-y-2">
                <p class="text-lg text-white font-semibold">
                  {{ order.deliveryAddress.addressName }}
                </p>
                <p class="text-gray-300">
                  {{ order.deliveryAddress.addressDescription }}
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-300">
                  <span>
                    {{ order.deliveryAddress.city }} -
                    {{ order.deliveryAddress.state }}
                  </span>
                  <span class="text-gray-400">•</span>
                  <span>
                    {{ t("pages_staff_orders_edit_zip_code") }}:
                    {{ order.deliveryAddress.zipCode }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Informações do Cliente -->
          <div
            v-if="order.user"
            class="bg-gradient-to-b from-[#20004b] to-[#3c0074] border border-[#ffffff22] rounded-lg shadow-2xl p-6"
          >
            <h3
              class="text-xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-300"
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
              {{ t("pages_staff_orders_edit_customer_info") }}
            </h3>

            <div
              class="bg-[#ffffff11] border border-[#ffffff22] p-4 rounded-lg"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-400 mb-1">
                    {{ t("pages_staff_orders_edit_customer_name") }}
                  </p>
                  <p class="text-white font-semibold">
                    {{ order.user.fullName }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-400 mb-1">
                    {{ t("pages_staff_orders_edit_customer_email") }}
                  </p>
                  <p class="text-white font-semibold">
                    {{ order.user.email }}
                  </p>
                </div>
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
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Remover setas do select no Firefox */
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
