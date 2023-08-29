import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

interface IconProps {
    focused: boolean;
    icon: number;
    label: string;
}
export const BottomTabIcon = ({ focused, icon, label }: IconProps) => {
    return (
        <View style={styles.tabIconContainer}>
            {label !== 'Account' && (
                <View style={styles.iconContainer}>
                    <Image source={icon} style={{ ...styles.icon, tintColor: focused ? COLORS['teal-001'] : COLORS['text-004'] }} />
                </View>
            )}
            {label === 'Account' && <Image source={icon} style={{ ...styles.icon, width: 24, height: 24, marginBottom: 6 }} />}

            {focused ? <View style={{ width: 8.5, height: 8.5, marginTop: 6.03, borderRadius: 8, backgroundColor: COLORS['teal-001'] }} /> : <Text style={{ fontFamily: 'dm-sans', color: COLORS['text-004'] }}>{label}</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    tabIconContainer: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    }
})