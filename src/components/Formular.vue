<script>
// import axios from 'axios'
import PodminkyDialog from 'src/components/PodminkyDialog'
import { postForm } from 'src/postForm'
import { email, required } from 'vuelidate/lib/validators'

export default {
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
        // await this.sendSklikConversion()
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


<template lang="pug">
div.text-center
  q-input.alt-input-marging(dense filled v-model="$v.name.$model" label="Vaše jméno" :error="$v.name.$error" error-message="Vyplňte vaše jméno")
  q-input.alt-input-marging(dense filled v-model="$v.company.$model" label="Název obce" :error="$v.company.$error" error-message="Vyplňte jméno vaší obce")
  q-input.alt-input-marging(dense filled type="email" v-model="$v.email.$model" label="Email" :error="$v.email.$error" error-message="Zadejte platný email")
  q-input.alt-input-marging(dense filled v-model="$v.phone.$model" label="Telefon" :error="$v.phone.$error" error-message="Vyplňte Váš telefon")
  // q-input.alt-input-marging(dense autogrow outlined type="textarea" v-model="$v.text.$model" :error="$v.text.$error" label="Napište nám jaké řešení potřebujete" error-message="Prosíme, vyplňte obsah zprávy" filled)
  .flex.justify-center
    q-checkbox(dense filled v-model="$v.souhlas.$model" label="Souhlas se zpracováním " :error="$v.souhlas.$error" error-message="prosím odsouhlaste")
    q-btn(no-caps :ripple="false" label="osob. údajů" flat size="small" type="link" @click="podminkyOpen = true" color="primary")
  podminky-dialog(v-model="podminkyOpen")

  q-btn.q-px-md.q-mt-md(:disabled="$v.$anyError" no-caps color="primary" label="Chci více informací" size="md" @click="sendForm" class="text-bold")

</template>

<style scoped lang="stylus">

.alt-input-marging
  margin -4px

@media screen and (max-width: 769px)
  .alt-input-marging
    margin -10px -5px -10px -5px


@media screen and (max-width: 426px)
  .alt-input-marging
    margin -12px -5px -12px -5px
    width 300px

@media screen and (max-width: 321px)
  .alt-input-marging
    margin -12px -10px -12px -10px
    width 290px

.gekon-btn
  background-color $primary
  color white

.q-checkbox
  font-size 13px
  margin 0

a
  font-size 13px
  text-decoration: none
  color: $primary

h3
  font-size 16px
  line-height 15px
  font-weight medium

p
  font-size 13px

li
  font-size 13px

</style>

