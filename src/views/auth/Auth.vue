<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center">Login</h1>
          </div>
          <div class="card-body">
            <Form @submit="save" id="auth">
              <label for="username">Username</label>
              <Field
                rules="required"
                :modelValue="form.username"
                v-slot="{ errors }"
                name="Username">
                <input
                  type="text"
                  v-model="form.username"
                  placeholder="Name"
                  class="form-control my-2" />
                <p class="text-danger" v-if="errors && errors.length">
                  {{ errors[0] }}
                </p>
              </Field>
              <label for="password">Password</label>
              <Field
                rules="required"
                :modelValue="form.password"
                v-slot="{ errors }"
                name="Password">
                <input
                  type="password"
                  v-model="form.password"
                  placeholder="Password"
                  class="form-control my-2" />
                <p class="text-danger" v-if="errors && errors.length">
                  {{ errors[0] }}
                </p>
              </Field>
            </Form>
            <button type="submit" form="auth">save</button>
          </div>
          <div class="card-footer">
            <!-- <Button :title="'success'" @click="save">save</Button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import http from "@/plugins/axios";
import { Form, Field } from "vee-validate";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});

// const roles_modal = ref();

const save = () => {
  http
    .post("admins/login", {
      username: form.value.username,
      password: form.value.password,
    })
    .then((res) => {
      // roles.value = res.data;
      // console.log(roles);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (form.value.username == "admin") {
          router.push({ name: "admin" });
        } else if (form.value.username == "superadmin") {
          router.push({ name: "superadmin" });
        } else {
          alert("username or password is incorrect");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="scss" scoped></style>
