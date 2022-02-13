<template>
  <div id="app">
    <div class="config-title">Bark Chrome Extension Settings</div>
    <!-- <vue-switch class="config-item" v-model="autoCopy">
      <list-item title="AutoCopy" description="Auto Copy Flag" />
    </vue-switch>
    <div class="config-item">
      <list-item title="Style" />
      <vue-group v-model="style">
        <VueGroupButton class="primary" value="clipboard">{{ 'clipboard' }}</VueGroupButton>
        <VueGroupButton class="primary" value="normal">{{ 'normal' }}</VueGroupButton>
      </vue-group>
    </div> -->
    <div class="config-item">
      <servers />
    </div>
    <div class="config-item">
      <group-list />
    </div>
  </div>
</template>

<script>
// @ts-check
// import ListItem from './ListItem.vue'
import Servers from './server/Servers.vue'
import GroupList from './groups/GroupList.vue'
import { OptionSetting as setting } from './settings'
export default {
  name: 'App',
  components: {
    // ListItem,
    Servers,
    GroupList,
  },
  computed: {
    servers() {
      return setting.servers
    },
  },
  data() {
    return {
      autoCopy: false,
      style: 'normal',
    }
  },
}
</script>

<style>
body {
  /* background-color: #bbe6d6; */
  font-size: 16px;
}
#app {
  max-width: 700px;
  margin: 0 auto;
}
.config-title {
  padding: 16px;
  font-size: 28px;
  font-weight: 300;
}
.config-item {
  width: 100%;
}
.config-item:hover {
  background: rgba(66, 185, 131, 0.05);
}
.config-item {
  cursor: pointer;
  padding: 20px;
}
.config-item > .content > .slot {
  flex: 1;
}
</style>
