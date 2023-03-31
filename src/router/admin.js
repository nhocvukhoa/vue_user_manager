const admin = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../layout/AdminLayout.vue'),
    children: [
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('../views/admin/users/UserIndex.vue')
      },
      {
        path: 'users/create',
        name: 'admin-users-create',
        component: () => import('../views/admin/users/UserCreate.vue')
      },
      {
        path: 'users/:id/edit',
        name: 'admin-users-edit',
        component: () => import('../views/admin/users/UserEdit.vue')
      },
      {
        path: 'roles',
        name: 'admin-roles',
        component: () => import('../views/admin/roles/RoleIndex.vue')
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('../views/admin/settings/SettingIndex.vue')
      }
    ]
  }
]

export default admin
