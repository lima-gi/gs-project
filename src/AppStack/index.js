import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../pages/Home';
import ListFoods from '../pages/ListFoods';

const { Navigator, Screen } = createStackNavigator()

function AppStack() {
    return (
        <NavigationContainer >
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name='Home' component={Home} />
                <Screen name='ListFoods' component={ListFoods} />
            </Navigator>
        </NavigationContainer>

    )
}
5
export default AppStack