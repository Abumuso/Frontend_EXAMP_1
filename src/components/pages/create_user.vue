<template>
  <AppModal v-model="dialog">
    <h1 v-if="!forms._id">Add User</h1>
    <h1 v-else>Edit User</h1>
    <form @submit.prevent="save">
      <input
        type="text"
        v-model="forms.name"
        class="form-control my-2"
        placeholder="Name" />
      <input
        type="text"
        v-model="forms.surname"
        class="form-control my-2"
        placeholder="Surname" />
      <input
        type="number"
        v-model="forms.age"
        class="form-control my-2"
        placeholder="Age" />
      <input
        type="text"
        v-model="forms.is_diploma"
        class="form-control my-2"
        placeholder="Is_diploma" />
      <input
        type="text"
        v-model="forms.address"
        class="form-control my-2"
        placeholder="Address" />
      <button class="btn btn-info">save</button>
    </form>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref, watch } from "vue";
import Notification from "../../plugins/Notification";
import http from "../../plugins/axios";

const dialog = ref(false);
const forms = ref({
  name: "",
  surname: "",
  age: null,
  is_diploma: false,
  address: "",
});
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const openModal = (value) => {
  console.log("forms: ", value);
  if (value) forms.value = { ...value };
  dialog.value = true;
};

const save = (e) => {
  e.preventDefault();
  try {
    if (!forms.value._id) {
      http
        .post("users/add", {
          name: forms.value.name,
          surname: forms.value.surname,
          age: forms.value.age,
          is_diploma: forms.value.is_diploma == "true" ? true : false,
          address: forms.value.address,
        })
        .then((res) => {
          console.log(res);
          Notification("added User", "success");

          location.reload();
        });
    } else {
      http
        .patch(`/users/update/${forms.value._id}`, {
          name: forms.value.name,
          surname: forms.value.surname,
          age: forms.value.age,
          is_diploma: forms.value.is_diploma == "true" ? true : false,
          address: forms.value.address,
        })
        .then((res) => {
          console.log(res);
          Notification("updated User", "success");

          location.reload();
        });
    }
  } catch (err) {
    console.log(err);
  }
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
