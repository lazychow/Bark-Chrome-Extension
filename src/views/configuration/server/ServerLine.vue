<template>
  <div class="server-line">
    <VueFormField status-icon>
      <vue-input
        :class="inputClass"
        :disabled="!editing"
        placeholder="device name"
        v-model="server.name"
        :status="nameMessage ? 'danger' : ''"
      />
      <span slot="subtitle">{{ nameMessage }}</span>
    </VueFormField>

    <VueFormField status-icon>
      <vue-input
        :class="inputClass"
        :disabled="!editing"
        placeholder="server url"
        v-model="server.url"
        :status="urlMessage ? 'danger' : ''"
      />
      <span slot="subtitle">{{ urlMessage }}</span>
    </VueFormField>
    <VueFormField status-icon>
      <vue-input
        :class="inputClass"
        :disabled="!editing"
        placeholder=" key"
        v-model="server.key"
        :status="keyMessage ? 'danger' : ''"
      />
      <span slot="subtitle">{{ keyMessage }}</span>
    </VueFormField>

    <vue-button v-if="editing" @click="save()">save</vue-button>
    <vue-button v-if="!editing" @click="editing = true">edit</vue-button>
    <vue-button v-if="server.id" @click="deleteLine">delete</vue-button>
  </div>
</template>

<script>
import { pure } from '../../../common'
import { OptionSetting } from '../settings'

/**
 * @template T
 * @typedef {import('vue/types/options').PropType<T>} PropType<T>
 */
/**
 * @typedef {import('@/settings/define').BarkServer} BarkServer
 */
export default {
  model: {
    prop: 'config',
    event: 'update:config',
  },
  props: {
    config: {
      /**
       * @type {PropType<BarkServer>}
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
       * @type {BarkServer}
       */
      server: {},
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
    keyMessage() {
      if (!this.server.key) {
        return 'please type a key'
      }
      return ''
    },
    /**
     * @returns {string}
     */
    urlMessage() {
      if (!this.server.url) {
        return 'please type a url'
      }
      return ''
    },
    /**
     * @returns {string}
     */
    nameMessage() {
      if (!this.server.name) {
        return 'please type a name'
      }
      const conflict = (OptionSetting.servers || []).some((server) => {
        return server.id != this.config.id && server.name == this.server.name
      })
      return conflict ? 'name existed' : ''
    },
  },
  methods: {
    updateServer() {
      this.server = pure(this.config)
      this.editing = !this.config.id
    },
    async save() {
      if (this.nameMessage) {
        return
      }
      if (this.urlMessage) {
        return
      }
      if (this.keyMessage) {
        return
      }
      const server = pure(this.server)
      server.id = new Date().getTime()
      OptionSetting.addServer(server)
      this.data = {}
    },
    deleteLine() {
      OptionSetting.removeServer(this.server.id)
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
