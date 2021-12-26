<template>
  <div id="target" class="control-section" @click.self="dlgButtonCancel">
    <ejs-dialog
      ref="baseDialog"
      :target="target"
      :width="width"
      :content="content"
      :animationSettings="animationSettings"
      :buttons="buttons"
      :isModal="true"
      :visible="false"
      :closeOnEscape="true"
    >
    </ejs-dialog>
  </div>
</template>

<script>
export default {
  name: "BaseDialog",
  props: {
    content: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      target: "#target",
      width: "335px",
      buttons: [
        {
          click: this.confirm,
          buttonModel: { content: "Tak", isPrimary: true },
        },
        { click: this.dlgButtonCancel, buttonModel: { content: "Anuluj" } },
      ],
      animationSettings: { effect: "Fade" },
    };
  },
  methods: {
    showDialog() {
      this.$refs.baseDialog.show();
    },
    dlgButtonCancel: function () {
      this.$refs.baseDialog.hide();
    },
    confirm() {
      this.$emit("confirm");
      this.dlgButtonCancel();
    },
  },
};
</script>

<style scoped></style>
