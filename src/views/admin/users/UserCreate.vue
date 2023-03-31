<template>
  <form @submit.prevent="createUser()">
    <a-card title="Tạo mới tài khoản" style="width: 100%">
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">
              <a-avatar shape="square" :size="200">
                <template #icon>
                  <img src="../../../assets/logo.svg" alt="" />
                </template>
              </a-avatar>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <a-button type="primary">
                <PlusOutlined class="me-2" />
                <span>Chọn ảnh</span>
              </a-button>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-8">
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-2">*</span>
                <span :class="{ 'text-danger': errors.username }">Tên tài khoản:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                placeholder="Tên tài khoản"
                allow-clear
                v-model:value="username"
                :class="{ 'select-danger': errors.username }"
              />
              <div class="w-100"></div>
              <span v-if="errors.username" class="text-danger">{{ errors.username[0] }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-2">*</span>
                <span :class="{ 'text-danger': errors.username }">Họ và tên:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                placeholder="Họ và tên"
                allow-clear
                v-model:value="name"
                :class="{ 'input-danger': errors.name }"
              />
              <div class="w-100"></div>
              <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-2">*</span>
                <span :class="{ 'text-danger': errors.email }">Email:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                placeholder="Email"
                allow-clear
                v-model:value="email"
                :class="{ 'input-danger': errors.email }"
              />
              <div class="w-100"></div>
              <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.email }"> Phòng ban: </span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-select
                show-search
                placeholder="Phòng ban"
                style="width: 100%"
                :options="departments"
                :filter-option="filterOption"
                allow-clear
                v-model:value="department_id"
                :class="{
                  'select-danger': errors.department_id
                }"
              ></a-select>
              <div class="w-100"></div>
              <span v-if="errors.department_id" class="text-danger">{{
                errors.department_id[0]
              }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.password }"> Mật khẩu: </span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input-password
                placeholder="Mật khẩu"
                allow-clear
                v-model:value="password"
                :class="{ 'input-danger': errors.password }"
              />
              <div class="w-100"></div>
              <span v-if="errors.password" class="text-danger">{{ errors.password[0] }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Xác nhận mật khẩu:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input-password
                placeholder="Xác nhận mật khẩu"
                allow-clear
                v-model:value="password_confirmation"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button type="danger" class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'admin-users' }">
              <span>Hủy</span>
            </router-link>
          </a-button>
          <a-button type="primary" html-type="submit">
            <span>Lưu</span>
          </a-button>
        </div>
      </div>
    </a-card>
  </form>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useMenu } from '../../../stores/use-menu.js'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    PlusOutlined
  },
  setup() {
    useMenu().onSelectedKeys(['admin-users'])

    const departments = ref([])

    const getDepartment = () => {
      axios
        .get('http://127.0.0.1:8000/api/users/create')
        .then((response) => {
          departments.value = response.data.departments
          console.log(departments.value)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    getDepartment()

    // Create user data
    const users = reactive({
      username: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      department_id: []
    })

    const errors = ref({})
    const router = useRouter()

    const createUser = () => {
      axios
        .post('http://127.0.0.1:8000/api/users', users)
        .then((response) => {
          if (response) {
            message.success("Thêm user thành công");
            router.push({ name: 'admin-users' });
          }
        })
        .catch((error) => {
          console.log(error.response)
          errors.value = error.response.data.errors
        })
    }

    return {
      departments,
      errors,
      ...toRefs(users),
      filterOption,
      createUser
    }
  }
})
</script>

<style scope>
.select-danger {
  border: 1px solid red;
}

.input-danger {
  border: 1px solid red;
}
</style>
