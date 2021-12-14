<template>
  <div class="container mt-5">
    User roles
    <button @click="getUsersData" class="btn btn-primary">GET</button>
    <user-roles-item v-for="userData in usersData" :key="userData.id" :user="userData">

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
  methods: {
    getUsersData() {
      console.log(this.usersData);
     // console.log(JSON.parse(this.usersData[0].data.userData).uid);
    },
  },
  computed: {},
  mounted() {
    const getUsersData = async () => {
      this.usersData = await getData("users");
    };
    getUsersData();
  },
};
</script>

<style scoped></style>
