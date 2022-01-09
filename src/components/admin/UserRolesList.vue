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
    :actionComplete="editCell"
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
import { setData } from "@/utils/setData";
import { useToast } from "vue-toastification";
export default {
  name: "UserRolesGrid",
  components: { BaseSpinner },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      usersData: [],
      isDataLoaded: false,
      toolbarOptions: ["Search", "Edit", "Update"],
      editSettings: { allowEditing: true, mode: "Normal" },
    };
  },
  methods: {
    async editCell(args) {
      if (args?.previousData?.role !== args?.data?.role) {
        const status = await setData("users", args.data.uid, args.data);
        if (status) {
          this.toast.success(
            "Zaktualizowano rolę użytkownika " + args.data.eMail
          );
        } else {
          this.toast.error("Wystąpił błąd przy próbie zmiany roli");
        }
      }
    },
  },
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
