import { createStackNavigator, createAppContainer } from "react-navigation";
import { AUTH, USER } from './screenCases'
import Auth from '../AuthScreen/AuthScreen'

const Navigation = createStackNavigator(
  {
    [AUTH]: {
      screen: Auth,
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