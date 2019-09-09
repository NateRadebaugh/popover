import "./styles.css";
import React from "react";
import { configure } from "@storybook/react";
import { getStorybook, storiesOf } from "@storybook/react";

configure(() => {
  const { Example } = require("../examples/basic.example.js");
  storiesOf("Popover", module).add("Basic", () => <Example />);
}, module);

export { getStorybook };
