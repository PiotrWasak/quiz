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
  <ejs-toast
    ref="toastRef"
    id="toast_pos"
    :position="{ X: 'Right', Y: 'Top' }"
    :content="toastContent"
  ></ejs-toast>
</template>

<script>
import {setData} from "@/utils/setData";
import { getDocument } from "@/utils/readData";
import user from "@/store/modules/user";
export default {
  name: "UserRolesItem",
  props: ["user"],
  data() {
    return {
      toastContent: "",
      currentRole: "",
      dropdownModel: {
        dataSource: ["user", "admin"],
        placeholder: "Wybierz rolę",
      },
    };
  },
  methods: {
    async changeRole(e) {
      const userData = await getDocument("users", this.user.data.uid);
      const isSet = await setData("users", this.user.data.uid, {
        uid: userData.uid,
        eMail: userData.eMail,
        role: e.value,
      });
      console.log(isSet);
      if (isSet) {
        this.toastContent = `Pomyślnie zaktualizowano rolę użytkownika ${userData.eMail}`;
        this.$refs.toastRef.show();
      } else {
        this.toastContent = `Wystąpił błąd przy zmianie roli użytkownika ${userData.eMail}`;
        this.$refs.toastRef.show();
      }
    },
  },
};
</script>

<style scoped></style>
