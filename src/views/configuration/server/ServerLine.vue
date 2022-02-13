<template>
  <div class="server-line-wrapper">
    <div class="server-line">
      <VueFormField>
        <vue-input :class="inputClass" :disabled="!editing" placeholder="device name" v-model="server.name" />
      </VueFormField>

      <VueFormField>
        <vue-input :class="inputClass" :disabled="!editing" placeholder="server url" v-model="server.url" />
      </VueFormField>
      <VueFormField>
        <vue-input :class="inputClass" :disabled="!editing" placeholder=" key" v-model="server.key" />
      </VueFormField>

      <vue-button v-if="editing" @click="save()">save</vue-button>
      <vue-button v-if="!editing" @click="editing = true">edit</vue-button>
      <vue-button v-if="!editing" @click="deleteLine">delete</vue-button>
      <vue-button v-if="editing" @click="check">check</vue-button>
    </div>
    <div class="error-info vue-ui-text danger">{{ error }}</div>
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
 * @typedef {import('@/common/settings/define').BarkServer} BarkServer
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
      server: {
        id: '',
        name: '',
        key: '',
        url: '',
      },
      error: '',
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
        this.error = this.nameMessage
        return
      }
      if (this.urlMessage) {
        this.error = this.urlMessage
        return
      }
      if (this.keyMessage) {
        this.error = this.keyMessage
        return
      }
      this.error = ''
      const server = pure(this.server)
      OptionSetting.updateServer(server)
      // @ts-ignore
      this.server = {}
    },
    deleteLine() {
      OptionSetting.removeServer(this.server.id)
    },
    check() {},
  },
}
</script>

<style>
.server-line {
  display: flex;
}
.server-line-wrapper > .error-info {
  display: block;
  flex: none;
  width: 100%;
  padding-left: 10px;
}
.server-line .vue-ui-form-field {
  flex: 3;
}
.server-line .vue-ui-form-field:first-child {
  flex: none;
  width: 100px;
}
.server-line > * {
  margin-right: 10px;
}
.server-line > *:last-child {
  margin-right: 0;
}
.server-line > button {
  margin-top: 6px;
  min-width: 70px;
}
</style>
