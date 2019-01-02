/** @format */

import { AppRegistry } from "react-native";
import { AppContainer } from "./src/index";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => AppContainer);
