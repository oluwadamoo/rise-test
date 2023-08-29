import { View, Text, SafeAreaView, Alert } from 'react-native'
import React from 'react'
import { commonStyles } from '../../constants/theme'
import { CustomButton } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Account = ({ navigation }: any) => {

    const logout = async () => {
        Alert.alert("Are you sure you want to logout?", "", [
            {
                text: "Yes",
                async onPress(value) {
                    try {
                        await AsyncStorage.clear()

                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: "Onboarding",
                                    state: {
                                        routes: [
                                            {
                                                name: "Signin",

                                            }
                                        ]
                                    }
                                }
                            ]
                        })

                    } catch (error) {
                        console.log(error)
                    }
                },
            },
            {
                text: 'No, just kidding',
                onPress() {
                    return null
                }
            }
        ])

    }
    return (
        <SafeAreaView style={{ ...commonStyles.screenWrapper }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...commonStyles.boldText, fontSize: 20, textAlign: 'center' }}>Unavailable</Text>

                <CustomButton label={'Logout'} onPress={logout}
                />
            </View>
        </SafeAreaView>
    )
}
