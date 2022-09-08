<script>
import axios from 'axios'
import AnimatedNumber from 'components/AnimatedNumber'
import CarouselContent from 'components/CarouselContent'
import FormularDialog from 'components/FormularDialog'
import JidelnaGallery from 'components/JidelnaGallery'
import JidelnaSectionBlogCard from 'components/JidelnaSectionBlogCard'
import JidelnaSectionDoubleCard from 'components/JidelnaSectionDoubleCard'
import JidelnaSectionPriceCard from 'components/JidelnaSectionPriceCard'
import LicenncniUjednaniDialog from 'components/LicenncniUjednaniDialog'
import PageSection from 'components/PageSection'
import PageSectionCard from 'components/PageSectionCard'
import PageSectionCardVyvojari from 'components/PageSectionCardVyvojari'
import PageSectionDoubleCard from 'components/PageSectionDoubleCard'
import PhoneLink from 'components/PhoneLink'
import ReferenceCard from 'components/ReferenceCard'
import VseobecneSmluvniPodminkyDialog from 'components/VseobecneSmluvniPodminkyDialog'
import LayoutFooter from 'layouts/LayoutFooter'
import { date, scroll } from 'quasar'
import JidelnaFormular from '../components/Formular'

const { setScrollPosition, getScrollTarget } = scroll

