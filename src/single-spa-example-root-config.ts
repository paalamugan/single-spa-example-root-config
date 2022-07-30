import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

import {
  mfInitialLoading,
  mfInitialLoadingFailed,
} from "@single-spa-example/react-styleguide";

const routes = constructRoutes(microfrontendLayout, {
  loaders: {
    header: mfInitialLoading("Loading header..."),
    home: mfInitialLoading("Loading home..."),
    footer: mfInitialLoading("Loading footer..."),
  },
  props: {},
  errors: {
    header: mfInitialLoadingFailed("Failed to load header"),
    home: mfInitialLoadingFailed("Failed to load home"),
    footer: mfInitialLoadingFailed("Failed to load footer"),
  },
});

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false,
});

applications.forEach(registerApplication);

System.import("@single-spa-example/react-styleguide").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  start();
});
