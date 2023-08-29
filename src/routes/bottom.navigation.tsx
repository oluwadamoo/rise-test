import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react'
import { BottomTabIcon } from '../components';
import { FEEDICON, HOMEICON, PLANSICON, USERICON, WALLETICON } from '../constants/icons';
import { HomeStack } from './stacks';
import { Account } from '../screens/account';
import { Feed } from '../screens/feed';
import { Wallet } from '../screens/wallet';
import { Plan } from '../screens/plans';

const BottomTabs = createBottomTabNavigator()
const BottomNavigation = () => {
    return (
        <BottomTabs.Navigator

            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    ...styles.tabBarContainer
                }
            }}
        >

            <BottomTabs.Screen
                name='HomeTab'
                component={HomeStack}
                options={{

                    tabBarIcon: ({ focused }) => (
                        <BottomTabIcon label='Home' focused={focused} icon={HOMEICON} />

                    )

                }}
            />


            <BottomTabs.Screen
                name='PlanTab'
                component={Plan}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabIcon label='Plans' focused={focused} icon={PLANSICON} />

                    )

                }}
            />


            <BottomTabs.Screen
                name='WalletTab'
                component={Wallet}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabIcon label='Wallet' focused={focused} icon={WALLETICON} />

                    )

                }}
            />
            <BottomTabs.Screen
                name='FeedTab'
                component={Feed}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabIcon label='Feed' focused={focused} icon={FEEDICON} />

                    )

                }}
            />
            <BottomTabs.Screen
                name='Account'
                component={Account}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabIcon label='Account' focused={focused} icon={USERICON} />

                    )

                }}
            />
        </BottomTabs.Navigator>
    )
}


const styles = StyleSheet.create({
    tabBarContainer: {
        minHeight: 90,
        // paddingVertical: 20
    }
})
export default BottomNavigation