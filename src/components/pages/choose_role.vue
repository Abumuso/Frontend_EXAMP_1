<!-- <template>
  <AppModal v-model="dialog">
    <form>
      <select v-model="forms.role" class="form-control my-2" v-for="(role, index) in roles" :key="index">
        <option value="role">{{role}}</option>
        
      </select>
    </form>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref, watch } from "vue";
// import Notification from "../../plugins/Notification";
import http from "../../plugins/axios";
import axios from "axios";

const dialog = ref(false);
const forms = ref({
  role: "",
});
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const roles = ref([]);

const openModal = (value) => {
  if (value) forms.value = { ...value };
  dialog.value = true;
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style> -->
