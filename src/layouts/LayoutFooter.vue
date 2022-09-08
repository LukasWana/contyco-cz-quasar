<template lang="pug">
div.q-pa-lg.footer
  .flex.items-end.justify-between.q-gutter-lg.page-fixed-width
    div.text-center
      a(href="https://altisima.cz" target="_blank")
        img(src="~/assets/logo-altisima.svg" alt="logo altisima" immediate="true" width="140")
      .alt-text-caption
        | Altisima software SE
    div.text-center
      .alt-text-caption
        | Altisima je také výrobce řešení
      a(href="https://jidelnasql.cz" target="_blank")
        img(src="~/assets/logo-jidelnasql.svg" alt="logo jidelna sql" width="130").q-mb-xs.q-mr-md
      a(href="https://gekon-sw.cz" target="_blank")
        img(src="~/assets/logo-gekon.svg" alt="logo gekon" width="130").q-mb-xs
      a(href="https://dorsys.cz" target="_blank")
        img(src="~/assets/logo-dorsys-p.svg" alt="logo dorsys" width="130")
    div.text-left
      .alt-text-caption
        strong Telefon:
        span   +420 222 711 241
      .alt-text-caption
        strong Adresa:
        span   Branická 26/43, 147 00 Praha 4
      .alt-text-caption
        strong IČO:
        span  04722019,
        strong  DIČ:
        span  CZ04722019
      div
        q-btn(flat dense no-caps size="1.1em" color="primary" label="Nastavení cookies" @click="cookiesPolicyClicked" style="font-family: RedHatDisplay-med" padding="0px")

</template>
<style scoped lang="stylus">
.footer
  background-color $jidelna-blue-light
  color $footer-color

  .alt-text-caption
    font-decoration none
    color $footer-color

</style>

<script>
export default {
  name: 'layout-footer',
  methods: {
    cookiesPolicyClicked () {
      this.$q.localStorage.set('cookie-processed', false)
      window.location.reload()
    }
  }
}
</script>
