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
            .text-h4 Nastaven?? cookie
            q-btn(icon="close" flat round dense v-close-popup)

        q-card-section.q-pt-none
          div.q-mb-lg
            .column
              .col
                p.q-px-sm
                  | Na na??ich webov??ch str??nk??ch vyu????v??me cookies, pomoc?? kter??ch V??m chceme zajistit
                  | co nejlep???? u??ivatelskou zku??enost na na??em webu. V??ce informac?? z??sk??te na str??nce
                  span
                    q-btn(flat dense no-caps size="1em" color="primary" style="margin-bottom: 3px;" class="text-weight-bold" padding="0px 8px" @click="cookiePoliticsDialogOpen = true") o souborech cookies.
                      cookie-politics-dialog(v-model="cookiePoliticsDialogOpen")
                  span
                  | Sv?? preference nastaven?? cookies vyj??d????te kliknut??m na p??ep??na??.

              .col.text-right
                q-btn-group(rounded unelevated)
                  q-btn(dense no-caps outline label="Nutn??" @click="selectNoneClick" padding="3px 13px" color="primary")
                  q-btn(dense no-caps label="V??e" @click="selectAllClick" padding="3px 13px" color="primary")

          +expItemDisabled('editedChoices.must', 'Nutn?? cookies',
          'Tyto cookies jsou nezbytn?? pro fungov??n?? na??ich webov??ch str??nek a nemohou b??t vypnuty. Tento typ cookies neukl??d?? ????dn?? Va??e osobn?? ??daje, podle kter??ch by bylo mo??n?? V??s identifikovat. Obvyklou funk??nost?? t??chto typ?? cookies je pouze reakce na akce, kter?? jste provedli na na??ich webov??ch str??nk??ch, co?? p??edstavuje po??adavek na slu??by, jako je nastaven?? p??edvoleb ochrany osobn??ch ??daj?? a p??ihl????en?? nebo vypl??ov??n?? formul??????. M????ete nastavit sv??j prohl????e?? aby zablokoval tyto cookies, ale n??kter?? ????sti na??ich webov??ch str??nek nebudou fungovat.')

          +expItem('editedChoices.analytic', 'V??konov?? cookies',
          'Tyto cookies n??m umo????uj?? po????tat n??v??t??vy a zdroje n??v??t??vnosti na na??ich webov??ch str??nk??ch, abychom mohli m????it a zlep??ovat jejich v??kon. Pom??haj?? n??m zji????ovat, jak?? ????st na??ich webov??ch str??nek je nejv??ce, ??i nejm??n?? obl??ben??, a sou??asn?? n??m umo????uj?? sledovat, jak se n??v??t??vn??ci po str??nk??ch pohybuj??. Ve??ker?? informace, kter?? tyto cookies shroma????uj??, jsou souhrnn??, a tud???? anonymn??. Pokud tyto cookies nepovol??te, nebudeme disponovat informacemi o vyu????v??n?? na??ich str??nek a budeme m??t zt????en?? jejich zlep??ov??n??.')

          +expItem('editedChoices.preference', 'Funk??n?? cookies',
          'Funk??n?? cookies umo????uj?? webov?? str??nce, aby V??m poskytovala roz??????en?? funkce a individu??ln?? personalizaci. Tyto cookies mohou b??t nastaveny u n??s nebo t??et??mi stranami, jejich?? slu??by jsme p??idali na na??e webov?? str??nky. ????elem t??chto cookies je poskytnout V??m na na??ich webov??ch str??nk??ch l??pe c??lenou zku??enost, kter?? je zalo??ena na Va??ich p??edchoz??ch n??v??t??v??ch a jednotliv??ch v??b??rech. Pokud tyto cookies nepovol??te, n??kter?? nebo v??echny tyto slu??by nemus?? spr??vn?? fungovat.')

          +expItem('editedChoices.marketing', 'Reklamn?? cookies',
          'Reklamn?? cookies soubory mohou b??t nastaveny na webov??ch str??nk??ch reklamn??mi partnery (t??et??mi stranami). Tyto cookie soubory mohou b??t vyu????v??ny a sd??leny t??mito spole??nostmi, aby si vytvo??ily profil Va??ich z??jm?? a zobrazily V??m relevantn?? reklamy na jin??ch webov??ch str??nk??ch. Vych??zej?? z jedine??n?? identifikace Va??eho internetov??ho prohl????e??e a internetov??ho za????zen??. Pokud tyto soubory cookie nepovol??te, zaznamen??te m??n?? c??lenou reklamu.')

        q-card-actions(align="center" )

          q-btn(no-caps outline size="1.2em" class="q-mr-md q-px-md q-mb-md" color="primary" @click="acceptSelectedClick") Potvrdit vybran??
          q-btn(no-caps color="primary" text-color="white" size="1.2em" class="q-px-md q-mb-md" @click="acceptAllClick") P??ijmout v??e
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
