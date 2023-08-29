import { View, Text, Animated, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SIZES, COLORS, commonStyles } from '../constants/theme';
import { CLOSEICON, SADEMOJIICON, SUCCESSEMOJIICON } from '../constants/icons';


interface ToastMessageProps {
    message: string;
    type: "success" | "error";
    close: () => void;
}
export const ToastMessage = ({ message, type, close }: ToastMessageProps) => {
    const offsetWidth = React.useRef(
        new Animated.Value(SIZES.width - (SIZES.padding / 2)),
    )

    Animated.timing(
        offsetWidth.current,
        {
            toValue: 0,
            useNativeDriver: false,
            duration: 4000
        }
    ).start()

    setTimeout(() => {
        close()
    }, 4000)


    return (
        <View style={styles.toast_container}>
            <View style={styles.toast_content_container}>
                <View style={styles.toast_content_left}>
                    <Image source={type === "success" ? SUCCESSEMOJIICON : SADEMOJIICON}
                        style={styles.toast_content_icon}
                    />
                </View>
                <View style={styles.toast_content_right}>
                    <Text style={{ ...commonStyles.normalText, fontSize: 14, color: COLORS['dark-text'] }}>{message}</Text>

                    <TouchableOpacity
                        onPress={close}
                    >
                        <Image
                            source={CLOSEICON}
                            style={{
                                width: 15,
                                height: 15,
                                tintColor: COLORS['gray-1']
                            }}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            <Animated.View
                style={[styles.toast_indicator, { width: offsetWidth.current, backgroundColor: type === "success" ? COLORS['instructive-green'] : COLORS['instructive-red'] }]}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    toast_container: {
        marginTop: SIZES.padding,
        height: 50,
        position: 'absolute',
        elevation: 1,
        backgroundColor: COLORS['off-white'],
        width: '110%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        paddingHorizontal: SIZES.padding

    },
    toast_content_container: {

        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'

    },
    toast_content_left: {
        borderRightColor: COLORS['gray-1'],
        borderRightWidth: 0.5,
        paddingHorizontal: 10,
        marginRight: 10

    },
    toast_content_icon: {
        width: 30,
        height: 30
    },
    toast_content_right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20
    },
    toast_indicator: {
        alignSelf: 'flex-start',
        height: 2
    }
})
