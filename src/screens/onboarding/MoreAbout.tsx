import { View, Text, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CustomInput, CustomButton, SuccessModal, ToastMessage } from '../../components'
import { NIGERIAFLAGICON, CARETDOWNICON, CALENDARICON } from '../../constants/icons'
import { commonStyles, COLORS, SIZES } from '../../constants/theme'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { EIGHTEENYEARSAGO } from '../../constants/data'
import { useMutation } from '@tanstack/react-query'
import { AUTH } from '../../api'

export const MoreAbout = ({ navigation, route }: any) => {
    const { email, password } = route.params;
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [nickName, setNickName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [date_of_birth, setDateOfBirth] = useState('')

    const [hasError, setHasError] = useState(false)
    const [error, setError] = useState('')

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)




    const setDate = (_: DateTimePickerEvent, date?: Date | undefined) => {

        setShowDatePicker(false)

        if (date) {
            setDateOfBirth(date.toISOString().split("T")[0])

        }
    };

    const signUpQuery = useMutation({
        mutationFn: () => {
            return AUTH.SIGNUP({
                first_name,
                last_name,
                email_address: email,
                password,
                date_of_birth: new Date(date_of_birth),
                username: nickName,
                phone_number: `+234${phone_number}`,
            })
        },
        onSuccess: async (response: any) => {
            if (response?.data?.message) {
                setError(response.data.message)
            } else {
                setShowSuccessModal(true)
            }

        }

    })

    const validateInputs = () => {
        if (!first_name || !last_name || (phone_number && phone_number.length !== 10) || !date_of_birth) {
            setHasError(true)
        } else {
            signUpQuery.mutate()
        }
    }


    return (
        <SafeAreaView style={{ ...commonStyles.screenWrapper }}>
            <View style={styles.container}>
                {error ? <ToastMessage type="error" message={error} close={() => setError('')} /> : null}

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >

                        <Text style={{ ...commonStyles.semiBoldText, fontSize: 20, marginBottom: 11 }}>Create an account</Text>
                        <Text style={{ ...commonStyles.normalText, fontSize: 15, color: COLORS['text-soft'] }}>Start building your dollar-denominated
                            investment portfolio</Text>



                        <View style={{ marginTop: 38 }}>
                            <CustomInput
                                hasError={hasError && !first_name}
                                value={first_name} setValue={setFirstName} placeholder='Legal First Name' />

                            <CustomInput
                                hasError={hasError && !last_name}

                                value={last_name} setValue={setLastName} placeholder='Legal Last Name'
                            />
                            <CustomInput
                                value={nickName} setValue={(text) => {
                                    setNickName(text)
                                }}
                                placeholder='Nick Name'
                                onEndEditing={() => {
                                    const sanitizedText = nickName.trim().replace(/\s/g, '-');
                                    setNickName(sanitizedText)

                                }}
                            />
                            <CustomInput
                                placeholderPosX={104}
                                extraData={
                                    <TouchableOpacity style={{ width: 93, flexDirection: 'row', alignItems: 'center', borderRightWidth: 1, borderRightColor: COLORS['off-white-light-stroke'], paddingRight: 20 }}>
                                        <Image source={NIGERIAFLAGICON} style={{ width: 18, height: 18, resizeMode: 'cover', borderRadius: 18 }} />
                                        <Text style={{ ...commonStyles.boldText, fontSize: 16, marginHorizontal: 8 }}>+234</Text>
                                        <Image source={CARETDOWNICON} style={{ width: 24, height: 24, resizeMode: "contain" }} />
                                    </TouchableOpacity>
                                }
                                keyboardType='phone-pad'
                                value={phone_number}
                                maxLength={10}
                                hasError={hasError && (phone_number.length > 1 && phone_number.length !== 10)}
                                setValue={setPhoneNumber} placeholder='Phone Number'
                            />
                            <CustomInput
                                hasError={hasError && !date_of_birth.length}
                                editable={false}
                                value={date_of_birth} setValue={setDateOfBirth} placeholder='Choose date' label='Date of Birth'
                                icon={CALENDARICON}
                                onIconPress={() => setShowDatePicker(true)}
                            />


                        </View>





                        <CustomButton
                            isLoading={signUpQuery.isLoading}
                            label='Continue' onPress={validateInputs} containerStyles={{ ...styles.authButton }} />

                        <Text style={{ textAlign: 'center', alignSelf: 'center', maxWidth: 212 }}>By clicking Continue, you agree to our
                            <Text onPress={() => console.log("T&C")} style={{ color: COLORS['teal-001'] }}> Terms of Service</Text> and <Text onPress={() => console.log("PP")} style={{ color: COLORS['teal-001'] }}>Privacy Policy.</Text></Text>
                    </ScrollView>

                </KeyboardAvoidingView>



            </View>

            {showSuccessModal && <SuccessModal text='You just created your Rise account' subText='Welcome to Rise, let’s take you home' onPress={() => {
                setShowSuccessModal(false)
                navigation.replace("Signin")
            }} />}

            {showDatePicker && <RNDateTimePicker
                mode='date'
                maximumDate={EIGHTEENYEARSAGO}
                value={EIGHTEENYEARSAGO}
                onChange={setDate} />}
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
        marginBottom: 27,
        marginTop: 19
    }
})
