<script>
export default {
  name: 'LicenncniUjednaniDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    }
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
  q-dialog(:value="alert" @input="closeUjednaniDialog")
    q-card(style="width: 900px; max-width: 100vw;")
      div(id="printMe")
        q-card-section
          .flex.no-wrap.justify-between
            .text-h4 Licenční ujednání
            q-btn(icon="close" flat round dense v-close-popup)

          .text-h6
          p
          | mezi společností Altisima software SE, Kubelíkova 46, Praha 3, IČO: 04722019 (dále jen výrobce) a uživatelem software (dále jen uživatel).
        q-card-section.q-pt-none

          br
          .text-h7.q-pb-sm
          strong I. Úvodní ustanovení
          ol
            li Výrobce je vykonavatelem majetkových práv k počítačovým programům (dále jen software). Veškeré varianty, moduly a podmínky používání software nebo placeného obsahu jsou definovány tímto Licenčním ujednáním.
            li Cena za používání software a placeného obsahu je určena podle typu instalace nebo použití varianty software a její podmínky jsou definovány tímto Licenčním ujednáním.
            li Uživateli software vzniká přijetím tohoto Licenčního ujednání a zadáním aktivačního kódu právo na používání software a placeného obsahu.

          br
          .text-h7.q-pb-sm
          strong II. Používání software na serveru Altisima
          ol
            li Výrobce poskytuje uživateli prostor na provoz software vždy na období jednoho roku, pokud není dohodou mezi výrobcem a uživatelem stanoveno jinak.
            li U variant software LITE vzniká, zadáním aktivačního klíče, uživateli právo na používání software na dobu neomezenou.
            li Cena za používání software na serveru Altisima je určena aktuálním ceníkem výrobce a je upravena Smlouvou o pronájmu software, která je uzavřena mezi výrobcem a uživatelem.
            li Uživatel, který se zaregistruje, jako společnost může pod tuto společnost registrovat další uživatele bez omezení množství současně pracujících uživatelů.
            li Upgrade software a základního implementačního obsahu poskytuje výrobce v rámci ceny za používání software na serveru Altisima.

          br
          .text-h7.q-pb-sm
          strong III. Používání software jako lokální instalace
          ol
            li Výrobce dává uživateli oprávnění k instalaci software na počítač uživatele nebo do počítačové sítě uživatele.
            li Platnost této licence je na dobu neomezenou, není-li určeno jinak.
            li Cena instalace a licence je určena objednávkou nebo smlouvou o dílo uzavřenou mezi výrobcem a uživatelem.
            li Oprávnění pro více současně pracujících uživatelů a jejich počet je určeno objednávkou nebo smlouvou o dílo uzavřenou mezi výrobcem a uživatelem.
            li Upgrade software a obsahu je poskytováno na základě Smlouvy o licenční podpoře nebo objednávce aktualizace uzavřené mezi výrobcem a uživatelem.

          br
          .text-h7.q-pb-sm
          strong IV. Pravidla použití varianty GEKON lite
          ol
            li Varianta software GEKON lite je vázána na držení výtisku publikace RECEPTURY TEPLÝCH POKRMŮ (vydání z roku 2015 a novější vydavatelství RPLUS) nebo jeho přílohy.
            li Uživatel potvrzuje práva na použití této varianty zadáním aktivačního klíče, který je součástí výtisku publikace RECEPTURY TEPLÝCH POKRMŮ (vydání z roku 2015 a novější vydavatelství RPLUS) nebo jeho přílohy.
            li Uživatel má právo používat variantu GEKON lite zdarma.
            li Uživatel získává právo používat licenci varianty GEKON lite na dobu neurčitou.
            li Součástí používání varianty software GEKON lite je elektronická licence obsahu RECEPTUR TEPLÝCH POKRMŮ (vydání z roku 2015 a novější vydavatelství RPLUS).
            li Uživatel software má možnost rozšířit obsah o další elektronické licence obsahu na základě objednávky obsahu.
            li Upgrade software varianty GEKON lite je poskytováno zdarma.

          br
          .text-h7.q-pb-sm
          strong V. Závěrečná ustanovení
          ol
            li Výrobce toto Licenční ujednání potvrzuje vydáním aktivačního klíče, zveřejněním v registračním nebo objednávkovém formuláři případně podpisem osoby oprávněné jednat za výrobce.
            li Uživatel toto Licenční ujednání potvrzuje zadáním aktivačního klíče, potvrzením souhlasu se smluvními podmínkami v registračním formuláři případně podpisem osoby oprávněné jednat za uživatele.
          br
          .text V Praze 1. 1. 2017
          br
          .text Altisima software SE, Kubelíkova 46, Praha 3
          .text www.altisima.cz, podpora@altisima.cz, tel.: +420 222 711 241


        q-card-actions(align="right")
          q-btn.q-px-md.q-mr-md(no-caps size="lg"  v-print="printObj" label="Tisk")
          q-btn.q-px-md(no-caps color="primary" label="Zavřít" size="lg" v-close-popup)
</template>

<style scoped lang="stylus">
#printMe
  background white !important
  @media print
    padding 2em
    .q-btn
      visibility: hidden

</style>
