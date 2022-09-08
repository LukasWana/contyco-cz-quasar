<script>
import JidelnaFormular from '../components/Formular'

export default {
  name: 'FormularDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  components: {
    JidelnaFormular
  },

  data () {
    return {
      alert: false,
      printObj: {
        id: 'printMe',
        popTitle: 'Licenční ujednání'
        // extraCss: 'https://www.google.com,https://www.google.com'
        // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      }
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.alert = value
      }
    }
  },

  methods: {
    closeUjednaniDialog (value) {
      this.alert = value
      this.$emit('input', value)
    }
  }
}
</script>

<template lang="pug">
  q-dialog(:value="alert" @input="dialog" )
    q-card(style="width: 370px; height: 610px;")
      .flex.no-wrap.justify-between.q-ml-md.q-mr-md
        h3.text-center Kontaktujte nás
        q-btn(icon="close" flat round v-close-popup)
      jidelna-formular.q-ml-md.q-mr-md

</template>

<style scoped lang="stylus">

.reset-m-p
  margin 0
  padding 0


#printMe
  background white !important
  @media print
    padding 2em
    .q-btn
      visibility: hidden

</style>
