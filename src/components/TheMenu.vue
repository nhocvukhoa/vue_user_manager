<template>
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
    <a-menu-item key="admin-users">
      <router-link :to="{ name: 'admin-users' }">
        <span> <UserOutlined class="me-2" />Tài khoản </span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="admin-roles">
      <router-link :to="{ name: 'admin-roles' }">
        <span> <TagOutlined class="me-2" />Vai trò </span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="admin-settings">
      <router-link :to="{ name: 'admin-settings' }">
        <span> <SettingOutlined class="me-2" />Thiết lập</span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { UserOutlined, TagOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { useMenu } from '../stores/use-menu.js'
import { storeToRefs } from 'pinia'
export default defineComponent({
  components: {
    UserOutlined,
    TagOutlined,
    SettingOutlined
  },
  setup() {
    const store = useMenu()

    return {
      ...storeToRefs(store)
    }
  }
})
</script>
