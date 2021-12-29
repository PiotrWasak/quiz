<template>
  <div class="container mt-5">
    <h4 class="text-center"><font-awesome-icon icon="user-tag"></font-awesome-icon> Role użytkowników</h4>
    <user-roles-grid></user-roles-grid>
    <user-roles-item
      v-for="userData in usersData"
      :key="userData.id"
      :user="userData"
    >
    </user-roles-item>
  </div>
</template>

<script>
import { getData } from "@/utils/readData";
import UserRolesItem from "@/components/admin/UserRolesItem";
import UserRolesGrid from "../../components/admin/UserRolesGrid";
export default {
  name: "UserRoles",
  components: { UserRolesGrid, UserRolesItem },
  data() {
    return {
      usersData: {},
    };
  },
  async created() {
    this.usersData = await getData("users");
  },
};
</script>

<style scoped></style>
