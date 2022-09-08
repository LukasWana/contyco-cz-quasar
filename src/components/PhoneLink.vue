<script>
export default {
  name: 'PhoneLink',
  props: {
    phone: {
      type: String
    }
  },
  computed: {
    goodPhone () {
      const goodPhone = this.phone || ''
      if (!goodPhone.startsWith('+')) {
        return `+420${this.phone}`
      }
      return goodPhone.split(' ').join('')
    }
  }
}
</script>


<template lang="pug">
  span
    slot(:goodPhone="goodPhone")
      a(:href="`tel:${goodPhone}`") {{ phone }}
</template>


<style scoped lang="stylus">

//- pismo link text
a
  text-decoration: none
  color: $primary

//- pismo link over
a:hover
  font-weight bold
  color: $dark

//- pismo link active
a:active
  text-decoration: none
  color: $primary

</style>
