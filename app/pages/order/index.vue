<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";

definePageMeta({
  middleware: "auth",
});

const { t } = useI18n();
const toast = useToast();
const {
  cartItems,
  cartTotal,
  isCartEmpty,
  updateQuantity,
  removeFromCart,
  clearCart,
  initCart,
} = useCart();
const { orderService, orderItemsService, deliveryAddressService } =
  useServices();

const loading = ref(false);
const deliveryAddresses = ref([]);
const selectedAddress = ref(null);
const paymentMethod = ref("CREDIT_CARD");

const paymentMethods = [
  { label: t("pages_order_payment_credit_card"), value: "CREDIT_CARD" },
  { label: t("pages_order_payment_debit_card"), value: "DEBIT_CARD" },
  { label: t("pages_order_payment_bank_slip"), value: "BANK_SLIP" },
  { label: t("pages_order_payment_pix"), value: "PIX" },
  { label: t("pages_order_payment_cash"), value: "CASH" },
];

const hasDeliveryAddresses = computed(() => deliveryAddresses.value.length > 0);

onMounted(async () => {
  initCart();

  if (isCartEmpty.value) {
    toast.add({
      severity: "info",
      summary: t("pages_order_empty-cart"),
      detail: t("pages_order_empty-cart-message"),
      life: 3000,
    });
    navigateTo("/product");
    return;
  }

  try {
    deliveryAddresses.value =
      await deliveryAddressService.getAllDeliveryAddresses();
    if (deliveryAddresses.value.length > 0) {
      selectedAddress.value = deliveryAddresses.value[0].uuid;
    }
  } catch (error) {
    console.error("Error loading delivery addresses:", error);
    toast.add({
      severity: "error",
      summary: t("pages_order_error-loading-addresses"),
      detail: t("pages_order_error-loading-addresses-message"),
      life: 3000,
    });
  }
});

const handleQuantityChange = (productUuid, newQuantity) => {
  updateQuantity(productUuid, newQuantity);
};

const handleRemoveItem = (productUuid) => {
  removeFromCart(productUuid);

  toast.add({
    severity: "info",
    summary: t("pages_order_item-removed"),
    detail: t("pages_order_item-removed-message"),
    life: 3000,
  });

  if (isCartEmpty.value) {
    navigateTo("/product");
  }
};

