
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useState } from 'react'
import BottomNavigation from './bottom.navigation';
import OnboardingStack from './stacks/onboarding.stack.navigation';
import { getData } from '../utils/store-retrieve-data';
import { useNavigation, } from '@react-navigation/native';


const RootStack = createNativeStackNavigator()
const RootNavigation = () => {
    const navigation: any = useNavigation()

    const [token, setToken] = useState('');

    const getToken = async () => {
        let token = await getData({ key: '@authToken' })
        if (token) {
            setToken(token)
        }
    }

    React.useEffect(() => {
        getToken();
    }, []);
    React.useEffect(() => {
        if (token) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTab' }]
            });
        }
    }, [token])
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <RootStack.Screen name='Onboarding' component={OnboardingStack} />

            <RootStack.Screen name='BottomTab' component={BottomNavigation} />

        </RootStack.Navigator>
    )
}

export default RootNavigation