<script>
export default {
  name: 'CookiePoliticsDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      alert: false,
      must: true,
      analytic: false,
      preference: false,
      marketing: false,
      accept: false,

      printObj: {
        id: 'printMe',
        popTitle: 'Politika souborů cookies'
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
    closePoliticsDialog (value) {
      this.alert = value
      this.$emit('input', value)
    }
  }
}
</script>

<template lang="pug">

mixin checkbox(model, type)
  q-checkbox(
    v-model=`${model}`
    label=`${type}`
    class="q-ml-md"
  )

mixin rowForm(title, paragraph, tooltip)
  q-separator.q-mb-md
  .row.items-center
    .col-9
      .text-h5= title
      p= paragraph
        q-tooltip(max-width="40em")= tooltip
    .col-3.text-left
      block


div
  q-dialog(:value="alert" @input="closePoliticsDialog")
    q-card(style="width: 600px; max-width: 100vw;")

      div(id="printMe")
        q-card-section
          .flex.no-wrap.justify-between
            .text-h4 Politika souborů cookies
            q-btn(icon="close" flat round dense v-close-popup)


        q-card-section.q-pt-none
          p Při využívání webových stránek společnosti Altisima.cz vyjadřuje uživatel souhlas s používáním souborů cookies způsobem a k účelům vymezeným touto politikou.
          p Tyto webové stránky, který vlastní a provozuje společnost Altisima.cz, používají soubory cookies vlastní i třetích osob za účelem poskytování konkurenceschopných služeb včetně personalizace jimi poskytovaných informací.

          p.text-bold Soubory cookies zasílané prostřednictvím webů společnosti Altisima.cz využíváme pro:
          ul
            li.q-mb-sm Personalizaci nabídky obchodu díky používání doporučení a uchovávání informací o preferencích a výrobcích označených zákazníky.
            li.q-mb-sm Pořizování anonymních statistik ohledně návštěvnosti a způsobu navigace na webu. Shromážděné údaje nám pomáhají ve zdokonalování služeb.
            li.q-mb-sm Řízení zajímavých reklam, které splňují očekávání a potřeby uživatelů.
            li.q-mb-sm Identifikaci všech uživatelských zařízení a prohlížečů používaných k prohlížení stránek.

          p Soubory Cookies používané na webu nikdy neslouží ke zjišťování totožnosti uživatelů stránek. Při používání webů společnosti Altisima.cz jsou zasílány také soubory Cookies třetích subjektů, tj. Google a Seznam které slouží k sestavování anonymních agregovaných statistik a řízení reklam. Podrobné informace o způsobu používání souborů Cookies těmito subjekty lze najít na jejich internetových stránkách.
          p Uživatel služby může odmítnout podporu souborů Cookies úpravou konfigurace nastavení svého internetového prohlížeče. Vzhledem k řešením používaným na webu odmítnutí podpory souborů Cookies může mít za následek nesprávné fungování stránek a znemožňuje personalizaci nabídky služeb a potřeby uživatele.

        q-card-section.q-pt-none.text-center
          q-btn(v-close-popup no-caps color="primary" text-color="white" size="1.2em" class="q-px-md") Zavřít

        br
</template>

<style scoped lang="stylus">
@media screen and (min-width: 481px)
  p
    font-size 1rem

  .text-h4
    font-size 1.8rem

  .text-h5
    font-size 1.4rem

  .resposive-padding
    padding 0 0 0 1rem

  ul
    font-size 1rem

    li
      margin-left -20px



@media screen and (max-width: 480px)
  p
    font-size .8rem
    padding 0 1rem 0 0

  .text-h4
    font-size 1.1rem

  .text-h5
    font-size 1rem

  .mobilni-btn
    font-size 1rem !important
    margin 1rem

  .resposive-padding
    margin-top -20px
    padding 0

  ul
      font-size .8rem
    li
      margin-left -20px

#printMe
  background white !important
  @media print
    padding 2em
    .q-btn
      visibility: hidden

</style>
