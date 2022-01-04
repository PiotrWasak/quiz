<template>
  <ejs-grid
    v-if="isDataLoaded"
    ref="userRolesGrid"
    :dataSource="usersData"
    :allowSorting="true"
    :toolbar="toolbarOptions"
    :allowPaging="true"
    :editSettings="editSettings"
    locale="pl"
  >
    <e-columns>
      <e-column
        :isPrimaryKey="true"
        field="eMail"
        headerText="E-mail"
      ></e-column>
      <e-column
        field="role"
        headerText="Rola"
        editType="dropdownedit"
      ></e-column>
    </e-columns>
  </ejs-grid>
  <div v-else>
    <base-spinner></base-spinner>
  </div>
</template>

<script>
import { getData } from "../../utils/readData";
import BaseSpinner from "../UI/BaseSpinner";

export default {
  name: "UserRolesGrid",
  components: { BaseSpinner },
  data() {
    return {
      usersData: [],
      isDataLoaded: false,
      toolbarOptions: ["Search", "Print", "Edit", "Update"],
      editSettings: { allowEditing: true, mode: "Normal" },
      //dropdownParams: { params: { value: this.userRoles} },
      //userRoles: ["admin", "user"],
    };
  },
  methods: {},
  async created() {
    let usersData = [];
    const data = await getData("users");
    data.forEach((data) => {
      usersData.push(data.data);
    });
    this.usersData = usersData;
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
