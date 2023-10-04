<template>
  <AppModal v-model="dialog">
    <h1 v-if="!forms._id">Add Product</h1>
    <h1 v-else>Edit Product</h1>
    <form @submit.prevent="save">
      <input
        type="text"
        v-model="forms.name"
        class="form-control my-2"
        placeholder="Name" />
      <input
        type="text"
        v-model="forms.brand"
        class="form-control my-2"
        placeholder="Brand" />
      <input
        type="text"
        v-model="forms.group"
        class="form-control my-2"
        placeholder="Group" />
      <input
        type="number"
        v-model="forms.price"
        class="form-control my-2"
        placeholder="Price" />
      <input
        type="number"
        v-model="forms.arrival_price"
        class="form-control my-2"
        placeholder="ArrivalPrice" />
      <input
        type="number"
        v-model="forms.selling_price"
        class="form-control my-2"
        placeholder="SellingPrice" />

      <textarea
        cols="10"
        rows="5"
        v-model="forms.description"
        class="form-control my-2"
        placeholder="description"></textarea>
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
  brand: "",
  group: "",
  price: null,
  arrival_price: null,
  selling_price: null,
  description: "",
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
        .post("products/add", {
          name: forms.value.name,
          brand: forms.value.brand,
          group: forms.value.group,
          price: forms.value.price,
          arrival_price: forms.value.arrival_price,
          selling_price: forms.value.selling_price,
          description: forms.value.description,
        })
        .then((res) => {
          console.log(res);
          Notification("added Product", "success");

          location.reload();
        });
    } else {
      http
        .patch(`/products/update/${forms.value._id}`, {
          name: forms.value.name,
          brand: forms.value.brand,
          group: forms.value.group,
          price: forms.value.price,
          arrival_price: forms.value.arrival_price,
          selling_price: forms.value.selling_price,
          description: forms.value.description,
        })
        .then((res) => {
          console.log(res);
          Notification("updated Product", "success");

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
