<template lang="pug">
  q-page
    .row.justify-center.page-section-ourstory
      .col-xs-12.col-sm-7.col-md-6.form-width
        h2.text-center Kontaktujte nás
        div.text-center
          q-input(filled v-model="$v.name.$model" label="Jméno" :error="$v.name.$error" error-message="Vyplňte jméno")
          q-input(filled v-model="$v.company.$model" label="Společnost" :error="$v.company.$error" error-message="Vyplňte jméno společnosti")
          q-input(filled type="email" v-model="$v.email.$model" label="Email" :error="$v.email.$error" error-message="Zadejte platný email")
          q-input(filled v-model="$v.phone.$model" label="Telefon" :error="$v.phone.$error" error-message="Vyplňte Váš telefon")
          q-input(outlined type="textarea" v-model="$v.text.$model" :error="$v.text.$error" label="Napište nám jaké řešení potřebujete" error-message="Prosíme, vyplňte obsah zprávy" filled)
          .flex.justify-center
            q-checkbox(filled v-model="$v.souhlas.$model" label="Souhlas se zpracováním " :error="$v.souhlas.$error" error-message="prosím odsouhlaste")
            q-btn(no-caps :ripple="false" label="osobních údajů" flat size="md" type="link" @click="podminkyOpen = true" color="primary")
          podminky-dialog(v-model="podminkyOpen")

          q-btn.q-px-md.q-mt-md(:disabled="$v.$anyError" no-caps color="primary" label="Odeslat poptávku" size="lg" @click="sendForm")
          p.q-mt-md Zanechte nám své kontaktní údaje a my se Vám ozveme.
          // a(href='@click="podminkyOpen = true"') &nbsp;osob. údajů

</template>

<style scoped lang="stylus">
.form-width
  width 450px

.gekon-btn
  background-color $primary
  color white

.q-checkbox
  font-size 15px
  margin 0

a
  font-size 15px
  text-decoration: none
  color: $primary

h3
  font-size 35px
  line-height 15px
  font-weight medium

.text
  font-size 15px

p
  font-size 15px

li
  font-size 13px

</style>

<script>
// import axios from 'axios'
import PodminkyDialog from 'src/components/PodminkyDialog'
import { postForm } from 'src/postForm'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'FormularPage',
  components: { PodminkyDialog },
  data () {
    return {
      name: '',
      company: '',
      email: '',
      phone: '',
      text: '',
      souhlas: false,
      podminkyOpen: false
    }
  },

  validations: {
    name: {
      required
    },
    company: {
      required
    },
    email: {
      required, email
    },
    phone: {
      required
    },
    text: {
      required
    },
    souhlas: {
      required,
      souhlas (val) {
        return val === true
      }
    }
  },

  methods: {
    async sendSklikConversion () {
      // window.seznam_cId = 100057253
      // window.seznam_value = null
      // const code = await axios.get('https://www.seznam.cz/rs/static/rc.js')
      // eslint-disable-next-line no-eval
      // eval(code)
    },
    async sendForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        await postForm({
          name: 'altisima.cz-contact-form',
          formData: {
            name: this.name,
            company: this.company,
            email: this.email,
            phone: this.phone,
            text: this.text
          }
        })
        this.$q.dialog({
          message: 'Děkujeme, poptávka byla odeslána...'
        }).onDismiss(() => {
          this.clearForm()
        })
        await this.sendSklikConversion()
      } catch (err) {
        this.$q.dialog({
          message: 'Nepodařilo se zaslat poptávku...'
        })
      }
    },
    clearForm () {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.text = ''
      this.company = ''
      this.$v.$reset()
    }
  }
}
</script>
