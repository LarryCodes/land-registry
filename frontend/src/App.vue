<template>
  <Navbar />
  <router-view class="mt-5" />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
