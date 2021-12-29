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
      <e-column field="data.eMail" headerText="E-mail"></e-column>
      <e-column field="data.role" headerText="Rola" editType= 'dropdownedit' :edit='dropdownParams'></e-column>
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
      dropdownParams: { params: { value: 'user' } },
    };
  },
  async created() {
    this.usersData = await getData("users");
    console.log(this.usersData);
    this.isDataLoaded = true;
  },
};
</script>

<style scoped></style>
