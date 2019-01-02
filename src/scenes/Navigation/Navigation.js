import { createStackNavigator, createAppContainer } from "react-navigation";
import { AUTH, USER } from "./screenCases";
import { AuthScreen } from "../AuthScreen";
import { User } from "../User";

const Navigation = createStackNavigator(
  {
    [AUTH]: {
      screen: AuthScreen,
      navigationOptions: {
        header: null
      }
    },
    [USER]: {
      screen: User,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: AUTH
  }
);

export const AppContainer = createAppContainer(Navigation);
