<template>
  <div>
    <list-item title="Groups" />
    <group-line v-for="item in groups" :key="item.id" :config="item" />
    <group-line v-model="option" />
  </div>
</template>

<script>
import GroupLine from './GroupLine.vue'
import ListItem from '../ListItem.vue'
import { OptionSetting as setting } from '../settings'
/**
 * @typedef {import('@/settings/define').BarkGroup} BarkGroup
 */
export default {
  components: {
    ListItem,
    GroupLine,
  },
  data() {
    return {
      /**
       * @type {BarkGroup}
       */
      option: {
        id: '',
        name: '',
      },
    }
  },
  computed: {
    groups() {
      return setting.groups
    },
  },
}
</script>

<style></style>
