<script setup>
import TheNavbar from "./components/Layout/TheNavbar.vue";
import store from "./store";
import {
  Grid,
  Page,
  Search,
  Sort,
  Toolbar,
  Group,
  Edit,
  CommandColumn,
} from "@syncfusion/ej2-vue-grids";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import { locale } from "./components/Syncfusion/pl.json";
L10n.load(locale);
setCulture("pl");

Grid.Inject(Sort, Page, Toolbar, Search, Group, Edit, CommandColumn);
</script>

<template>
  <the-navbar v-if="store.getters.userData"></the-navbar>
  <router-view></router-view>
</template>

<style>
.ext-secondary {
  color: #ef4f10;
}

.e-grid {
  border-color: #ef4f10;
}

.e-grid .e-toolbar-items {
  border-top: 1px solid #ef4f10;
}

.e-btn.e-primary {
  background-color: #ef4f10;
}
.e-btn.e-primary:focus {
  background-color: #ef4f10;
}

.e-btn.e-primary:hover {
  background-color: transparent;
  border-color: #ef4f10;
  color: #ef4f10;
  box-shadow: none !important;
}

.e-btn.e-warning,
.e-css.e-btn.e-warning {
  background-color: #ef4f10;
  border-color: transparent;
  color: #fff;
}

.e-btn.e-outline.e-primary,
.e-css.e-btn.e-outline.e-primary {
  background-color: transparent;
  border-color: #ef4f10;
  color: #ef4f10;
}

.e-btn.e-outline.e-primary:hover,
.e-css.e-btn.e-outline.e-primary:hover {
  background-color: #ef4f10;
  border-color: transparent;
  color: #fff;
}

.e-grid .e-groupdroparea {
  background-color: #ef4f10 !important;
  color: #f8f9fa !important;
}

.e-grid .e-groupheadercell {
  background-color: #f8f9fa !important;
  color: #ef4f10 !important;
}

.e-grid .e-groupheadercell span {
  color: #ef4f10 !important;
}

.e-grid .e-grouped {
  background-color: #ef4f10;
  color: #f8f9fa;
}

.e-grid .e-gridpager .e-currentitem {
  background-color: #ef4f10;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #ef4f10;
}

.e-card-title {
  color: #ef4f10 !important;
}

.spinner-container {
  height: calc(100vh - 16em);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-inplace-editor/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-notifications/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-layouts/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
</style>
