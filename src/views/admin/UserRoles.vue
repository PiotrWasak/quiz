<template>
  <div class="container mt-5">User roles
    <button @click="getUsersData" class="btn btn-primary">GET</button>
    <div class="row" v-for="userData in usersData" :key="userData.role">
      <div class="col-4">{{ JSON.parse(userData.data.userData).email}}</div>
      <div class="col-4">{{userData.data.role}}</div>
    </div>
  </div>

</template>

<script>
import getData from "@/utils/readData";
export default {
  name: "UserRoles",
  data() {
    return {
      usersData: {},
    };
  },
  methods: {
    getUsersData() {
      console.log(JSON.parse(this.usersData[0].data.userData).uid);
    }
  },
  computed: {
  },
  mounted() {
    const getUsersData = async () => {
      this.usersData = await getData("users");
    }
    getUsersData();
  },
};
</script>

<style scoped></style>
