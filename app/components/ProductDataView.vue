<script setup>
import { ref, onMounted } from "vue";

const { productService } = useServices()
const { t } = useI18n()

onMounted(() => {
  productService.getAllProducts().then((data) => (products.value = data.slice(0, 12)));
});

const products = ref();
const layout = ref('grid');
const options = ref(['list', 'grid']);

</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-[#20004b] to-[#3c0074] pb-12 px-4">
    <DataView :value="products" :layout="layout">
      <template #header>
        <div class="flex justify-end">
          <SelectButton v-model="layout" :options="options" :allowEmpty="false">
            <template #option="{ option }">
              <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
            </template>
          </SelectButton>
        </div>
      </template>

      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center p-6 gap-4 bg-[#ffffff11] backdrop-blur rounded-lg mb-4"
              :class="{ 'border-t border-[#ffffff22]': index !== 0 }">
              <div class="md:w-40 relative">
                <img class="block xl:block mx-auto rounded w-full" :src="item.image" :alt="item.name" />
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div>
                    <div class="text-lg font-medium mt-2 text-white">{{ item.name }}</div>
                    <div class="text-sm text-gray-300 mt-1">{{ item.description }}</div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <span class="text-xl font-semibold text-yellow-300">${{ item.price }}</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-shopping-cart" :label="t('components_product-data-view_buy-now')"
                      class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="grid grid-cols-12 gap-4">
          <div v-for="(item, index) in slotProps.items" :key="index"
            class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
            <div class="p-6 border border-[#ffffff22] bg-[#ffffff11] backdrop-blur rounded-lg flex flex-col">
              <div class="bg-[#ffffff11] flex justify-center rounded p-4">
                <div class="relative mx-auto">
                  <img class="rounded w-full" :src="item.image" :alt="item.name" style="max-width: 300px" />
                </div>
              </div>
              <div class="pt-6">
                <div class="flex flex-row justify-between items-start gap-2">
                  <div>
                    <div class="text-lg font-medium mt-1 text-white">{{ item.name }}</div>
                    <div class="text-sm text-gray-300 mt-1">{{ item.description }}</div>
                  </div>
                </div>
                <div class="flex flex-col gap-6 mt-6">
                  <span class="text-2xl font-semibold text-yellow-300">${{ item.price }}</span>
                  <div class="flex gap-2">
                    <Button icon="pi pi-shopping-cart" :label="t('components_product-data-view_buy-now')"
                      class="flex-auto whitespace-nowrap"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
