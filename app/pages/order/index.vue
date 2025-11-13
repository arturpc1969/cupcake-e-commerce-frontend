<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";

definePageMeta({
  middleware: "auth",
});

const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const { productService } = useServices();
// const { user } = useAuth();

const product = ref(null);
const loading = ref(true);
const quantity = ref(1);

onMounted(async () => {
  const productUuid = route.query.productUuid;
  quantity.value = route.query.quantity;

  if (!productUuid) {
    toast.add({
      severity: "error",
      summary: t("pages_order_no-product"),
      detail: t("pages_order_no-product-message"),
      life: 3000,
    });
    navigateTo("/product");
    return;
  }

  try {
    product.value = await productService.getProductByUuid(productUuid);
  } catch (error) {
    console.error("Error loading product:", error);
    toast.add({
      severity: "error",
      summary: t("pages_order_error-loading"),
      detail: t("pages_order_error-loading-message"),
      life: 3000,
    });
    navigateTo("/product");
  } finally {
    loading.value = false;
  }
});

const totalPrice = computed(() => {
  if (!product.value) return 0;
  return (product.value.price * quantity.value).toFixed(2);
});

const confirmOrder = () => {
  toast.add({
    severity: "success",
    summary: t("pages_order_order-confirmed"),
    detail: t("pages_order_order-confirmed-message"),
    life: 3000,
  });

  // Aqui você implementaria a lógica de criar o pedido
  
  setTimeout(() => {
    navigateTo("/product");
  }, 2000);
};

const cancelOrder = () => {
  navigateTo("/product");
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074]">
    <NavBar />
    <Toast />

    <div class="container mx-auto px-4 py-8">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <ProgressSpinner />
      </div>

      <div v-else-if="product" class="max-w-4xl mx-auto">
        <Card class="bg-[#ffffff11] backdrop-blur border border-[#ffffff22]">
          <template #title>
            <h1 class="text-3xl font-bold text-white">
              {{ t("pages_order_title") }}
            </h1>
          </template>

          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Imagem do Produto -->
              <div class="flex justify-center items-start">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="rounded-lg max-w-full h-auto"
                />
              </div>

              <!-- Detalhes do Pedido -->
              <div class="space-y-6">
                <div>
                  <h2 class="text-2xl font-semibold text-white mb-2">
                    {{ product.name }}
                  </h2>
                  <p class="text-gray-300">{{ product.description }}</p>
                </div>

                <Divider />

                <div>
                  <label class="block text-white mb-2 font-semibold">{{
                    t("pages_order_quantity")
                  }}</label>
                  <InputNumber
                    v-model="quantity"
                    :min="1"
                    :max="99"
                    show-buttons
                    button-layout="horizontal"
                    class="w-full"
                  >
                    <template #incrementicon>
                      <span class="pi pi-plus" />
                    </template>
                    <template #decrementicon>
                      <span class="pi pi-minus" />
                    </template>
                  </InputNumber>
                </div>

                <Divider />

                <div class="space-y-2">
                  <div class="flex justify-between text-white">
                    <span>{{ t("pages_order_unit-price") }}:</span>
                    <span class="font-semibold">R${{ product.price }}</span>
                  </div>
                  <div class="flex justify-between text-white">
                    <span>{{ t("pages_order_quantity") }}:</span>
                    <span class="font-semibold">{{ quantity }}</span>
                  </div>
                  <Divider />
                  <div class="flex justify-between text-yellow-300 text-xl">
                    <span class="font-bold">{{ t("pages_order_total") }}:</span>
                    <span class="font-bold">R${{ totalPrice }}</span>
                  </div>
                </div>

                <Divider />

                <div class="flex gap-4">
                  <Button
                    :label="t('pages_order_confirm')"
                    icon="pi pi-check"
                    class="flex-1"
                    severity="success"
                    @click="confirmOrder"
                  />
                  <Button
                    :label="t('pages_order_cancel')"
                    icon="pi pi-times"
                    class="flex-1"
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
