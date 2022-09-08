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
          template(#semi-title) Zabezpečíme
          template(#title) Servisní podporu
          template(#description) Podpora našich systémů je dostupná sedm dní v&nbsp;týdnu.

      q-carousel-slide(name="2" img-src="~assets/carusel-altisima-002.jpg")
        carousel-content
          template(#semi-title) Moderní
          template(#title) Dietní systém
          template(#description) Řídí výrobu dietních jídel v&nbsp;provozech s&nbsp;dietním stravováním.

      q-carousel-slide(name="3" img-src="~assets/carusel-altisima-003.jpg")
        carousel-content
          template(#semi-title) Připravíme
          template(#title) Implementaci software
          template(#description) Naše zkušenosti s&nbsp;nasazením software vám pomohou zjednodušit proces implementace.

      q-carousel-slide(name="4" img-src="~assets/carusel-altisima-004.jpg")
        carousel-content
          template(#semi-title) Univerzální
          template(#title) Řešení provozu
          template(#description) Internetové moduly objednávání, kiosky, výdejní terminály, řešení přístupu a&nbsp;docházkový systém.

      q-carousel-slide(name="5" img-src="~assets/carusel-altisima-005.jpg")
        carousel-content
          template(#semi-title) Zjednodušíme
          template(#title) Procesy zpracování
          template(#description) Celý systém nastavíme s&nbsp;ohledem na usnadnění práce a&nbsp;úsporu vašeho času.

      q-carousel-slide(name="6" img-src="~assets/carusel-altisima-006.jpg")
        carousel-content
          template(#semi-title) Modernizace
          template(#title) Software a&nbsp;hardware
          template(#description) Naše produkty průběžně modernizujeme a&nbsp;přizpůsobujeme potřebám zákazníků.

  page-section.section-nadpis.text-center
    .row.justify-center.page-section-ourstory
      .col-xs-12.col-sm-8.col-md-7.q-px-md.q-mb-xl
        h2 Náš příběh
        | První systémy pro stravování jsme dodali v roce 1999. Už tehdy jsme se snažili o inovativní přístup se zaměřením na potřeby zákazníka, první instalace software Magdalena a Jídelna jsme postupně naučili síťovou komunikaci.
        p
        | Skladový systém Magdalena jsme rozšířili o řízení výroby dietní stravy Magdalena DS, který používají nemocnice nebo domovy pro seniory do dnes.
        p
        | Po roce 2012 jsme začali kompletně měnit technologie s využitím moderních trendů. Stejnou evolucí prošli i hardwarové prvky našeho řešení, počáteční externí výrobu jsme přenesli do firmy, proto jsme schopni poskytovat plný servis.
        p
        | K dalšímu velkému rozšíření našeho portfolia produktů došlo v roce 2018, kdy jsme dokončili vývoj přístupového systému Dorsys.
        p
        | Další důležitou oblastí je podpora našich zákazníků, dokážeme pomoci s nasazením systému, jeho nastavením a nabídnout nadstandardní servisní podporu.


  page-section
    h2.text-center Nabízená řešení
    .flex.justify-center(:class="{'q-gutter-lg': !$q.screen.lt.sm}")

      jidelna-section-double-card
        a.invisible-link(href="jidelnasql.cz" target="_blank")
        template(#icon)
          img(src="~assets/reseni-03.jpg" alt="Chip")
        template(#title) JídelnaSQL
        template(#default)
          div.text-left.ulli
            | JídelnaSQL není jen software pro evidenci strávníků, je to komplexní řešení vedení stravovacího provozu.
            p
            | Toto řešení používají stovky provozů s využitím různých modulů a doplňků pro zajištění kompletního servisu pro své strávníky.
            p
            a(href="https://jidelnasql.cz" target="_blank") Detailní informace o stravovacím systému a jeho částech naleznete zde >

      jidelna-section-double-card
        template(#title) Gekon
        template(#icon)
          img(src="~assets/reseni-02.jpg" alt="Chip")
        template(#default)
          div.text-left.ulli
            | Skladový systém Gekon řídí výrobu stravy v gastronomických provozech. Je vhodný pro všechny provozy, které hledají software pro evidenci skladového hospodářství a následnou analýzu ekonomické výtěžnosti připravovaných jídel.
            p
            | Moderní uživatelské rozhraní nabízí pohodlnou a rychlou práci.
            p
            a(href="https://gekon-sw.cz" target="_blank") Detaily naleznete zde >

      jidelna-section-double-card
        template(#title) Dorsys
        template(#icon)
          img(src="~assets/reseni-01.jpg" alt="Chip")
        template(#default)
          div.text-left.ulli
            | Nejnovější produkt z našeho portfolia. Přístupový a docházkový
            | systém Dorsys zabezpečí vstupy do budovy, kanceláří, učeben nebo hotelových pokojů.
            p
            | Umožňuje nastavení časových zón nebo skupin oprávnění, eviduje docházku a poskytuje podklady pro zpracování mezd.
            p
            a(href="https://dorsys.cz" target="_blank") Technický popis řešení naleznete zde >


  page-section
    h2 Služby
    .flex.q-gutter-sm(:class="{'justify-center': $q.screen.gt.xs}")
      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Analýza řešení
        template
          | Na základě vaší poptávky vypracujeme detailní popis řešení s doporučenou konfigurací
          | systému. Vezmeme v úvahu množství strávníků nebo vstupujících osob.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Implementace
        template
          | Dodání software důkladně připravíme, v databázi dostanete připravený datový model,
          | se základními údaji a daty nebo ho naplníme vašimi hodnotami pomocí importu.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Školení
        template
          | Systémem vás postupně provedeme a přizpůsobíme se vašim časovým požadavkům.
          | Probereme jednotlivé procesy, které si natrénujete pod dohledem technika.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Integrace
        template
          | Náš software je připravený na propojení s externími systémy. Poskytneme
          | vám data pro automatické zpracování mzdy, srážky ze mzdy nebo naplníme data z jiného systému.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Přizpůsobení
        template
          | Už při vývoji jsme mysleli na možnosti přizpůsobení software vašim
          | požadavkům, zobrazení objednávek nebo tiskové výstupy mohou odpovídat vašemu zadání.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Servis
        template
          | Implementací naše služby nekončí, podporu našemu software poskytujeme sedm dní
          | v týdnu. Dáme vám možnost využít servisního programu s podporou zdarma.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Vývoj
        template
          | Při vývoji využíváme moderní trendy a technologie, vždy se řídíme podněty
          | od našich zákazníků a poznatky integrujeme do software, klademe důraz na ergonomii ovládání.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Aktualizace
        template
          | Aktualizace software je v rámci Licenční podpory zdarma, ověření verze programu, stažení
          | nové a její instalace probíhá automaticky a trvá jen několik minut.

      page-section-card
        template(#icon)
          img(src="~assets/a-altisima-odrazka2.svg" alt="Icona" height="36px")
        template(#title) Montáž
        template
          | Pečlivě připravíme a ověříme možnosti montáže našich terminálů nebo čteček,
          | vždy se snažíme najít optimální řešení montáže s ohledem na provedení a cenu.

    page-section
      h2 Realizovaná řešení
      .row.gekon-btn
        .col.gekon-card-solution
          h2.gekon-counter-b
            animated-number(:number="452" :time="1200" :restart="true")
          p.text-center.gekon-counter-s zákazníků
        .col.gekon-card-solution
          h2.gekon-counter-b
            animated-number(:number="18" :time="1200" :restart="true")
            span &nbsp;%
          p.text-center.gekon-counter-s nárůst za poslední rok
        .col.gekon-card-solution
          h2.gekon-counter-b
            animated-number(:number="135" :time="1200" :restart="true")
          p.text-center.gekon-counter-s realizovaných řešení
        .col.gekon-card-solution
          h2.gekon-counter-b
            animated-number(:number="2856" :time="1200" :restart="true")
          p.text-center.gekon-counter-s hodin podpory zdarma

    page-section
      h2 Řekli o nás
      div
        q-carousel(
          v-if="$q.screen.gt.sm"
          swipeable
          animated
          v-model="slideReferences"
          arrows
          navigation
          height="270px"
          infinite
          transition-next="slide-left"
          transition-prev="slide-right"
          control-color="primary").no-alt-scroll

          q-carousel-slide(name="1")
            .flex.justify-center.q-gutter-xl
              reference-card
                template(#name) Kamila Košteynová
                template(#ref-position) vedoucí školní jídelny MŠ Červený Újezd
                template(#popis) Servisní podpora je rychlá a dostupná, vždy se s technikem domluvím na odstranění problému nebo změně nastavení.
              reference-card
                template(#name) Božena Němcová
                template(#ref-position) vedoucí školní jídelny ZŠ Filosofská, Praha.
                template(#popis) Oceňuji ochotný přístup techniků při řešení požadavků na servis nebo změnu nastavení.

          q-carousel-slide(name="2")
            .flex.justify-center.q-gutter-xl
              reference-card
                template(#name) Vladimíra Kálalová
                template(#ref-position) vedoucí Jídelny U Kantora, Teplice
                template(#popis) Naprostá spokojenost. Programy splňují naše očekávání a líbí se mi nadstandardní podpora ze strany techniků Altisimy.
              reference-card
                template(#name) Blanka Volínová
                template(#ref-position) vedoucí školní jídelny MŠ Rembrandtova, Praha
                template(#popis) Skvělá servisní podpora dostupná 7 dní v týdnu. I o víkendu mi technici z Altisimy pomůžou vyřešit problém.

          q-carousel-slide(name="3")
            .flex.justify-center.q-gutter-xl
              reference-card
                template(#name) Zdeňka Juričová
                template(#ref-position) manager kvality a nutriční terapeutka PNMO, Bílá voda
                template(#popis) Instalace, nastavení a zaškolení práce se systémem proběhla dobře, technici se nám skvěle věnovali a systémem nás postupně provedli.
              reference-card
                template(#name) JK
                template(#ref-position) správce IS CPF, a.s., Plzeň
                template(#popis) Na naši poptávku s konkrétními požadavky jsme dostali zajímavou nabídku s podrobným technickým popisem řešení. Přesto, že na přípravu a dodání zařízení byl jen krátký čas, dodavatel domluvené termíny dodávky a zprovoznění systému dodržel.

          q-carousel-slide(name="4")
            .flex.justify-center.q-gutter-xl
              reference-card
                template(#name) Táňa Genová
                template(#ref-position) nutriční terapeutka DPS Korýtko, Ostrava
                template(#popis) S Altisimou spolupracujeme už několik let, všechny naše požadavky na změny nastavení oddělení a výstupy pro účetní splnili k naprosté spokojenosti.
              reference-card
                template(#name) Hana Kuchaříková
                template(#ref-position) vedoucí závodní jídelny Eurogastro catering, s.r.o., Litovel
                template(#popis) Servis software i hardware probíhá k plné spokojenosti, technici jsou ochotní a vždy se snaží o rychlé vyřešení problému.

          q-carousel-slide(name="5")
            .flex.justify-center.q-gutter-xl
              reference-card
                template(#name) Lenka Vlčková
                template(#ref-position) Školní jídelna Kbely
                template(#popis) Velkou úsporu času pro mě znamená Elektronická přihláška ke stravování. Usnadnila mi komunikaci s rodiči dětí, protože jim automaticky odešle veškeré údaje, které pro školní jídelnu potřebují. Je spolehlivá a funguje velmi dobře.
              reference-card
                template(#name) Kristián Nevoral
                template(#ref-position) Charly Amunsement
                template(#popis) Naše firma má na e-Jídelníčku 2500 registrovaných strávníků, velmi oceňuji možnost zaslání e-mailové zprávy všem uživatelům a týdenní reporty s údaji o jídelníčku, odebrané stravě a čerpání financí z konta strávníka.

        div(:class="{'q-gutter-sm justify-center': $q.screen.gt.sm}" v-else)
          q-carousel(
            swipeable
            animated
            v-model="slideReferences"
            arrows
            navigation
            height="350px"
            infinite
            transition-next="slide-left"
            transition-prev="slide-right"
            control-color="primary").no-alt-scroll

            q-carousel-slide(name="1")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Kamila Košteynová
                  template(#ref-position) vedoucí školní jídelny MŠ Červený Újezd
                  template(#popis) Servisní podpora je rychlá a dostupná, vždy se s technikem domluvím na odstranění problému nebo změně nastavení.

            q-carousel-slide(name="2")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Božena Němcová
                  template(#ref-position) vedoucí školní jídelny ZŠ Filosofská, Praha.
                  template(#popis) Oceňuji ochotný přístup techniků při řešení požadavků na servis nebo změnu nastavení.

            q-carousel-slide(name="3")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Vladimíra Kálalová
                  template(#ref-position) vedoucí Jídelny U Kantora, Teplice
                  template(#popis) Naprostá spokojenost. Programy splňují naše očekávání a líbí se mi nadstandardní podpora ze strany techniků Altisimy.

            q-carousel-slide(name="4")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Blanka Volínová
                  template(#ref-position) vedoucí školní jídelny MŠ Rembrandtova, Praha
                  template(#popis) Skvělá servisní podpora dostupná 7 dní v týdnu. I o víkendu mi technici z Altisimy pomůžou vyřešit problém.

            q-carousel-slide(name="5")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Zdeňka Juričová
                  template(#ref-position) manager kvality a nutriční terapeutka PNMO, Bílá voda
                  template(#popis) Instalace, nastavení a zaškolení práce se systémem proběhla dobře, technici se nám skvěle věnovali a systémem nás postupně provedli.

            q-carousel-slide(name="6")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) JK
                  template(#ref-position) správce IS CPF, a.s., Plzeň
                  template(#popis) Na naši poptávku s konkrétními požadavky jsme dostali zajímavou nabídku s podrobným technickým popisem řešení. Přesto, že na přípravu a dodání zařízení byl jen krátký čas, dodavatel domluvené termíny dodávky a zprovoznění systému dodržel.

            q-carousel-slide(name="7")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Táňa Genová
                  template(#ref-position) nutriční terapeutka DPS Korýtko, Ostrava
                  template(#popis) S Altisimou spolupracujeme už několik let, všechny naše požadavky na změny nastavení oddělení a výstupy pro účetní splnili k naprosté spokojenosti.

            q-carousel-slide(name="8")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Hana Kuchaříková
                  template(#ref-position) vedoucí závodní jídelny Eurogastro catering, s.r.o., Litovel
                  template(#popis) Servis software i hardware probíhá k plné spokojenosti, technici jsou ochotní a vždy se snaží o rychlé vyřešení problému.

            q-carousel-slide(name="9")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Lenka Vlčková
                  template(#ref-position) Školní jídelna Kbely
                  template(#popis) Velkou úsporu času pro mě znamená Elektronická přihláška ke stravování. Usnadnila mi komunikaci s rodiči dětí, protože jim automaticky odešle veškeré údaje, které pro školní jídelnu potřebují. Je spolehlivá a funguje velmi dobře.

            q-carousel-slide(name="10")
              .flex.justify-center.q-gutter-lg
                reference-card
                  template(#name) Kristián Nevoral
                  template(#ref-position) Charly Amunsement
                  template(#popis) Naše firma má na e-Jídelníčku 2500 registrovaných strávníků, velmi oceňuji možnost zaslání e-mailové zprávy všem uživatelům a týdenní reporty s údaji o jídelníčku, odebrané stravě a čerpání financí z konta strávníka.

  page-section
    h2 Náš tým
    .flex.q-gutter-sm(:class="{'justify-center': $q.screen.gt.xs}")
      page-section-card
        template(#icon)
          .alt-maska-kruh
            img(src="~assets/medailonek-robert.jpg" alt="Icona" height="96px")
        template(#title)
          .alt-jmeno Robert Čeněk
          .alt-funkce statutární ředitel
          .alt-funkce obchod a marketing
          .alt-telefon
            phone-link(phone="+420 776 273 337")
          .alt-email
            a(href="javascript:window.location.href=atob('bWFpbHRvOmNlbmVrQGFsdGlzaW1hLmN6P3N1YmplY3Q9RmVlZGJhY2slMjB6JTIwd2VidSUyMGFsdGlzaW1hLmN6')")
              <span>ce</span><span>nek</span><span>@alt</span><span>isima.cz</span>

      page-section-card
        template(#icon)
          .alt-maska-kruh
            img(src="~assets/medailonek-honza.jpg" alt="Icona" height="96px")
        template(#title)
          .alt-jmeno Jan Hamouz
          .alt-funkce řízení realizací a montáže
          .alt-funkce zákaznická podpora
          .alt-telefon
            phone-link(phone="+420 731 164 187")
          .alt-email
            a(href="javascript:window.location.href=atob('bWFpbHRvOmhhbW91ekBhbHRpc2ltYS5jej9zdWJqZWN0PUZlZWRiYWNrJTIweiUyMHdlYnUlMjBhbHRpc2ltYS5jeg==')")
              <span>ham</span><span>ouz</span><span>@alt</span><span>isima.cz</span>

      page-section-card
        template(#icon)
          .alt-maska-kruh
            img(src="~assets/medailonek-slavo2.jpg" alt="Icona" height="96px")
        template(#title)
          .alt-jmeno Slavomír Gajdoš
          .alt-funkce implementace
          .alt-funkce zákaznická podpora
          .alt-telefon
            phone-link(phone="+420 603 527 629")
          .alt-email
            a(href="javascript:window.location.href=atob('bWFpbHRvOmdhamRvc0BhbHRpc2ltYS5jej9zdWJqZWN0PUZlZWRiYWNrJTIweiUyMHdlYnUlMjBhbHRpc2ltYS5jeg==')")
              <span>gaj</span><span>dos</span><span>@alt</span><span>isima.cz</span>


  page-section
    h2 Naši vývojáři
    .flex.q-gutter-sm(:class="{'justify-center': $q.screen.gt.xs}")
      page-section-card-vyvojari
        template(#icon)
          .alt-maska-kruh
            //img(src="~assets/medailonek-jarda.jpg" alt="Icona" height="36px")
        template(#title)
          .alt-jmeno Jarda
          .alt-funkce ředitel vývoje
          .alt-email
            a(href="javascript:window.location.href=atob('bWFpbHRvOnBvZHBvcmFAYWx0aXNpbWEuY3o/c3ViamVjdD1GZWVkYmFjayUyMHolMjB3ZWJ1JTIwYWx0aXNpbWEuY3olMjBwcm8lMjBKYXJkdQ==')")
              <span>po</span><span>dpora</span><span>@alt</span><span>isima.cz</span>

      page-section-card-vyvojari
        template(#icon)
          .alt-maska-kruh
            //img(src="~assets/medailonek-altisima.jpg" alt="Icona" height="36px")
        template(#title)
          .alt-jmeno Lukáš
          .alt-funkce frontend
          .alt-email
            a(href="javascript:window.location.href=atob('bWFpbHRvOnBvZHBvcmFAYWx0aXNpbWEuY3o/c3ViamVjdD1GZWVkYmFjayUyMHolMjB3ZWJ1JTIwYWx0aXNpbWEuY3olMjBwcm8lMjBMdWthc2U=')")
              <span>po</span><span>dpora</span><span>@alt</span><span>isima.cz</span>

      page-section-card-vyvojari
        template(#icon)
          .alt-maska-kruh
            //img(src="~assets/medailonek-otisk.jpg" alt="Icona" height="36px")
        template(#title)
          .alt-jmeno Jiří
          .alt-funkce vývoj hardware
          .alt-email
            a(href="javascript:window.location.href=atob('bWFpbHRvOnBvZHBvcmFAYWx0aXNpbWEuY3o/c3ViamVjdD1GZWVkYmFjayUyMHolMjB3ZWJ1JTIwYWx0aXNpbWEuY3olMjBwcm8lMjBKaXJrdQ==')")
              <span>po</span><span>dpora</span><span>@alt</span><span>isima.cz</span>

      page-section-card-vyvojari
        template(#icon)
          .alt-maska-kruh
            //img(src="~assets/medailonek-martin.jpg" alt="Icona" height="36px")
        template(#title)
          .alt-jmeno Martin
          .alt-funkce databázový specialista
          .alt-email
            a(href="javascript:window.location.href=atob('bWFpbHRvOnBvZHBvcmFAYWx0aXNpbWEuY3o/c3ViamVjdD1GZWVkYmFjayUyMHolMjB3ZWJ1JTIwYWx0aXNpbWEuY3olMjBwcm8lMjBKaXJrdQ==')")
              <span>po</span><span>dpora</span><span>@alt</span><span>isima.cz</span>

  page-section
    .cenareseni
      h2.text-center Výběr z blogu
    .flex.justify-center(:class="{'q-gutter-lg': !$q.screen.lt.sm}")
      jidelna-section-blog-card(v-for="post in blogPosts" :key="post.id" style="width: 350px;")
        a.invisible-link(:href="post.url" target="_blank")
          // pre {{post}}
          q-img(:src="post.feature_image" basic style="height: 200px;")
          q-card-section
          span
          q-icon(name="date_range" style="font-size: 18px; color: #BBBBBB;" )
          span
            |  {{formatDate(post.published_at)}}

          .relative-bottom.alt-blog-nadpis
            | {{post.title}}
            //| {{post.excerpt}}

  // page-section
    .cenareseni
      h2.text-center Poslední tweety
    .row.justify-center.page-section-ourstory
      .col-xs-12.col-sm-8.col-md-7.q-px-md.q-mb-xl
        q-card.tweets
          a.twitter-timeline(href="https://twitter.com/AltisimaSe?ref_src=twsrc%5Etfw")
          div
            script(async src="https://platform.twitter.com/widgets.js" charset="utf-8")

  page-section
    .cenareseni
      h4.q-mb-md.text-center Právní ujednání
    .row.justify-center
      q-btn.alt-btn.q-ma-xs.q-ml-md(rounded icon="eva-award-outline" no-caps
        label="Licenční ujednání o použití software" size="md" type="a" @click="ujednaniDialogOpen = true")
      licenncni-ujednani-dialog(v-model="ujednaniDialogOpen")

      q-btn.alt-btn.q-ma-xs.q-ml-md(rounded icon="eva-file-outline" no-caps :ripple="false"
        label="Všeobecné smluvní podmínky" size="md" type="a" @click="podminkyDialogOpen = true")
      VseobecneSmluvniPodminkyDialog(v-model="podminkyDialogOpen")

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
