import { View, Text, Image, StyleSheet, TouchableOpacity, TextStyle } from 'react-native'
import React from 'react'
import { COLORS, SIZES, commonStyles } from '../constants/theme'

interface CustomHeaderProps {
    title: string;
    icon: number;
    titleStyles?: TextStyle
    onIconPress: () => void
}
export const CustomHeader = ({ title, icon, onIconPress, titleStyles }: CustomHeaderProps) => {
    return (
        <View
            style={styles.headerContainer}
        >
            <TouchableOpacity
                onPress={onIconPress}
                style={styles.iconContainer}>
                <Image source={icon} style={styles.icon} />
            </TouchableOpacity>

            <Text style={{ ...styles.label, ...titleStyles }}>{title}</Text>

            <View style={{ width: 50 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SIZES.padding
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        backgroundColor: COLORS['off-white-003'],
        borderRadius: 36
    },
    icon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        tintColor: COLORS['teal-001']
    },
    label: {
        fontSize: 24,
        ...commonStyles.boldText

    }
})