function formatDate (datum, format) {
  return date.formatDate(datum, format, {
    months: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
    monthsShort: ['led', 'ún', 'bře', 'dub', 'kvě', 'čer', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
    days: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
    daysShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so']
  })
}

export default {
  name: 'PageIndex',

  meta: {
    title: 'Altisima.cz'
  },

  components: {
    JidelnaGallery,
    AnimatedNumber,
    JidelnaSectionDoubleCard,
    JidelnaSectionPriceCard,
    JidelnaSectionBlogCard,
    ReferenceCard,
    CarouselContent,
    PageSectionDoubleCard,
    PageSectionCardVyvojari,
    JidelnaFormular,
    LayoutFooter,
    PageSectionCard,
    PhoneLink,
    LicenncniUjednaniDialog,
    VseobecneSmluvniPodminkyDialog,
    PageSection,
    FormularDialog
  },

  async beforeMount () {
    const result = await axios.get('https://blog.altisima.cz/ghost/api/v3/content/posts/?key=48078e4106f7bfb20482486b1e&limit=3&order=published_at%20desc&format=html,text')
    this.blogPosts = result.data.posts
  },

  data () {
    return {
      slide: '1',
      slideReferences: '1',
      tab: 'formular',
      ujednaniDialogOpen: false,
      podminkyDialogOpen: false,
      imagesInternet: [
        { src: 'statics/galerie/int-obj/1_objednavka.png', alt: 'Objednávka', thumbnail: null },
        { src: 'statics/galerie/int-obj/2_prehled.PNG', alt: 'Přehled', thumbnail: null },
        { src: 'statics/galerie/int-obj/3_finance.png', alt: 'Finance', thumbnail: null },
        { src: 'statics/galerie/int-obj/4_maily.png', alt: 'Maily', thumbnail: null }
      ],
      imagesJidelna: [
        { src: 'statics/galerie/jid-sql/1_titulni-orbazovka.jpg', alt: 'Titulní obrazovka', thumbnail: null },
        { src: 'statics/galerie/jid-sql/2_jidelnicek.jpg', alt: 'Jídelníček', thumbnail: null },
        { src: 'statics/galerie/jid-sql/3_pokladna.jpg', alt: 'Pokladna', thumbnail: null }
      ],
      imagesObjednavkovy: [
        { src: 'statics/galerie/obj-ter/1_TT1703.jpg', alt: 'Terminál', thumbnail: null },
        { src: 'statics/galerie/obj-ter/2_TT1703.jpg', alt: 'Terminál', thumbnail: null },
        { src: 'statics/galerie/obj-ter/3_identifikace.jpg', alt: 'Identifikace', thumbnail: null },
        { src: 'statics/galerie/obj-ter/4_objednavka.jpg', alt: 'Objednávka', thumbnail: null }
      ],
      imagesVydej: [
        { src: 'statics/galerie/vyd-ter/1_TT3503vydej.jpg', alt: 'Terminál výdej', thumbnail: null },
        { src: 'statics/galerie/vyd-ter/2_identifikace.jpg', alt: 'Identifikace', thumbnail: null },
        { src: 'statics/galerie/vyd-ter/3_vydej.jpg', alt: 'Výdej', thumbnail: null },
        { src: 'statics/galerie/vyd-ter/4_TT3511semafor.jpg', alt: 'Semafor na terminálu', thumbnail: null }
      ],
      blogPosts: []
    }
  },

  timers: {
    openDialogOnStart: { autostart: true, time: 15000, repeat: false }
  },

  watch: {
    dialog (value) {
      if (value) {
        this.$refs.menu.show()
      }
    }
  },

  methods: {

    openDialogOnStart () {
      if (!this.$bus.$layout.helpDeskOpen) {
        this.$refs.dropdown.show()
      }
    },

    scrollToObjednat () {
      // console.log('objednat clicked')
      // console.log({ 'this.$refs': this.$refs })
      const el = this.$refs.formular.$el
      // console.log({ 'el': el })
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 600
      setScrollPosition(target, offset, duration)
    },

    formatDate (datum) {
      return formatDate(datum, 'DD MMMM, YYYY')
    }
  }

}
</script>

<template lang="pug">
q-page
  page-section(:fullWidth="true")

    // transition-prev="slide-left"
    // transition-next="slide-right"

    q-carousel.top-carousel(
      autoplay swipeable animated v-model="slide"
      arrows navigation infinite height="500px"
      transition-next="jump-left" transition-prev="jump-right").no-alt-scroll

      q-carousel-slide(name="1" img-src="~assets/carusel-altisima-001b.jpg")
        carousel-content
          template(#semi-title) Chytrý
          template(#title) Svoz odpadu
          template(#description) Optimalizuje svoz tříděného odpadu

      q-carousel-slide(name="2" img-src="~assets/carusel-altisima-002.jpg")
        carousel-content
          template(#semi-title) Vyhledá
          template(#title) Nejbližší kontejner
          template(#description) Aplikace pomůže vyhledat nejbližší nádobu na tříděný odpad

      q-carousel-slide(name="3" img-src="~assets/carusel-altisima-003.jpg")
        carousel-content
          template(#semi-title) Přehledy
          template(#title) Zaplněnosti nádob
          template(#description) Vždy máte po ruce přehled plnosti kontejnerů

      q-carousel-slide(name="4" img-src="~assets/carusel-altisima-004.jpg")
        carousel-content
          template(#semi-title) Intuitivní
          template(#title) Prostředí aplikace
          template(#description) Uživatelské prostředí je přizpůsobené využití aplikace


  page-section.section-nadpis.text-center
    .row.justify-center.page-section-ourstory
      .col-xs-12.col-sm-8.col-md-7.q-px-md.q-mb-xl
        h2 Náš příběh
        | Projekt aplikace CONTYCO vznikl na základě poptávky starosty jedné obce. Požadavkem bylo vylepšit informování správy obce o stavu jednotlivých stanovišť kontejnerů na tříděný odpad a zároveň občanům obce usnadnit třídění odpadu, informovat je o umístění kontejnerů a o jejich aktuální zaplněnosti. Díky technologickým zkušenostem našeho partnera, firmy Altisima software SE, můžeme už teď říct, že brzo nasadíme první aplikace do uživatelského testování.

  page-section
    h2.text-center Provoz aplikace
    .flex.justify-center(:class="{'q-gutter-lg': !$q.screen.lt.sm}")

      jidelna-section-double-card
        a.invisible-link(href="jidelnasql.cz" target="_blank")
        template(#icon)
          img(src="~assets/reseni-03.jpg" alt="Chip")
        template(#title) Odběrná místa
        template(#default)
          div.text-left.ulli
            | Hlavní obrazovka webové aplikace zobrazuje přehledně stav v reálném čase a obsahuje hlavní rozcestník pro jednotlivé funkce aplikace. Všechny panely jsou aktivní a umožňují rychlý přechod k detailu dané funkce nebo přehledu.

      jidelna-section-double-card
        template(#title) Detail odběrného místa
        template(#icon)
          img(src="~assets/reseni-02.jpg" alt="Chip")
        template(#default)
          div.text-left.ulli
            | V detailním přehledu odběrného místa je možné zobrazit jednotlivé kontejnery, spravovat je a zobrazovat průměrnou zaplněnost v době svozu odpadu. Jednou ze zajímavých funkcí je informace o typu kontejneru, kde je uvedený výrobce a vlastník. Díky tomu je možné snadno zařídit opravu nebo výměnu kontejneru v případě jeho poškození.

      jidelna-section-double-card
        template(#title) Kalendář svozů
        template(#icon)
          img(src="~assets/reseni-01.jpg" alt="Chip")
        template(#default)
          div.text-left.ulli
            | Další důležitou funkcí je možnost zadání kalendáře svozů. Je možné sledovat a optimalizovat termíny svozů. Všechna data mají k dispozici občané obce. Kombinace informací o zaplněnosti nádob a termínu svozů jim poskytují dostatek informací o nádobách na tříděný odpad v jejich okolí.

      jidelna-section-double-card
        template(#title) Mobilní aplikace
        template(#icon)
          img(src="~assets/reseni-01.jpg" alt="Chip")
        template(#default)
          div.text-left.ulli
            | Pro občany obce jsme připravili mobilní aplikaci. Data získaná od uživatelů aplikace pomáhají optimalizovat správu nádob na tříděný odpad. Pořizovat je mohou občané obce nebo pověření zaměstnanci Obecního úřadu. Uživatelské rozhraní aplikace je intuitivní a práci s ní zvládne jakýkoli uživatel chytrého mobilního telefonu.

            jidelna-section-double-card
        template(#title) Uživatelé aplikace
        template(#icon)
          img(src="~assets/reseni-01.jpg" alt="Chip")
        template(#default)
          div.text-left.ulli
            | Aplikace může fungovat v režimu host nebo pro přihlášené uživatele. Obsahuje veškeré informace potřebné k vyhledání místa odběru tříděného odpadu, jeho zaplněnosti a termín svozu odpadu. Přihlášený uživatel má navíc možnost volby nejčastěji používaného odběrného místa s notifikací o zaplněnosti nebo o provedeném svozu odpadu.

            jidelna-section-double-card
        template(#title) Správa odběrného místa
        template(#icon)
          img(src="~assets/reseni-01.jpg" alt="Chip")
        template(#default)
          div.text-left.ulli
            | Po stažení aplikace jsou pro všechny uživatele okamžitě k dispozici informace o umístění nádob s tříděným odpadem s možností vyhledávání podle lokality nebo typu nádoby na tříděný odpad. V případě zaplněnosti jednotlivých nádob je možné tuto nádobu označit jako plnou a vyhledat nejbližší nezaplněnou nádobu.



  page-section
    h2 Vlastnosti systému
    .flex.q-gutter-sm(:class="{'justify-center': $q.screen.gt.xs}")
      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Nároky na hardware
        template
          | Pro provoz aplikace využijete standardní počítače nebo mobilní zařízení. Provoz databáze a celkovou infrastrukturu zajistíme v ceně služby.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Uživatelské rozhraní
        template
          | Responzivní rozhraní webové aplikace pro správu obce zajistí pohodlnou práci a aplikací na všech typech zařízení.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Dostupnost služeb
        template
          | Naše výkonné servery zajistí provoz aplikace v jakoukoli dobu. Mobilní verze je připravená pro všechny operační systémy.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Vzájemná konektivita
        template
          | Po aktivaci služby vytvoříme vaší obci uživatelský profil, kam se přihlašují pracovníci správy obce i mobilní aplikace.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Přenos dat
        template
          | Data mezi centrální správou obecního profilu a mobilními aplikacemi jsou přenášena okamžitě s vysokým zabezpečením.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Podpora systému
        template
          | Naše řešení obsahuje nejen aktivaci, ale i neomezenou podporu pro správu obce i pro uživatele mobilních aplikací.


  page-section
    h2 Jak vypadá aplikace
    .q-pa-md
      .q-gutter-y-md()
        q-card
          q-tabs(v-model='tab' no-caps class='md-md text-primary' active-color='accent' indicator-color='accent')
            q-tab(name='admin' label='administrace odběrných míst')
            q-tab(name='app' label='mobilní aplikace')

          q-separator
          q-tab-panels(v-model='tab' animated='')
            q-tab-panel(name='admin')
              jidelna-gallery(:images="imagesInternet")
            q-tab-panel(name='app')
              jidelna-gallery(:images="imagesJidelna")



  page-section.section-nadpis.text-center
    .row.justify-center.page-section-ourstory
      .col-xs-12.col-sm-8.col-md-7.q-px-md.q-mb-xl
        h4.q-mb-md Sledujte nás
        q-btn(round outline color='primary', icon='eva-facebook', type="a" href="https://www.facebook.com/altisimacz" target="_blank" size="15px")
        q-btn.q-mx-lg(round outline color='primary' icon='eva-twitter' type="a" href="https://twitter.com/AltisimaSe?ref_src=twsrc%5Etfw" target="_blank" size="15px")

  q-page-sticky(position="bottom-right" :offset="[10, 10]")
    q-btn-dropdown(ref="dropdown" rounded dropdown-icon="eva-message-circle" color="primary" size="lg" padding="10px 10px 10px 10px" :menu-offset="[0, 5]")
      q-list.pomocPopupOutside

        q-card(@hide="dialog = false" ref="menu").pomocPopupInside
          .text-center.q-pt-sm
            | <b>Díky za Váš zájem,<br>
            | potřebujete víc informaci? Napište nám.</b>
            // <b>Nastiňte nám prosím vaše tužby</b>
          // q-tabs(no-cap v-model='tab' dense active-color='primary' indicator-color='primary' align='justify' narrow-indicator style="min-width: 300px")
          // q-tab(no-caps name='formular' label='Kontaktujte nás')
          // q-tab(no-caps name='potrebujipomoc' label='Jak Vám můžeme pomoci?')

          q-tab-panels.text-center(v-model='tab' animated)
            q-tab-panel(name="formular")
              jidelna-formular

            // q-tab-panel(name="potrebujipomoc")
                formular-helpdesk

  // test externi stranky formulare
  // page-section.section-nadpis.text-center
      a(href="#" @click="$router.push({name: 'kontaktni-formular'})") Formular



</template>

<style scoped lang="stylus">
$minWidth = 320px
$minHeight = 360px

.pomocPopupInside
  min-width $minWidth
  min-height $minHeight +20px
.pomocPopupOutside
  min-width $minWidth + 10px
  min-height $minHeight + 30px

@media screen and (max-width: 426px)
  .pomocPopupInside
    min-width $minWidth - 180px
    min-height $minHeight
  .pomocPopupOutside
    min-width $minWidth - 20px
    min-height $minHeight + 10px

@media screen and (max-width: 376px)
  .pomocPopupInside
    min-width $minWidth - 100px
    min-height $minHeight - 100px
  .pomocPopupOutside
    min-width $minWidth - 20px
    min-height $minHeight - 90px


.q-tab
  font-weight bold

.tweets
  max-width 600px

// width 600px
// margin 5vw

.alt-jmeno
  text-align left
  font-size 32px
  font-weight normal

.alt-funkce
  font-family $alt-text-font
  font-size 18px
  color $alt-text-color
  font-weight normal

.alt-telefon
  text-decoration: none
  color $primary
  font-size 18px
  font-weight bold

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

.alt-email
  text-decoration none
  color inherit
  font-family $alt-text-font
  font-size 14px
  font-weight normal

.alt-maska-kruh
  img
  .circle
    border-radius: 50%
    width: 96px
    height: 96px

.invisible-link
  text-decoration none
  color inherit

.cenareseni
  margin 0px 0px 20px 0px

.alt-grey-bg
  background-color #F6F6F6

.alt-bg
  background-color $jidelna-blue-light

.gekon-card-solution
  border 1px solid white

.gekon-btn
  background-color $secondary
  color $primary

@media screen and (min-width: 601px)
  .gekon-counter-b
    margin 42px 0 0 0
    font-size 42px

  .gekon-counter-s
    margin 0 5px 42px 5px
    font-size 16px

@media screen and (max-width: 600px)
  .gekon-counter-b
    margin 22px 0 0 0
    font-size 20px

  .gekon-counter-s
    margin 0 5px 22px 5px
    font-size 10px

.alt-reset-m-p
  margin 0
  padding 0

.alt-blog-nadpis
  color $primary
  font-size 23px
  font-weight bold


.alt-cena
  color $primary
  font-size 26px
  font-weight bold

h2
  text-align center
  margin 50px 0 20px 0
  padding 0

h3
  font-size 26px
  color $accent
  text-align center
  margin 0 0 30px 0
  padding 0

.page-section-ourstory
  font-size $alt-text-size
  text-align center
  marging 20px

ul
  // list-style-image: url('~assets/app-icon.png')
  // list-style-image: url('~assets/odrazka.svg')
  list-style-type disc !important
  line-height 18px
  margin 0
  padding 0

  li
    list-style-position inside
    padding-left: 1.3em
    text-indent: -1.3em
    margin-bottom 13px

</style>
