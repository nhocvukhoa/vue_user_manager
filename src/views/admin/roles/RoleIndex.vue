<template>
  <div>Đây là trang quản lý role</div>
</template>

<script>
import { useMenu } from '../../../stores/use-menu.js'
export default {
  setup() {
    useMenu().onSelectedKeys(['admin-roles'])
  }
}
</script>
