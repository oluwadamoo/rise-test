import { View, Text, SafeAreaView, Modal, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES, commonStyles } from '../constants/theme'
import { CustomButton } from './CustomButton'
import { CHECKICON } from '../constants/icons'

interface SuccessModalProps {
    text: string;
    subText: string;
    onPress: () => void
}
export const SuccessModal = ({ text, subText, onPress }: SuccessModalProps) => {
    return (
        <Modal
            transparent={true}
            animationType='fade'
        >
            <SafeAreaView style={commonStyles.screenWrapper}>
                <View style={styles.container}>

                    <View style={styles.body}>

                        <View style={styles.iconContainer}>
                            <Image source={CHECKICON} />
                        </View>

                        <Text style={{ ...styles.text, fontSize: 20, marginTop: 36, marginBottom: 4 }}>{text}</Text>
                        <Text style={{
                            ...styles.text,
                            color: COLORS['text-soft'],
                            fontSize: 15
                        }}>{subText}</Text>
                    </View>


                    <CustomButton label='Okay' onPress={onPress} containerStyles={styles.button} />

                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.7
    },
    iconContainer: {
        width: 90,
        height: 90,
        backgroundColor: COLORS['off-white-003'],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90
    },
    button: {

        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 27,
        marginTop: 'auto'
    },
    text: {
        ...commonStyles.normalText,
        maxWidth: '60%',
        textAlign: 'center'
    }
})