<template>
  <div>
    <list-item title="Server" />
    <server-line v-for="item in servers" :key="item.id" :config="item" />
    <server-line v-model="option" />
  </div>
</template>

<script>
import ServerLine from './ServerLine.vue'
import ListItem from '../ListItem.vue'
import { OptionSetting as setting } from '../settings'
/**
 * @typedef {import('@/common/settings/define').BarkServer} BarkServer
 */
export default {
  components: {
    ListItem,
    ServerLine,
  },
  data() {
    return {
      /**
       * @type {BarkServer}
       */
      option: {
        id: '',
        name: '',
        url: '',
        key: '',
      },
    }
  },
  computed: {
    servers() {
      return setting.servers
    },
  },
}
</script>

<style></style>
