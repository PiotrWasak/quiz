<template>
  <div class="row">
    <div class="col-4">{{ user.data.eMail }}</div>
    <div class="col-4">
      <ejs-inplaceeditor
        id="role"
        type="DropDownList"
        mode="Inline"
        :value="user.data.role"
        :model="dropdownModel"
        :actionSuccess="changeRole"
        v-model="currentRole"
      ></ejs-inplaceeditor>
    </div>
  </div>
</template>

<script>
import { setData } from "@/utils/setData";
import { getDocument } from "@/utils/readData";
import user from "@/store/modules/user";
import { useToast } from "vue-toastification";

export default {
  name: "UserRolesItem",
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: ["user"],
  data() {
    return {
      currentRole: "",
      dropdownModel: {
        dataSource: ["user", "admin"],
        placeholder: "Wybierz rolę",
      },
    };
  },
  methods: {
    async changeRole(e) {
      console.log(this.user.data.uid);
      const userData = await getDocument("users", this.user.data.uid);
      console.log(userData);
      const isSet = await setData("users", this.user.data.uid, {
        uid: userData.uid,
        eMail: userData.eMail,
        role: e.value,
      });
      if (isSet) {
        this.toast.success(`Zaktualizowano rolę użytkownika ${userData.eMail}`);
      } else {
        this.toast.error("Wystąpił błąd przy próbie zmiany roli")
      }
    },
  },
};
</script>

<style scoped></style>
