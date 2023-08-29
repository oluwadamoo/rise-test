import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import { CustomButton, CustomInput } from '../../components'
import { CHECKICON, EYEICON, EYEOFFICON } from '../../constants/icons'

const PASSWORDVALIDATIONS = [
    { label: "Minimum of 8 characters", value: 'characterLen' },
    { label: "One UPPERCASE character", value: 'uppercase' },
    { label: "One unique character (e.g: !@#$%^&*?)", value: 'uniqueChar' },
];

export const CreateAccount = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [passwordValidated, setPasswordValidated] = useState({
        characterLen: false,
        uppercase: false,
        uniqueChar: false
    })

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = (email: string) => {
        return emailRegex.test(email);
    };
    const checkPassword = (str: string) => {
        var uppercaseRe = /[A-Z]/;
        var specialCharRe = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (str.length) {

            if (uppercaseRe.test(str)) {

                setPasswordValidated((prev) => ({
                    ...prev,
                    uppercase: true
                }))
            } else {
                setPasswordValidated((prev) => ({
                    ...prev,
                    uppercase: false
                }))
            }
            if (specialCharRe.test(str)) {
                setPasswordValidated((prev) => ({
                    ...prev,
                    uniqueChar: true
                }))
            } else {
                setPasswordValidated((prev) => ({
                    ...prev,
                    uniqueChar: false
                }))
            }


            if (str.length >= 8) {
                setPasswordValidated((prev) => ({
                    ...prev,
                    characterLen: true
                }))
            } else {
                setPasswordValidated((prev) => ({
                    ...prev,
                    characterLen: false
                }))
            }

        } else {
            setPasswordValidated({ characterLen: false, uppercase: false, uniqueChar: false })
        }
    };

    const validateInputs = () => {
        if (!password || !passwordValidated || !email) {
            setHasError(true)
        } else {
            navigation.navigate('MoreDetails', {
                email, password
            })
        }
    }
    return (
        <SafeAreaView style={{ ...commonStyles.screenWrapper }}>
            <View style={styles.container}>
                <ScrollView>
                    <KeyboardAvoidingView
                        behavior='padding'
                    >
                        <Text style={{ ...commonStyles.semiBoldText, fontSize: 20, marginBottom: 11 }}>Create an account</Text>
                        <Text style={{ ...commonStyles.normalText, fontSize: 15, color: COLORS['text-soft'] }}>Start building your dollar-denominated
                            investment portfolio</Text>

                        <View style={{ marginTop: 38 }}>
                            <CustomInput
                                hasError={hasError && (!email.length || !isValidEmail(email))}
                                keyboardType='email-address'
                                value={email} setValue={setEmail} placeholder='Email address' />
                            <CustomInput
                                hasError={hasError && (!password.length || (!passwordValidated.characterLen || !passwordValidated.uniqueChar || !passwordValidated.uppercase))}
                                value={password} setValue={(val) => {
                                    checkPassword(val)
                                    setPassword(val)
                                }
                                } placeholder='Password' hideText={hidePassword}
                                icon={hidePassword ? EYEICON : EYEOFFICON}
                                onIconPress={() => setHidePassword(!hidePassword)}
                            />

                            {
                                PASSWORDVALIDATIONS.map(({ label, value }, index) => {
                                    return (
                                        <View key={index} style={{ ...commonStyles.row, marginBottom: 12 }}>
                                            <View style={{ marginRight: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: passwordValidated[value as keyof typeof passwordValidated] ? COLORS['teal-001'] : 'transparent', borderWidth: 1, borderColor: hasError && !passwordValidated[value as keyof typeof passwordValidated] ? COLORS['instructive-red'] : COLORS['teal-001'] }}>
                                                {passwordValidated[value as keyof typeof passwordValidated] && <Image source={CHECKICON} style={{ tintColor: COLORS['off-white'], width: 7, height: 7 }} />}
                                            </View>
                                            <Text>{label}</Text>
                                        </View>
                                    )
                                })
                            }

                        </View>

                        <CustomButton label='Sign Up' onPress={validateInputs} containerStyles={{ ...styles.authButton }} />

                    </KeyboardAvoidingView>
                </ScrollView>
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
