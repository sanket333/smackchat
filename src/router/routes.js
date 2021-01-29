
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/auth', component: () => import('pages/PageAuth.vue') },
      { path: '/', component: () => import('pages/PageUser.vue') },
      { path: '/chat', component: () => import('pages/PageChat.vue') },      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
