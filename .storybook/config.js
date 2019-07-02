import { configure } from "@storybook/react";

const req = require.context("../src", true, /\.story\.(jsx|tsx)$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
