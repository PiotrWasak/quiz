<template>
  <ejs-grid
    v-if="isDataLoaded"
    ref="userRolesGrid"
    :dataSource="usersData"
    :allowSorting="true"
    :toolbar="toolbarOptions"
    :allowPaging="true"
    :allowGrouping="true"
    :editSettings="editSettings"
    locale="pl"
  >
    <e-columns>
      <e-column field="eMail" headerText="E-mail"></e-column>
      <e-column
        field="role"
        headerText="Rola"
        editType="dropdownedit"
        :edit="dropdownParams"
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
      toolbarOptions: ["Search", "Print", "Edit"],
      editSettings: { allowEditing: true },
      //dropdownParams: { params: { value: this.userRoles} },
      userRoles: ["admin", "user"],
    };
  },
  async created() {
    let testData = [];
    this.usersData = await getData("users");
    this.usersData.forEach(data => {
      testData.push(data.data);
    })
    this.usersData = testData;
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
