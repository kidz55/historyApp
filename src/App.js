import HomeScreen from './screens/HomeScreen';
import Game from './screens/game';
import End from './screens/end';
import Purchase from './screens/purchase';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Game: {
      screen: Game,
    },
    End: {
      screen: End,
    },
    Purchase: {
      screen: Purchase,
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