const confirmOrder = async () => {
  if (!selectedAddress.value) {
    toast.add({
      severity: "warn",
      summary: t("pages_order_select-address"),
      detail: t("pages_order_select-address-message"),
      life: 3000,
    });
    return;
  }

  loading.value = true;

  try {
    // 1. Criar a order
    const orderData = {
      delivery_address_uuid: selectedAddress.value,
      payment_method: paymentMethod.value,
    };
    const createdOrder = await orderService.createOrder(orderData);

    // 2. Criar os order items
    for (const item of cartItems.value) {
      const orderItemData = {
        order_uuid: createdOrder.uuid,
        product_uuid: item.productUuid,
        quantity: item.quantity,
        price: item.price,
      };

      await orderItemsService.createOrderItem(orderItemData);
    }

    // 3. Atualizar o status da order para CONFIRMED
    await orderService.confirmOrder(createdOrder.uuid);

    // 4. Limpar o carrinho
    clearCart();

    toast.add({
      severity: "success",
      summary: t("pages_order_order-confirmed"),
      detail: t("pages_order_order-confirmed-message"),
      life: 3000,
    });

    setTimeout(() => {
      navigateTo("/profile");
    }, 2000);
  } catch (error) {
    console.error("Error creating order:", error);
    toast.add({
      severity: "error",
      summary: t("pages_order_error-creating-order"),
      detail: t("pages_order_error-creating-order-message"),
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

const cancelOrder = () => {
  navigateTo("/product");
};
</script>

<template>
  <div class="min-h-screen bg-brand-gradient">
    <NavBar />
    <Toast />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <Card
          class="bg-white/[0.067] backdrop-blur border border-white/[0.133]"
        >
          <template #title>
            <h1 class="text-3xl font-bold text-white">
              {{ t("pages_order_cart_title") }}
            </h1>
          </template>

          <template #content>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Lista de Produtos -->
              <div class="lg:col-span-2 space-y-4">
                <div
                  v-for="item in cartItems"
                  :key="item.productUuid"
                  class="bg-white/[0.067] border border-white/[0.133] rounded-lg p-4"
                >
                  <div class="flex gap-4">
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-24 h-24 object-cover rounded"
                    >

                    <div class="flex-1">
                      <h3 class="text-xl font-semibold text-white">
                        {{ item.name }}
                      </h3>
                      <p class="text-gray-300 text-sm mt-1">
                        {{ item.description }}
                      </p>

                      <div
                        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3"
                      >
                        <div
                          class="flex items-center gap-2 sm:gap-4 w-full sm:w-auto"
                        >
                          <div class="w-36 sm:w-48 md:w-64 relative">
                            <InputNumber
                              :model-value="item.quantity"
                              :min="1"
                              :max="99"
                              show-buttons
                              button-layout="horizontal"
                              @update:model-value="
                                (val) =>
                                  handleQuantityChange(item.productUuid, val)
                              "
                            >
                              <template #incrementicon>
                                <span class="pi pi-plus" />
                              </template>
                              <template #decrementicon>
                                <span class="pi pi-minus" />
                              </template>
                            </InputNumber>

                            <!-- Botão posicionado sobre o InputNumber -->
                            <div
                              class="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                              <Button
                                icon="pi pi-trash"
                                severity="danger"
                                text
                                rounded
                                class="pointer-events-auto z-10"
                                @click="handleRemoveItem(item.productUuid)"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="text-right w-full sm:w-auto">
                          <div class="text-yellow-300 text-xl font-bold">
                            R${{ (item.price * item.quantity).toFixed(2) }}
                          </div>
                          <div class="text-gray-400 text-sm">
                            R${{ item.price }} x {{ item.quantity }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Resumo do Pedido -->
              <div class="space-y-6">
                <!-- Endereço de Entrega -->
                <div
                  class="bg-white/[0.067] border border-white/[0.133] rounded-lg p-4"
                >
                  <h3 class="text-lg font-semibold text-white mb-4">
                    {{ t("pages_order_delivery_address") }}
                  </h3>

                  <Select
                    v-if="hasDeliveryAddresses"
                    v-model="selectedAddress"
                    :options="deliveryAddresses"
                    option-label="addressName"
                    option-value="uuid"
                    :placeholder="t('pages_order_select_address')"
                    class="w-full"
                  />

                  <div v-else class="text-center space-y-3">
                    <p class="text-gray-300 text-sm">
                      {{ t("pages_order_no_addresses") }}
                    </p>
                    <button
                      class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 w-full"
                      @click="navigateTo('/profile/addresses/new')"
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      {{ t("pages_order_add_address") }}
                    </button>
                  </div>
                </div>

                <!-- Método de Pagamento -->
                <div
                  class="bg-white/[0.067] border border-white/[0.133] rounded-lg p-4"
                >
                  <h3 class="text-lg font-semibold text-white mb-4">
                    {{ t("pages_order_payment_method") }}
                  </h3>

                  <Select
                    v-model="paymentMethod"
                    :options="paymentMethods"
                    option-label="label"
                    option-value="value"
                    class="w-full"
                  />
                </div>

                <!-- Total -->
                <div
                  class="bg-white/[0.067] border border-white/[0.133] rounded-lg p-4"
                >
                  <div class="space-y-2">
                    <div class="flex justify-between text-white">
                      <span>{{ t("pages_order_subtotal") }}:</span>
                      <span>R${{ cartTotal }}</span>
                    </div>
                    <Divider />
                    <div class="flex justify-between text-yellow-300 text-2xl">
                      <span class="font-bold"
                        >{{ t("pages_order_total") }}:</span
                      >
                      <span class="font-bold">R${{ cartTotal }}</span>
                    </div>
                  </div>
                </div>

                <!-- Botões -->
                <div class="space-y-3">
                  <Button
                    :label="t('pages_order_confirm')"
                    icon="pi pi-check"
                    class="w-full"
                    severity="success"
                    :loading="loading"
                    @click="confirmOrder"
                  />
                  <Button
                    :label="t('pages_order_continue_shopping')"
                    icon="pi pi-arrow-left"
                    class="w-full"
                    severity="secondary"
                    outlined
                    @click="cancelOrder"
                  />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Força o InputNumber a ocupar 100% do container */
:deep(.p-inputnumber) {
  width: 100% !important;
  min-width: 0 !important;
}

:deep(.p-inputnumber.p-component) {
  width: 100% !important;
  min-width: 0 !important;
}

/* Garante que o input interno também seja responsivo */
:deep(.p-inputnumber .p-inputtext) {
  width: 100% !important;
  padding-inline: 0.5rem !important;
}

/* Ajusta os botões */
:deep(.p-inputnumber .p-inputnumber-button) {
  width: 2rem !important;
  flex-shrink: 0;
}
</style>
