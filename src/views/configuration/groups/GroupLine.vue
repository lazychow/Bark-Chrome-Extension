<template>
  <div class="server-line">
    <VueFormField status-icon>
      <vue-input
        :class="inputClass"
        :disabled="!editing"
        placeholder="device name"
        v-model="group.name"
        :status="nameMessage ? 'danger' : ''"
      />
      <span slot="subtitle">{{ nameMessage }}</span>
    </VueFormField>
    <vue-button v-if="editing" @click="save()">save</vue-button>
    <vue-button v-if="!editing" @click="editing = true">edit</vue-button>
  </div>
</template>

<script>
// @ts-check
import { pure } from '../../../common'
import { OptionSetting } from '../settings'

/**
 * @template T
 * @typedef {import('vue/types/options').PropType<T>} PropType<T>
 */
/**
 * @typedef {import('@/settings/define').BarkGroup} BarkGroup
 */
export default {
  model: {
    prop: 'config',
    event: 'update:config',
  },
  props: {
    config: {
      /**
       * @type {PropType<BarkGroup>}
       */
      type: Object,
      required: true,
    },
  },
  created() {
    this.updateServer()
  },
  data() {
    return {
      editing: false,
      /**
       * @type {BarkGroup}
       */
      group: {
        id: '',
        name: '',
      },
    }
  },
  watch: {
    config() {
      this.updateServer()
    },
  },
  computed: {
    /**
     * @returns {string}
     */
    inputClass() {
      return this.editing ? '' : 'flat'
    },
    /**
     * @returns {string}
     */
    nameMessage() {
      if (!this.group.name) {
        return 'please type a name'
      }
      const conflict = (OptionSetting.groups || []).some((group) => {
        return group.id != this.config.id && group.name == this.group.name
      })
      return conflict ? 'name existed' : ''
    },
  },
  methods: {
    updateServer() {
      this.group = pure(this.config)
      this.editing = !this.config.id
    },
    async save() {
      if (this.nameMessage) {
        return
      }
      const group = pure(this.group)
      group.id = new Date().getTime().toString()
      OptionSetting.addGroup(group)
      this.group = {
        id: '',
        name: '',
      }
    },
  },
}
</script>

<style>
.server-line {
  display: flex;
}
.server-line .vue-ui-form-field {
  flex: 1;
}
.server-line > * {
  margin-right: 10px;
}
.server-line > *:last-child {
  margin-right: 0;
}
.server-line > button {
  margin-top: 6px;
}
</style>
