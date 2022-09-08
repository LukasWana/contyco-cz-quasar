<script>
// import axios from 'axios'
import PodminkyDialog from 'src/components/PodminkyDialog'
import { postForm } from 'src/postForm'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'JidelnaFormular',
  components: { PodminkyDialog },
  data () {
    return {
      name: '',
      company: '',
      subject: '',
      email: '',
      phone: '',
      text: '',
      souhlas: false,
      podminkyOpen: false,
      dialog: false
    }
  },

  mounted () {
    this.clearForm()
  },

  validations: {
    name: {
      required
    },
    company: {
      //   required
    },
    subject: {
      required
    },
    email: {
      required, email
    },
    phone: {
      //   required
    },
    text: {
      required
    },
    souhlas: {
      //   required,
      //   souhlas (val) {
      //     return val === true
      //   }
    }
  },

  methods: {

    async sendForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        const formData = {
          name: this.name,
          company: this.company,
          subject: this.subject,
          email: this.email,
          phone: this.phone,
          text: this.text
        }
        window.localStorage.setItem('helpdesk-form', JSON.stringify(formData))
        await postForm({
          name: 'altisima.cz-helpdesk-form',
          formData
        })
        this.$bus.$layout.helpDeskOpen = false
        this.$q.dialog({
          message: `
          Děkujeme, váš požadavek byl založen. Na uvedenou emailovou adresu ${this.email} Vám přijde potvrzující email.

          Pokud chcete připojit další informace, jednodušše na tento email odpovězte.`
        }).onDismiss(() => {
          // this.clearForm()
        })
      } catch (err) {
        this.$q.dialog({
          message: 'Nepodařilo se zaslat požadavek...'
        })
      }
    },

    clearForm () {
      let formData
      const helpdeskStored = window.localStorage.getItem('helpdesk-form')
      if (helpdeskStored) {
        formData = JSON.parse(helpdeskStored)
      }
      this.name = formData ? formData.name : ''
      this.email = formData ? formData.email : ''
      this.phone = formData ? formData.phone : ''
      this.text = ''
      this.company = formData ? formData.company : ''
      this.$v.$reset()
    }
  }
}
</script>


<template lang="pug">
  div.text-center
    // q-input(dense filled v-model="$v.company.$model" label="Jméno společnost" :error="$v.company.$error" error-message="Vyberte službu: Gekon, Jidelnasql, Dorsys")
    q-input.alt-input-marging(dense filled type="name" v-model="$v.name.$model" label="Vaše jméno" :error="$v.name.$error" error-message="Zadejte vaše jméno")
    q-input.alt-input-marging(dense filled type="email" v-model="$v.email.$model" label="Váš e-mail" :error="$v.email.$error" error-message="Zadejte platný email")
    q-input.alt-input-marging(dense filled v-model="$v.phone.$model" label="Telefon" :error="$v.phone.$error" error-message="Vyplňte Váš telefon")
    q-input.alt-input-marging.q-mt-sm(dense v-model="$v.subject.$model" :error="$v.subject.$error" label="Předmět" error-message="Předmět zprávy" filled)
    q-input.alt-input-marging.q-mt-sm(dense type="textarea" v-model="$v.text.$model" :error="$v.text.$error" label="Pokuste se prosím popsat Váš problém" error-message="Prosíme, napište co Vás trápí" filled).height-md
    q-btn.q-px-md(:disabled="$v.$anyError" no-caps color="primary" label="Odeslat žádost" size="md" @click="sendForm")



    // q-input(dense filled v-model="$v.name.$model" label="Jméno" :error="$v.name.$error" error-message="Vyplňte jméno")
    //div.flex.justify-between
      q-checkbox.q-pl-none(dense filled v-model="$v.souhlas.$model" label="Souhlas se zprac. os. údajů" :error="$v.souhlas.$error" error-message="prosím odsouhlaste")
      q-btn(no-caps :ripple="false" label="Ukaž podmínky" flat size="small" type="link" @click="podminkyOpen = true")
    //podminky-dialog(v-model="podminkyOpen")
    //div(style="height: 280px; padding-top: 0em;")
    //p.q-mt-md Zanechte nám své kontaktní údaje a my se Vám ozveme.
</template>

<style scoped lang="stylus">

@media screen and (max-width: 769px)
  .alt-input-marging
    margin -10px -5px -10px -5px


@media screen and (max-width: 426px)
  .alt-input-marging
    margin -10px -5px -10px -5px
    width 300px

@media screen and (max-width: 321px)
  .alt-input-marging
    margin -12px -10px -12px -10px
    width 290px

.height-md
  height 100px

.gekon-btn
  background-color $primary
  color white

h3
  font-size 16px
  line-height 15px
  font-weight medium

p
  font-size 13px

li
  font-size 13px

</style>

