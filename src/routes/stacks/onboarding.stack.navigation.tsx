
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreateAccount, MoreAbout, SetPin, Signin, Welcome } from '../../screens/onboarding'

const OnboardingStackNav = createNativeStackNavigator()

const OnboardingStack = () => {
    return (
        <OnboardingStackNav.Navigator
            initialRouteName='Welcome'
            screenOptions={{
                headerShown: false
            }}
        >
            <OnboardingStackNav.Screen name='Welcome' component={Welcome} />
            <OnboardingStackNav.Screen name='CreateAccount' component={CreateAccount} />
            <OnboardingStackNav.Screen name='SetPin' component={SetPin} />
            <OnboardingStackNav.Screen name='Signin' component={Signin} />
            <OnboardingStackNav.Screen name='MoreDetails' component={MoreAbout} />
        </OnboardingStackNav.Navigator>
    )
}

export default OnboardingStack