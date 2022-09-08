<script>
import CookieDialog from 'src/components/CookieDialog'
import CookiePoliticsDialog from 'src/components/CookiePoliticsDialog'

export default {
  name: 'CookieConsent',
  components: { CookieDialog, CookiePoliticsDialog },

  mounted () {
    this.isMounted = true
    this.processed = this.$q.localStorage.getItem('cookie-processed') || false
    if (this.$q.localStorage.has('cookie-consent')) {
      this.choices = this.$q.localStorage.getItem('cookie-consent')
      this.firstSetting = true
    }
  },

  data: function () {
    return {
      /// uživatel udělil nebo neudělil souhlas
      isMounted: false,
      processed: false,
      firstSetting: false,

      choices: {
        must: true,
        analytic: false,
        preference: false,
        marketing: false
      },
      /// dialogy
      cookieDialogOpen: false,
      cookiePoliticsDialogOpen: false
    }
  },

  computed: {
    showCookieBar () {
      return this.processed === false && this.isMounted === true
    }
  },

  watch: {
    choices: {
      deep: true,
      handler () {
        // console.log('watch choices')
        if (this.firstSetting === true) {
          // console.log('setting mounted')
          this.firstSetting = false
          return
        }
        this.$q.localStorage.set('cookie-consent', this.choices)
        this.$q.localStorage.set('cookie-processed', true)
        window.resendRetargeting()
        this.processed = true
      }
    }
  },

  methods: {
    accept () {
      this.choices = {
        must: true,
        analytic: true,
        preference: true,
        marketing: true
      }
    },

    denyAllClick () {
      this.choices = {
        must: true,
        analytic: false,
        preference: false,
        marketing: false
      }
    }
  }
}
</script>


<template lang="pug">

  div
    .cookie-consent(
      v-show="showCookieBar"
    )

      .column.items-center
        .col.text-center
          .text-h6.text-white.q-mb-sm
            | Tato webová stránka používá cookies
          p.text-white(style="max-width: 45em")
            | Altisima a partneři potřebují Váš
            span
              q-btn(flat dense no-caps size="1em" style="margin-bottom: 2px;" class="primary-lighter" @click="cookiePoliticsDialogOpen = true" padding="0px 5px") souhlas
                cookie-politics-dialog(
                  v-model="cookiePoliticsDialogOpen"
                )
            span
            | k využití jednotlivých dat,
            | aby Vám mimo jiné mohli ukazovat informace týkající se Vašich zájmů.
            | Souhlas udělíte kliknutím na tlačítko „Rozumím“.


        .col(v-if="$q.screen.lt.sm")
          .cc-dismiss.text-center
            q-btn(
              flat
              no-caps
              text-color="white"
              size="1em"
              class="q-mr-sm"
              @click="cookieDialogOpen = true") Nastavení

            q-btn(@click="accept" no-caps color="primary" text-color="white" size="1em" class="q-px-sm") Rozumím
            p.text-white(style="max-width: 45em;").q-mt-md
              | Souhlas můžete odmítnout
              span
                q-btn(@click="denyAllClick" flat dense no-caps size="1em" style="margin-bottom: 3px;" class="primary-lighter" padding="0px 5px") zde.

          cookie-dialog(
            v-model="cookieDialogOpen"
            :choices="choices"
            @updated="editedChoices => choices = editedChoices"
          )

        .col(v-else)
          .cc-dismiss.text-center
            q-btn(
              flat
              no-caps
              text-color="white"
              size="1.4em"
              class="q-mr-md"
              @click="cookieDialogOpen = true") Nastavení

            q-btn(@click="accept" no-caps color="primary" text-color="white" size="1.4em" class="q-px-md") Rozumím
            p.text-white(style="max-width: 45em;").q-mt-md
              | Souhlas můžete odmítnout
              span
                q-btn(@click="denyAllClick" flat dense no-caps size="1em" style="margin-bottom: 3px;" class="primary-lighter" padding="0px 5px") zde.

          cookie-dialog(
            v-model="cookieDialogOpen"
            :choices="choices"
            @updated="editedChoices => choices = editedChoices"
          )

</template>


<style scoped lang="stylus">
.cookie-consent
  width 100vw
  background-color hsla(0, 0, 20, .97)

@media screen and (min-width: 481px)
  .cookie-consent
    padding-top 1.2em

    .text-h6
      font-size 1.4rem

  p
    font-size 1rem


@media screen and (max-width: 480px)
  .cookie-consent
    padding-top 1em

    .text-h6
      font-size 1rem

    p.text-white
      font-size .8rem

</style>
