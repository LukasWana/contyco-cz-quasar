const routes = [
  {
    path: '/',
    props: true,
    component: () => import('src/layouts/Layout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/IndexAltisima.vue') },
      { name: 'kontaktni-formular', path: 'kontaktujte-nas', component: () => import('pages/FormularPage.vue') },
      { name: 'prihlaska', path: 'prihlaska', component: () => import('pages/FormularPrihlaskaPage.vue') },
      { name: 'prihlaska-zolik', path: 'prihlaska-zolik', component: () => import('pages/FormularPrihlaskaZolikPage.vue') },
      { name: 'prihlaska-homebanking', path: 'prihlaska-homebanking', component: () => import('pages/FormularPrihlaskaHomeBankingPage.vue') },
      { name: 'smluvni-podminky', path: 'podminky', component: () => import('pages/SmluvniPodminky.vue') }
    ]
  },
  {
    path: '',
    redirect: { name: 'index' }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
