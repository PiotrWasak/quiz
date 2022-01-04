<template>
  <div class="container mt-5">
    <h4 class="text-center">
      <font-awesome-icon icon="user-tag"></font-awesome-icon> Role użytkowników
    </h4>
    <user-roles-grid></user-roles-grid>
  </div>
</template>

<script>
import { getData } from "@/utils/readData";
import UserRolesGrid from "../../components/admin/UserRolesList";
export default {
  name: "UserRoles",
  components: { UserRolesGrid },
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
