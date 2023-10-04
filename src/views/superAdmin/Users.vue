<template>
  <AddUser ref="users_modal" />
  <div class="button-top">
    <button @click="logOut">log out</button>
    <button @click="createItem">Add User</button>
  </div>
  <div class="users">
    <div class="users__item">
      <div class="users__item-table">
        <AppTable :headers="headers" :body="users">
          <template #body_action="{ item }">
            <div class="button">
              <button class="btn btn-danger" @click="deleteItem(item._id)">
                delete
              </button>
              <button class="btn btn-info" @click="editItem(item)">edit</button>
            </div>
          </template>
          <!-- <template #body_address="{ item }">
            <span>{{ item.address }}</span>
          </template> -->
        </AppTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppTable from "../../components/ui/app-table.vue";
import http from "../../plugins/axios";
import AddUser from "../../components/pages/create_user.vue";

const users_modal = ref();

const users = ref([]);
const headers = ref([
  { title: "Name", value: "name" },
  { title: "Surname", value: "surname" },
  { title: "Age", value: "age" },
  { title: "Is_diploma", value: "is_diploma" },
  { title: "Address", value: "address" },
  { title: "Action", value: "action" },
]);
const getUsers = () => {
  http
    .get("users")
    .then((res) => {
      users.value = res.data.users;
    })
    .catch((err) => {
      console.log(err);
    });
};
const createItem = () => {
  users_modal.value.openModal();
};
const editItem = (item) => {
  users_modal.value.openModal(item);
};
const deleteItem = (id) => {
  http
    .delete(`/users/${id}`)
    .then((res) => {
      console.log(res);
      Notification("updated User", "success");

      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};
const logOut = () => {
  localStorage.removeItem("token");
  location.reload();
};
getUsers();
</script>

<style lang="scss" scoped>
.users {
  width: 100%;
  min-height: 100vh;
}
.button-top {
  margin-left: 20px;
  display: flex;
  gap: 20px;
}
.button-top button {
  width: 150px;
  height: 30px;
  background-color: yellow;
  border-radius: 10px;
}
.button {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.btn {
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
