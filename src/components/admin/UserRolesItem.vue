<template>
  <div class="row">
    <div class="col-4">{{ JSON.parse(userData.data.userData).email }}</div>
    <div class="col-4">
      <ejs-inplaceeditor
        id="role"
        type="DropDownList"
        mode="Inline"
        :value="userData.data.role"
        :model="dropdownModel"
        :actionSuccess= "changeRole"
        v-model="currentRole"
      ></ejs-inplaceeditor>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserRolesItem",
  props: ['userData'],
  data(){
    return{
      currentRole: '',
      dropdownModel: {
        dataSource: ["user", "admin"],
        placeholder: "Wybierz rolę",
      },
    }
  },
  methods: {
    changeRole(e) {
      console.log(e.value);
    },
  },
};
</script>

<style scoped></style>
