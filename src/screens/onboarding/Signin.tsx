import { View, Text, StyleSheet, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CustomInput, CustomButton, ToastMessage } from '../../components'
import { EYEICON, EYEOFFICON } from '../../constants/icons'
import { commonStyles, COLORS, SIZES } from '../../constants/theme'
import { useMutation } from '@tanstack/react-query'
import { AUTH } from '../../api'
import { storeData } from '../../utils/store-retrieve-data'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../store/user.reducer'

export const Signin = ({ navigation }: any) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [error, setError] = useState('')

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = (email: string) => {
        return emailRegex.test(email);
    };

    const signinQuery = useMutation({
        mutationFn: () => {
            return AUTH.SIGNIN({
                email_address: email,
                password,
            })
        },
        onSuccess: async (response: any) => {
            if (response?.data?.message) {
                setError(response.data.message)
            } else {
                dispatch(updateUser(response.data))
                storeData({ key: "@authToken", value: response.data.token })

                navigation.replace("SetPin")
            }


        }

    })

    const validateInputs = () => {
        if (!password || !email) {
            setHasError(true)
        } else {
            signinQuery.mutate()
        }
    }



    return (
        <SafeAreaView style={{ ...commonStyles.screenWrapper }}>
            <View style={styles.container}>
                {error ? <ToastMessage type="error" message={error} close={() => setError('')} /> : null}

                <ScrollView>
                    <KeyboardAvoidingView
                        behavior='padding'
                    >
                        <Text style={{ ...commonStyles.semiBoldText, fontSize: 20, marginBottom: 11 }}>Welcome back</Text>
                        <Text style={{ ...commonStyles.normalText, fontSize: 15, color: COLORS['text-soft'] }}>Let’s get you logged in to get back to building your dollar-denominated investment portfolio.</Text>

                        <View style={{ marginTop: 38 }}>
                            <CustomInput
                                hasError={hasError && (!email.length || !isValidEmail(email))}
                                keyboardType='email-address'
                                value={email} setValue={setEmail} placeholder='Email address' />


                            <CustomInput
                                hasError={hasError && (!password.length)}

                                value={password} setValue={setPassword} placeholder='Password' hideText={hidePassword}
                                icon={hidePassword ? EYEICON : EYEOFFICON}
                                onIconPress={() => setHidePassword(!hidePassword)}
                            />


                        </View>

                        <CustomButton label='Sign In'
                            isLoading={signinQuery.isLoading}
                            onPress={validateInputs} containerStyles={{ ...styles.authButton }} />
                        <CustomButton
                            disabled={signinQuery.isLoading}
                            label='I forgot my password' onPress={() => console.log("FORGOT PASSWORD")} containerStyles={{ ...styles.authButton, backgroundColor: 'transparent' }} labelStyles={{ ...commonStyles.darkText, color: COLORS['teal-001'] }} />

                    </KeyboardAvoidingView>
                </ScrollView>

                <Text
                    disabled={signinQuery.isLoading}
                    style={{ marginTop: 'auto', fontSize: 15, ...commonStyles.boldText, color: COLORS['text-soft'], textAlign: 'center' }}>Don't have an account? <Text
                        onPress={() => navigation.navigate("CreateAccount")}
                        style={{ color: COLORS['teal-001'] }}>Sign up</Text></Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
        paddingTop: 75
    },
    authButton: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 19
    }
})
