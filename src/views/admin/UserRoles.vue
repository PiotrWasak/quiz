<template>
  <div class="container mt-5">
    User roles
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
export default {
  name: "UserRoles",
  components: { UserRolesItem },
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
