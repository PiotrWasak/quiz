import { useToast } from "vue-toastification";

export const toastMixin = {
  setup() {
    const toast = useToast();
    return { toast };
  },
};
