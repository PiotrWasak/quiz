<template>
  <label for="files" class="custom-file-upload">
    <font-awesome-icon icon="file-import"></font-awesome-icon> Import
  </label>
  <input
    class="btn btn-primary"
    @change="handleFileSelect"
    type="file"
    id="files"
    name="files[]"
    multiple
  />
</template>

<script>
import { addData } from "@/utils/setData";
import { useToast } from "vue-toastification";
import { Timestamp } from "firebase/firestore";
export default {
  name: "ImportQuiz",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      uploadedJson: null,
    };
  },
  methods: {
    async importQuiz(data) {
      const docRef = await addData("quiz", data);
      if (docRef) {
        this.toast.success("Zaimportowano quiz");
      } else{
        this.toast.error("Błąd podczas importowania pliku");
      }
    },
    handleFileSelect(evt) {
      let json;
      const files = evt.target.files; // FileList object
      // files is a FileList of File objects. List some properties.
      const output = [];
      for (let i = 0, f; (f = files[i]); i++) {
        const reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = ((theFile) => {
          return (e) => {
            try {
              json = JSON.parse(e.target.result);
              json.createdAt = Timestamp.now();
              json.updatedAt = Timestamp.now();
              this.importQuiz(json);
            } catch (ex) {
              this.toast.error("Błąd podczas przetwarzania pliku");
            }
          };
        })(f);
        reader.readAsText(f);
      }
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.custom-file-upload {
  display: inline-block;
  float: right;
  background-color: transparent;
  color: #ef4f10;
  border-radius: 2px;
  padding: 2px;
  cursor: pointer;
}
.custom-file-upload:hover {
  color: #ec6e3f;
}
</style>
