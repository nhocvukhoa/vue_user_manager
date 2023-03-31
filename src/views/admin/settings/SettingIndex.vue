<template>
  <div>Đây là trang quản lý setting</div>
</template>

<script>
import { useMenu } from '../../../stores/use-menu.js'
export default {
  setup() {
    useMenu().onSelectedKeys(['admin-settings'])
  }
}
</script>
