<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useBusinessValidationStore } from './common/store/businessValidationStore';
import { onMounted } from 'vue';

const businessValidationStore = useBusinessValidationStore();
onMounted(() => {
  businessValidationStore.validateBusinessState();
});
</script>

<template>
  <RouterView />
</template>
