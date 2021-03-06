import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer(
    createStackNavigator({
        Login,
        Main
    },{
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
    })
);