<template>
  <AddProduct ref="products_modal" />
  <div class="button-top">
    <button @click="logOut">log out</button>
    <button @click="createItem">Add Product</button>
  </div>
  <div class="products">
    <div class="products__item">
      <div class="products__item-table">
        <AppTable :headers="headers" :body="products">
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
import AddProduct from "../../components/pages/create_product.vue";

const products_modal = ref();

const products = ref([]);
const headers = ref([
  { title: "Name", value: "name" },
  { title: "Brand", value: "brand" },
  { title: "Group", value: "group" },
  { title: "Price", value: "price" },
  { title: "ArrivalPrice", value: "arrival_price" },
  { title: "SellingPrice", value: "selling_price" },
  { title: "Description", value: "description" },
  { title: "Action", value: "action" },
]);
const getProducts = () => {
  http
    .get("products")
    .then((res) => {
      products.value = res.data.products;
    })
    .catch((err) => {
      console.log(err);
    });
};
const createItem = () => {
  products_modal.value.openModal();
};
const editItem = (item) => {
  products_modal.value.openModal(item);
};
const deleteItem = (id) => {
  http
    .delete(`/products/${id}`)
    .then((res) => {
      console.log(res);
      Notification("deleted Product", "success");

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
getProducts();
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
