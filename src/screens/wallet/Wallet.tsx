import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { commonStyles } from '../../constants/theme'

export const Wallet = () => {
    return (
        <SafeAreaView style={{ ...commonStyles.screenWrapper }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...commonStyles.boldText, fontSize: 20, textAlign: 'center' }}>Unavailable</Text>
            </View>
        </SafeAreaView>
    )
}
