<template>
  <div class="group-line-wrapper">
    <div class="group-line">
      <VueFormField>
        <vue-input :class="inputClass" :disabled="!editing" placeholder="device name" v-model="group.name" />
      </VueFormField>
      <vue-button v-if="editing" @click="save()">save</vue-button>
      <vue-button v-if="!editing" @click="editing = true">edit</vue-button>
      <vue-button v-if="!editing" @click="del()">delete</vue-button>
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
 * @typedef {import('@/common/settings/define').BarkGroup} BarkGroup
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
        this.error = this.nameMessage
        return
      }
      this.error = ''
      const group = pure(this.group)
      OptionSetting.updateGroup(group)
      this.group = {
        id: '',
        name: '',
      }
    },
    del() {
      console.info(this.group.id)
      OptionSetting.removeGroup(this.group.id)
    },
  },
}
</script>

<style>
.group-line-wrapper > .error-info {
  display: block;
  flex: none;
  width: 100%;
  padding-left: 10px;
}
.group-line {
  display: flex;
}
.group-line .vue-ui-form-field {
  flex: 1;
}
.group-line > * {
  margin-right: 10px;
}
.group-line > *:last-child {
  margin-right: 0;
}
.group-line > button {
  margin-top: 6px;
  min-width: 70px;
}
</style>
