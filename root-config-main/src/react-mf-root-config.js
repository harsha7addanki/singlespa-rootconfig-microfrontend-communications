import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine,
} from "single-spa-layout";
import { registerApplication, start } from "single-spa";


class MakeshiftEvent {
  constructor() {
    this.handlers = [];
  }
  addEventListener(handler) {
    this.handlers.push(handler);
  }
  removeEventListener(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }
  dispatchEvent(event) {
    this.handlers.forEach((h) => h(event));
  }
}


const clickEvent = new MakeshiftEvent();

const routes = constructRoutes(document.querySelector("#single-spa-layout"), {
  loaders: {
    topNav: "<h1>Loading topnav</h1>",
  },
  errors: {
    topNav: "<h1>Failed to load topnav</h1>",
  },
});
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => import(/* webpackIgnore: true */ name),
});
// Delay starting the layout engine until the styleguide CSS is loaded
const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false,
});

applications.map((mfe) => registerApplication({
  ...mfe,
  customProps: {
    clickEvent
  }
}))

clickEvent.addEventListener(() => {
  alert("Button clicked in navbar");
});

import(/* webpackIgnore: true */ "@react-mf/styleguide").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  start();
});
