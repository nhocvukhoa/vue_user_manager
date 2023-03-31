<template>
  <a-card title="Tài khoản" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <router-link :to="{ name: 'admin-users-create' }">
          <a-button type="primary">
            <PlusOutlined />
          </a-button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <span>{{ index + 1 }}</span>
            </template>
            <template v-if="column.key === 'status'">
              <span v-if="record.status == 1" class="text-danger">Khóa</span>
              <span v-else-if="record.status == 2" class="text-primary">Hoạt động</span>
            </template>
            <template v-if="column.key === 'action'">
              <router-link :to="{ name: 'admin-users-edit', params: { id: record.id } }">
                <a-button type="primary" class="me-2">
                  <EditOutlined />
                </a-button>
              </router-link>
              <a-button type="danger" @click="deleteUser(record.id)">
                <DeleteOutlined />
              </a-button>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>

<script>
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useMenu } from '../../../stores/use-menu.js'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
  },
  setup() {
    useMenu().onSelectedKeys(['admin-users'])

    const users = ref([])
    const columns = [
      {
        title: '#',
        key: 'index'
      },
      {
        title: 'Avatar',
        key: 'avatar'
      },
      {
        title: 'Tài khoản',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: 'Họ Tên',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Phòng ban',
        dataIndex: 'departments',
        key: 'departments'
      },
      {
        title: 'Vai trò',
        key: 'roles'
      },
      {
        title: 'Tình trạng',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: 'Công cụ',
        key: 'action',
        fixed: 'right'
      }
    ]

    const getUsers = () => {
      axios
        .get('http://127.0.0.1:8000/api/users')
        .then((response) => {
          users.value = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    }

    getUsers()

    const deleteUser = (id) => {
      if (confirm("Bạn có chắc chắn muốn xóa user này không?")) {
        axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
          .then((response) => {
            if (response.status == 200) {
              message.success('Xóa người dùng thành công!')
              getUsers()
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }

    return {
      users,
      columns,
      deleteUser
    }
  }
})
</script>
