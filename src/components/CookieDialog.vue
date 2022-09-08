<script>
import CookiePoliticsDialog from 'src/components/CookiePoliticsDialog'

export default {
  components: { CookiePoliticsDialog },
  name: 'CookieDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    choices: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      alert: false,
      editedChoices: {
        must: true,
        analytic: false,
        preference: false,
        marketing: false
      },
      cookiePoliticsDialogOpen: false
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.alert = value
        if (value === true) {
          this.editedChoices = JSON.parse(JSON.stringify(this.choices))
        }
      }
    },

    choices: {
      immediate: true,
      deep: true,
      handler (value) {
        this.editedChoices = JSON.parse(JSON.stringify(value))
      }
    }
  },

  methods: {
    closeDialog (value) {
      this.alert = value
      this.$emit('input', value)
    },
    acceptSelectedClick () {
      this.$emit('updated', this.editedChoices)
      this.closeDialog(false)
    },
    acceptAllClick () {
      this.editedChoices.analytic = true
      this.editedChoices.marketing = true
      this.editedChoices.preference = true
      this.acceptSelectedClick()
      this.closeDialog(false)
    },

    selectAllClick () {
      this.editedChoices.analytic = true
      this.editedChoices.marketing = true
      this.editedChoices.preference = true
    },

    selectNoneClick () {
      this.editedChoices.analytic = false
      this.editedChoices.marketing = false
      this.editedChoices.preference = false
    }
  }

}
</script>

<template lang="pug">
mixin expItem(model, title, paragraph)
  q-list(bordered class="rounded-borders")
    q-expansion-item(
        switch-toggle-side
        expand-separator
      )
      template(v-slot:header)
        q-item-section
          .text-h5= title
        q-item-section(side)
          q-checkbox(
            v-model=`${model}`
            class="text-right"
          )
      q-card
        q-card-section
          p= paragraph

mixin expItemDisabled(model, title, paragraph)
  q-list(bordered class="rounded-borders")
    q-expansion-item(
        switch-toggle-side
        expand-separator
      )
      template(v-slot:header)
        q-item-section
          .text-h5= title
        q-item-section(side)
          q-checkbox(
            v-model=`${model}`
            :disable="true"
            class="text-right"
          )
      q-card
        q-card-section
          p= paragraph


div
  q-dialog(:value="alert" @input="closeDialog")
    q-card(style="width: 900px; max-width: 100vw;")

      div(id="printMe")
        q-card-section
          .flex.no-wrap.justify-between
            .text-h4 Nastavení cookie
            q-btn(icon="close" flat round dense v-close-popup)

        q-card-section.q-pt-none
          div.q-mb-lg
            .column
              .col
                p.q-px-sm
                  | Na našich webových stránkách využíváme cookies, pomocí kterých Vám chceme zajistit
                  | co nejlepší uživatelskou zkušenost na našem webu. Více informací získáte na stránce
                  span
                    q-btn(flat dense no-caps size="1em" color="primary" style="margin-bottom: 3px;" class="text-weight-bold" padding="0px 8px" @click="cookiePoliticsDialogOpen = true") o souborech cookies.
                      cookie-politics-dialog(v-model="cookiePoliticsDialogOpen")
                  span
                  | Své preference nastavení cookies vyjádříte kliknutím na přepínač.

              .col.text-right
                q-btn-group(rounded unelevated)
                  q-btn(dense no-caps outline label="Nutné" @click="selectNoneClick" padding="3px 13px" color="primary")
                  q-btn(dense no-caps label="Vše" @click="selectAllClick" padding="3px 13px" color="primary")

          +expItemDisabled('editedChoices.must', 'Nutné cookies',
          'Tyto cookies jsou nezbytné pro fungování našich webových stránek a nemohou být vypnuty. Tento typ cookies neukládá žádné Vaše osobní údaje, podle kterých by bylo možné Vás identifikovat. Obvyklou funkčností těchto typů cookies je pouze reakce na akce, které jste provedli na našich webových stránkách, což představuje požadavek na služby, jako je nastavení předvoleb ochrany osobních údajů a přihlášení nebo vyplňování formulářů. Můžete nastavit svůj prohlížeč aby zablokoval tyto cookies, ale některé části našich webových stránek nebudou fungovat.')

          +expItem('editedChoices.analytic', 'Výkonové cookies',
          'Tyto cookies nám umožňují počítat návštěvy a zdroje návštěvnosti na našich webových stránkách, abychom mohli měřit a zlepšovat jejich výkon. Pomáhají nám zjišťovat, jaká část našich webových stránek je nejvíce, či nejméně oblíbená, a současně nám umožňují sledovat, jak se návštěvníci po stránkách pohybují. Veškeré informace, které tyto cookies shromažďují, jsou souhrnné, a tudíž anonymní. Pokud tyto cookies nepovolíte, nebudeme disponovat informacemi o využívání našich stránek a budeme mít ztížené jejich zlepšování.')

          +expItem('editedChoices.preference', 'Funkční cookies',
          'Funkční cookies umožňují webové stránce, aby Vám poskytovala rozšířené funkce a individuální personalizaci. Tyto cookies mohou být nastaveny u nás nebo třetími stranami, jejichž služby jsme přidali na naše webové stránky. Účelem těchto cookies je poskytnout Vám na našich webových stránkách lépe cílenou zkušenost, která je založena na Vašich předchozích návštěvách a jednotlivých výběrech. Pokud tyto cookies nepovolíte, některé nebo všechny tyto služby nemusí správně fungovat.')

          +expItem('editedChoices.marketing', 'Reklamní cookies',
          'Reklamní cookies soubory mohou být nastaveny na webových stránkách reklamními partnery (třetími stranami). Tyto cookie soubory mohou být využívány a sdíleny těmito společnostmi, aby si vytvořily profil Vašich zájmů a zobrazily Vám relevantní reklamy na jiných webových stránkách. Vycházejí z jedinečné identifikace Vašeho internetového prohlížeče a internetového zařízení. Pokud tyto soubory cookie nepovolíte, zaznamenáte méně cílenou reklamu.')

        q-card-actions(align="center" )

          q-btn(no-caps outline size="1.2em" class="q-mr-md q-px-md q-mb-md" color="primary" @click="acceptSelectedClick") Potvrdit vybrané
          q-btn(no-caps color="primary" text-color="white" size="1.2em" class="q-px-md q-mb-md" @click="acceptAllClick") Přijmout vše
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

@media screen and (max-width: 480px)
  p
    font-size .8rem
    padding 0 1rem 0 0

  .text-h4
    font-size 1.6rem

  .text-h5
    font-size 1rem

  .mobilni-btn
    font-size 1rem !important
    margin 1rem

  .resposive-padding
    margin-top -20px
    padding 0


#printMe
  background white !important
  @media print
    padding 2em
    .q-btn
      visibility: hidden

</style>
