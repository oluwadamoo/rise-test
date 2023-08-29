import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { RefObject, useRef, useState } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import PagerView from 'react-native-pager-view'
import { LEFTARROWICON, RIGHTARROWICON } from '../../constants/icons'
import { CustomButton } from '../../components'
import { SCREENS } from '../../constants/data'


interface WelcomeScreenProps {
    icon: number;
    title: string;
    subText: string;
    index: number;
    bg: string;
    color: string;
    pagerRef: RefObject<PagerView>;
    navigation: any;
}
const WelcomeScreen = ({ icon, pagerRef, title, subText, index, color, bg, navigation }: WelcomeScreenProps) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View
                style={{ ...styles.welcomeContainer, backgroundColor: bg }}>
                <Image
                    source={icon}
                    style={{ width: 300, height: 300, resizeMode: 'contain', alignSelf: 'center' }}
                />

                <View style={{ ...commonStyles.row, alignSelf: 'center', marginBottom: 40, width: 62, justifyContent: 'space-between' }}>
                    {[0, 0, 0].map((_, i) => (
                        <View style={{ backgroundColor: index === i ? color : COLORS['off-white-light-stroke'], width: 6, height: 6, borderRadius: 6 }} key={i} />
                    ))}

                </View>
                <Text style={{ ...commonStyles.semiBoldText, fontSize: 20, color, marginBottom: 12 }}>{title}</Text>
                <Text style={{ ...commonStyles.normalText, fontSize: 15 }}>{subText}</Text>


                {index !== 2 && <View style={{ ...commonStyles.row, marginTop: 57, justifyContent: 'space-between' }}>
                    {/* Back */}
                    <TouchableOpacity style={{
                        opacity: index === 0 ? 0.3 : 1,
                        ...styles.navBtn
                    }}
                        disabled={index === 0}
                        onPress={() => pagerRef.current?.setPage(index - 1)}
                    >
                        <Image source={LEFTARROWICON} style={{ ...styles.arrow, tintColor: index === 1 ? COLORS['indigo-001'] : COLORS['text-004'], }} />
                    </TouchableOpacity>


                    {/* NEXT */}
                    <TouchableOpacity style={{ ...commonStyles.row, ...styles.navBtn }}
                        onPress={() => pagerRef.current?.setPage(index + 1)}
                    >
                        <Text style={{ ...commonStyles.normalText, ...commonStyles.boldText, color, marginRight: 15 }}>Next</Text>
                        <Image source={RIGHTARROWICON} style={{ ...styles.arrow, tintColor: color }} />
                    </TouchableOpacity>
                </View>}

                {index === 2 && (
                    <View style={{ marginTop: 34 }}>

                        <CustomButton label='Sign Up' onPress={() => navigation.replace("CreateAccount")} containerStyles={{ ...styles.authButton }} />
                        <CustomButton label='Sign In' onPress={() => navigation.replace("Signin")} containerStyles={{ ...styles.authButton, backgroundColor: COLORS['off-white-003'] }} labelStyles={{ color: COLORS['teal-001'] }} />
                    </View>
                )}
            </View>
        </ScrollView>
    )
}
export const Welcome = ({ navigation }: any) => {
    const [currIndex, setCurrIndex] = useState(0)
    const pagerRef = useRef<PagerView>(null)


    return (
        <SafeAreaView
            style={{ ...commonStyles.screenWrapper, backgroundColor: SCREENS[currIndex].bg }}
        >
            <PagerView scrollEnabled={false} ref={pagerRef} style={styles.container} onPageScroll={(e) => setCurrIndex(e.nativeEvent.position)}>
                {SCREENS.map(({ icon, color, title, subText, bg }, index) => (
                    <WelcomeScreen navigation={navigation} color={color} icon={icon} bg={bg} index={index} title={title} subText={subText} key={index} pagerRef={pagerRef} />
                ))}

            </PagerView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    welcomeContainer: {
        flex: 1,
        padding: SIZES.padding,
        paddingVertical: 59
    },
    arrow: {
        width: 10,
        height: 11,
        resizeMode: 'contain'
    },
    navBtn: {
        height: 48,
        padding: 16,
        backgroundColor: COLORS['off-white-003'],
        borderRadius: 5
    },
    authButton: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }
})
