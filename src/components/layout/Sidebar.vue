<template>
  <div class="sidebar">
    <router-link
      class="sidebar_link"
      :to="item.path"
      v-for="(item, index) in items"
      :key="index"
      >{{ item.title }}</router-link
    >
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
$color1: #000016;
$color2: #fff;
.sidebar {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: $color1;
  .sidebar_link {
    width: 100%;
    padding: 10px 15px;
    text-decoration: none;
    border-radius: 5px;
    background-color: $color2;
    color: $color1;
  }
}
</style>
