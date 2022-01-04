import { createApp } from "vue/dist/vue.esm-bundler";

const dateApp = createApp();

export const dateTemplate = () => {
  return {
    template: dateApp.component("dateTemplate", {
      data: () => ({}),
      template: `{{ new Intl.DateTimeFormat("pl-PL", {dateStyle: "short" , timeStyle: "short"}).format(data.data.createdAt.toDate()) }}`,
      //template: '<strong>test</strong>'
    }),
  };
};
