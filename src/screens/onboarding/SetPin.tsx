import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import { CustomButton, SuccessModal } from '../../components'
import { TEXTDELETEICON } from '../../constants/icons'


const KEYPAD = [
    {
        label: '1',
        value: '1'
    },
    {
        label: '2',
        value: '2'
    },
    {
        label: '3',
        value: '3'
    },
    {
        label: '4',
        value: '4'
    },
    {
        label: '5',
        value: '5'
    },
    {
        label: '6',
        value: '6'
    },
    {
        label: '7',
        value: '7'
    },
    {
        label: '8',
        value: '8'
    },
    {
        label: '9',
        value: '9'
    },
    {
        label: '.',
        value: '.'
    },
    {
        label: '0',
        value: '0'
    },
    {
        label: TEXTDELETEICON,
        value: 'del'
    },
]
export const SetPin = ({ navigation }: any) => {
    const [pin, setPin] = useState(new Array(6).fill(''))
    const [showSuccessModal, setShowSuccessModal] = useState(false)



    return (
        <SafeAreaView style={{ ...commonStyles.screenWrapper }}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ ...commonStyles.semiBoldText, fontSize: 20, marginBottom: 11 }}>Create a 6-digit PIN</Text>
                    <Text style={{ ...commonStyles.normalText, fontSize: 15, color: COLORS['text-soft'] }}>You’ll use this PIN to sign in and confirm transactions</Text>

                    <View style={styles.pinContainer}>
                        {
                            pin.map((p, i) => (
                                <TextInput
                                    key={i}
                                    style={{ ...styles.pin, borderColor: p ? COLORS['teal-001'] : COLORS.border, borderWidth: p ? 2 : 1 }}
                                    value={p ? '.' : ''}
                                    editable={false} />))
                        }
                    </View>

                    <View style={{ marginTop: 100, flexDirection: 'row', flexWrap: 'wrap', }}>
                        {KEYPAD.map((item, index) => (
                            <View style={{
                                width: '33.33%',
                                alignItems: 'center'
                            }} key={index}>
                                <TouchableOpacity

                                    onPress={() => {
                                        if (item.value === 'del') {
                                            const updatedPin = [...pin];
                                            const lastFilledIndex = updatedPin.indexOf('');
                                            const lastIndexFilled = updatedPin[updatedPin.length - 1] != ''
                                            if ((lastFilledIndex !== -1 && lastFilledIndex > 0) || lastIndexFilled) {
                                                if (!lastIndexFilled) {
                                                    updatedPin[lastFilledIndex - 1] = '';
                                                    setPin(updatedPin);
                                                } else {
                                                    updatedPin[updatedPin.length - 1] = ''
                                                    setPin(updatedPin);
                                                }
                                            }
                                        } else {
                                            const emptyIndex = pin.indexOf('');
                                            if (emptyIndex !== -1) {
                                                const updatedPin = [...pin];
                                                updatedPin[emptyIndex] = item.label;
                                                setPin(updatedPin);
                                            }
                                        }
                                    }}
                                    style={{ marginBottom: 24, ...styles.keypad }}>
                                    {item.value === 'del' ?
                                        <Image source={item.label} style={{ width: 29, height: 23, resizeMode: 'contain' }} /> :
                                        <Text style={{ ...commonStyles.boldText, fontSize: 30, color: COLORS['teal-001'] }}>{item.label}</Text>}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>


                    <CustomButton label='Okay' onPress={() => {
                        if (!pin.includes('')) {
                            setShowSuccessModal(true)
                        }
                    }} containerStyles={styles.authButton} />

                    <CustomButton
                        label='Later' onPress={() => navigation.replace("BottomTab")
                        } containerStyles={{ ...styles.authButton, backgroundColor: 'transparent' }} labelStyles={{ ...commonStyles.darkText, color: COLORS['teal-001'] }} />

                </ScrollView>

            </View>

            {showSuccessModal && <SuccessModal text='You’ve created your PIN' subText='Keep your account safe with your secret PIN. Do not share this PIN with anyone.' onPress={() => {
                setShowSuccessModal(false)
                navigation.replace("BottomTab")
            }} />}

        </SafeAreaView >
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
    },
    pinContainer: {
        marginTop: 38,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pin: {
        width: 42,
        height: 42,
        borderWidth: 1,
        borderColor: COLORS['off-white-light-stroke'],
        borderRadius: 5,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        ...commonStyles.xBoldText,
        color: COLORS['text-black'],
        fontSize: 20

    },
    keypad: {
        width: 72,
        maxWidth: 72,

        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS['off-white-003'],
        borderRadius: 40,
    }
})
