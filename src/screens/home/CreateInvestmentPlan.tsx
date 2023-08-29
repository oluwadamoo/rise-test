import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import { CustomButton, CustomHeader } from '../../components'
import { CLOSEICON } from '../../constants/icons'
import { EXTENSIONIMG } from '../../constants/images'
import { INVESTMENTDETAILS } from '../../constants/data'

export const CreateInvestmentPlan = ({ navigation }: any) => {

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none",
            },
        });

        return () =>
            navigation.getParent()?.setOptions({
                tabBarStyle: undefined,
            });
    }, []);

    return (
        <SafeAreaView style={commonStyles.screenWrapper}>
            <View style={styles.container}>
                {/* Header */}
                <CustomHeader title='Create a plan' onIconPress={() => navigation.goBack()} icon={CLOSEICON} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ ...styles.subText, textAlign: 'center', marginTop: 25.7 }}>Reach your goals faster</Text>


                    <Image source={EXTENSIONIMG} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 61.6, marginBottom: 53.4, borderRadius: 100 }} />


                    {INVESTMENTDETAILS.map(({ icon, subText, title }, index) => (
                        <View style={styles.investmentDetails} key={index}>
                            <View style={styles.iconContainer}>
                                <Image source={icon} style={styles.icon} />
                            </View>
                            <View>
                                <Text style={{ ...commonStyles.boldText, fontSize: 15, marginBottom: 4 }}>{title}</Text>
                                <Text style={{ ...styles.subText, maxWidth: '95%' }}>{subText}</Text>
                            </View>
                        </View>
                    ))}




                </ScrollView>


                <CustomButton containerStyles={{ ...commonStyles.authButton }} label='Continue' onPress={() => navigation.navigate("CreateInvestmentPlanGoals")} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding
    },
    subText: {
        ...commonStyles.normalText,
        color: COLORS['text-soft']
    },
    investmentDetails: {
        flexDirection: 'row',
        marginBottom: 24
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS['off-white-003'],
        marginRight: 20
    },
    icon: {
        width: 24,
        height: 24
    },

})