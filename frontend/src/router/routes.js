const routes = [
  {
    path: '/',
    component: () => import('pages/batch29.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') }
    // ]
  },
  { path: '/project', component: () => import('pages/project.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes