<template>
  <div class="list-item">
    <div class="list-item-title">{{ title }}</div>
    <div class="list-item-description" v-if="description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
}
</script>

<style>
.list-item .list-item-title {
  color: #2c3e50;
  font-weight: 600;
}
.list-item .list-item-description {
  color: #6a8bad;
}
</style>
