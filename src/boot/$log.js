// "async" is optional

export default async ({ Vue }) => {
  Vue.prototype.$log = console.log.bind(console)
}
