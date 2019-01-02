import { createStackNavigator, createAppContainer } from "react-navigation";
import { AUTH, USER } from './screenCases'

const Navigation = createStackNavigator(
  {
    [AUTH]: {
      screen: Auth,
      navigationOptions: {
        header: null
      }
    },
    [USER]: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: AUTH
  }
);

export default createAppContainer(Navigation)