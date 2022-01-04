import { createApp } from "vue/dist/vue.esm-bundler";

const app = createApp();


export const dateTemplate = app.component("dateColTemplate", {
  data: () => ({}),
  template: `{{ new Intl.DateTimeFormat("pl-PL", {dateStyle: "short" , timeStyle: "short"}).format(data.data.createdAt.toDate()) }}`,
});
