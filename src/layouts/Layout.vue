<script>
import LangSwitcherFlags from 'components/LangSwitcherFlags'
import PhoneLink from 'components/PhoneLink'
import LayoutFooter from './LayoutFooter'
import FormularHelpdesk from '../components/FormularHelpdesk'
import CookieConsent from 'components/CookieConsent'

// const languages = ['cs', 'sk', 'en']

export default {
  name: 'MainLayout',
  components: { LangSwitcherFlags, LayoutFooter, PhoneLink, FormularHelpdesk, CookieConsent },

  mounted () {
    this.$bus.$layout = this
    this.$bus.helpDeskOpen = false
  },


  props: {
    lang: {
      type: String,
      default: 'cs'
    }
  },

  watch: {
    lang: {
      immediate: true,
      handler (lang) {
        this.$root.$i18n.locale = lang
      }
    },
    dialog (value) {
      if (value) {
        this.$refs.menu.show()
      }
    }
  },

  data () {
    return {
      headerOpen: true,
      helpDeskOpen: false
    }
  }
}
</script>

<template lang="pug">
q-layout(view="lHh Lpr lFf" class="is-gekon")
  q-header(elevated reveal v-model="headerOpen" class="bg-white")
    q-toolbar-title
      .row.justify-center.items-center
        .col-md-2.logoAltisima
          template(v-if="$route.name !== 'index'")
            a(href="#" @click.stop="$router.push({name: 'index'})")
              img.logo-marging(src="~/assets/logo-altisima.svg" alt="Logo Altisima.cz" width="110")
          template(v-else)
            img(src="~/assets/logo-altisima.svg" alt="Logo Altisima.cz" width="110")

        .col-xs-3.col-sm-2.alt-text.text-right
          .phoneLink
            q-icon.q-pr-xs(name="eva-phone-call-outline")
              template(v-if="$q.platform.is.desktop")
                .alt-phone.q-mr-sm
                  | Hotline:
              phone-link.alt-phone-top.q-pr-sm(phone="+420 222 711 241" nowrap)

        .col-xs-none.col-sm-1.col.teamWlink
          template(v-if="$q.platform.is.desktop")
            q-btn(rounded no-caps label="Team Viewer" size="md" color="primary" icon="eva-arrow-circle-down-outline" type="a"
                    href="https://www.teamviewer.com/cs/stahnout/windows/" target="__blank")

        .col-xs-1.q-ml-sm.buttonPomoc.text-right
          q-btn-dropdown(v-model="helpDeskOpen" ref="dropdown" rounded dropdown-icon="support" color="primary" size="md" label="Podpora" no-caps :menu-offset="[5, 18]")
            q-list.pomocPopupOutside
              q-card(@hide="dialog = false" ref="menu").pomocPopupInside
                .text-center.q-pt-sm
                  | <b>Popište nám prosím Váš problém</b>
                  formular-helpdesk.q-pa-md

  //phone-link(:phone="visitor.canteen.telephone")
  //lang-switcher-flags

  q-page-container.altisima-bg-img.transition(name='slide-fade' appear)
    div
      router-view
      layout-footer.q-mt-lg
    cookie-consent.fixed-bottom

</template>

<style lang="stylus" scoped>
  .layout-header
    background white

  .logo-marging
    padding-top 5px

  .alt-telefon-top
    text-decoration none
    color $primary
    font-size 18px
    font-weight bold

  .alt-text
    color $alt-text-color

  .alt-phone-top
    font-size 18px
    font-family $alt-text-font
    font-weight bold

  .alt-phone
    text-decoration none
    color inherit
    font-family $alt-text-font
    font-size 14px
    font-weight normal

  .alt-btn
    background-color $primary
    color white

  .alt-outline-btn
    //background-color $primary
    color $primary

  //- page transition
  .slide-fade-enter-active {
    transition: all .5s ease-in;
  }

  .slide-fade-leave-active {
    transition: all .2s ease-out;
  }

  .slide-fade-enter {
    transform: translateX(0px);
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateX(0px);
    opacity: 0;
  }

$allWidth = 220px
$minWidth = 320px
$minHeight = 300px

.pomocPopupInside
  min-width $minWidth
  min-height 200px
.pomocPopupOutside
  min-width $minWidth + 10
  min-height 200px + 10px

.phoneLink
  width $allWidth -110
  text-align center
  // padding-right 20px

.teamWlink
  width $allWidth

.buttonPomoc
    width $allWidth
    text-align right

.logoAltisima
  width $allWidth

@media screen and (min-width: 1025px)
  .phoneLink
    width 220px
    padding-right 100px

  .teamWlink
    width 160px

  .buttonPomoc
    width 100px
    text-align right

@media screen and (max-width: 1020px)
  .teamWlink
    display none
  .phoneLink
    width 50px

@media screen and (max-width: 769px)
  .phoneLink
    width 30px
  .buttonPomoc
    width 30px
    text-align right

@media screen and (max-width: 426px)
  .pomocPopupInside
    min-width $minWidth - 180
    min-height $minHeight

  .pomocPopupOutside
    min-width $minWidth - 20
    min-height $minHeight + 10

  .phoneLink
    width $allWidth
    text-align right
    padding-top 0px
    padding-right 185px

  .teamWlink
    width 160px

  .buttonPomoc
    width 100px
    padding-left 185px
    margin 5px

  .logoAltisima
    width 250px
    padding-left 10px

@media screen and (max-width: 376px)
  .pomocPopupInside
    min-width $minWidth - 100
    min-height $minHeight

  .pomocPopupOutside
    min-width $minWidth - 20
    min-height $minHeight + 10

  .phoneLink
    width 120px
    padding-top 8px
    padding-right 125px

  .buttonPomoc
    width 100vw
    margin 5px

  .logoAltisima
    width 230px
    text-align left

@media screen and (max-width: 321px)
  .pomocPopupInside
    min-width $minWidth - 250
    min-height $minHeight

  .pomocPopupOutside
    min-width $minWidth - 200
    min-height $minHeight + 10

</style>
