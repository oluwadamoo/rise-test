import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ADDICON, LEFTARROWICON, MENUICON } from '../../constants/icons'
import { commonStyles, COLORS, SIZES } from '../../constants/theme'
import { BLURIMG, } from '../../constants/images'
import { LineChart } from 'react-native-chart-kit'
import { DATERANGE, BREAKDOWN, IUser, IPlan } from '../../constants/data'
import { PLAN } from '../../api'
import { useQuery } from '@tanstack/react-query'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { formatToMoney } from '../../utils/formatters'

export const InvestmentPlanDetails = ({ navigation, route }: any) => {
    const isFocused = useIsFocused()
    const { planId } = route.params;
    const user: IUser = useSelector((state: any) => state.user?.user)

    const [plan, setPlan] = useState<IPlan | null>()
    const [rate, setRate] = useState('')


    const getRate = useQuery({
        queryKey: ["getRate", isFocused],
        queryFn: () => PLAN.GETRATES(),
        retry: 3
    })

    useEffect(() => {
        getRate.refetch();

    }, [isFocused]);

    useEffect(() => {
        if (getRate.isSuccess && getRate.data) {
            const rate: any = getRate.data

            setRate(rate.data.buy_rate)
        }
    }, [getRate.data]);


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


    const getPlanDetails = useQuery({
        queryKey: ["getPlanDetails", isFocused],
        queryFn: () => PLAN.GETPLAN(planId)
        ,
        retry: 3
    })

    useEffect(() => {
        getPlanDetails.refetch();
    }, [isFocused]);

    useEffect(() => {
        if (getPlanDetails.isSuccess && getPlanDetails.data) {
            const plan: any = getPlanDetails.data

            setPlan(plan.data)
        }
    }, [getPlanDetails.data]);

    const [curGraph, setCurGraph] = useState(DATERANGE[0])
    return (
        <SafeAreaView style={commonStyles.screenWrapper}>
            <View style={styles.container}>

                {/* Header */}
                <ImageBackground
                    source={BLURIMG}
                    style={styles.header}

                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                        <Image source={LEFTARROWICON} style={{ ...styles.headerIcon, width: 13.5, height: 13.5 }} />
                    </TouchableOpacity>

                    <View>
                        <Text style={{ ...commonStyles.groteskBold, fontSize: 24, textAlign: 'center', color: COLORS['off-white'] }}>{plan?.plan_name}</Text>
                        <Text style={{ ...commonStyles.normalText, textAlign: 'center', fontSize: 15, color: COLORS['off-white'], }}>for {user.first_name}</Text>
                    </View>

                    <TouchableOpacity style={styles.iconContainer}>
                        <Image source={MENUICON} style={styles.headerIcon} />
                    </TouchableOpacity>

                </ImageBackground>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.body}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ ...styles.text, textAlign: 'center' }}>Plan Balance</Text>
                            <Text style={{ ...commonStyles.groteskBold, fontSize: 24, color: COLORS['dark-text'] }}>${formatToMoney(plan?.invested_amount.toString())}</Text>
                            <Text style={{ ...styles.text, textAlign: 'center' }}>~ ₦0.00</Text>
                            <Text style={{ ...styles.text, marginTop: 11, color: COLORS['dark-text'], textAlign: 'center' }}>Gains</Text>

                            <Text style={{ marginTop: 2, ...styles.text, color: COLORS['instructive-green'], textAlign: 'center' }}>+$5,000.43 • +12.4% </Text>
                        </View>

                        <View>
                            <View
                                style={{ marginTop: 23, ...commonStyles.row, justifyContent: 'space-between', marginBottom: 8 }}
                            >

                                <Text style={{ ...styles.text }}>${formatToMoney(plan?.invested_amount.toString())} achieved</Text>
                                <Text style={{ ...styles.text }}>Target: ${formatToMoney(plan?.target_amount.toString())}</Text>
                            </View>
                            <View style={{ height: 7, backgroundColor: COLORS['off-white-light-stroke'], borderRadius: 10 }}>
                                <View style={{ width: `${plan ? (parseFloat(plan?.invested_amount.toString()) / parseFloat(plan?.target_amount.toString())) * 100 : 0}%`, height: '100%', backgroundColor: COLORS['teal-001'], borderRadius: 10 }} />
                            </View>

                            <View style={{ marginTop: 23, padding: 5, borderRadius: 20, backgroundColor: COLORS['off-white-003'], alignSelf: 'center' }}>
                                <Text style={{ ...styles.text, fontSize: 13 }}>Results are updated monthly</Text>
                            </View>

                            <TouchableOpacity style={styles.addMoney} onPress={() => navigation.navigate("FundWallet")}>
                                <Image source={ADDICON} style={{ width: 21, height: 21, marginRight: 9 }} />
                                <Text style={{ ...commonStyles.boldText, color: COLORS['teal-001'] }}>Fund plan</Text>
                            </TouchableOpacity>


                            {/* GRAPH */}
                            <View style={styles.graph}>

                                <View style={{ alignSelf: "center", marginBottom: 12 }}>
                                    <Text style={{ ...commonStyles.normalText, color: COLORS['off-white'], fontSize: 12, textAlign: 'center' }}>Performance</Text>
                                    <Text style={{ marginVertical: 4, fontSize: 24, ...commonStyles.groteskBold, textAlign: 'center', color: COLORS['off-white'], }}>$208.75</Text>
                                    <Text style={{ ...commonStyles.normalText, textAlign: 'center', color: COLORS['off-white'], }}>July 26th, 2021</Text>
                                </View>

                                <View style={styles.labelCont}>
                                    <View style={styles.label}>
                                        <View style={{ ...styles.indicator, backgroundColor: COLORS['off-white'] }} />
                                        <Text style={styles.labelText}>Investments • ${plan?.invested_amount}</Text>
                                    </View>
                                    <View style={styles.label}>
                                        <View style={{ ...styles.indicator, backgroundColor: COLORS['teal-003'] }} />
                                        <Text style={styles.labelText}>Returns • ${plan?.total_returns}</Text>
                                    </View>
                                </View>
                                <LineChart
                                    data={{
                                        labels: [],
                                        datasets: [
                                            {
                                                data: plan && plan?.returns.length ? plan?.returns : [0, 0, 0, 0, 0],
                                                color: () => '#2DA7AE',

                                            },
                                        ],
                                    }}
                                    width={SIZES.width - (SIZES.padding * 4)}
                                    height={220}
                                    getDotColor={() => '#ffffff1f'}
                                    yAxisLabel={'$'}
                                    withShadow
                                    chartConfig={{

                                        backgroundGradientFrom: COLORS['teal-001'],
                                        backgroundGradientTo: COLORS['teal-001'],
                                        decimalPlaces: 2,
                                        color: () => COLORS['off-white'],
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    bezier

                                    style={{
                                        marginVertical: 8,
                                    }}
                                />

                                <View style={{ ...commonStyles.row, backgroundColor: 'rgba(255, 255, 255, 0.15)', justifyContent: 'space-between', borderRadius: 4, overflow: 'hidden' }}>
                                    {DATERANGE.map((range, index) => (
                                        <TouchableOpacity
                                            onPress={() => setCurGraph(range)}
                                            key={index} style={{ borderRadius: 5, height: 28, width: `${(1 / DATERANGE.length) * 100}%`, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, backgroundColor: curGraph === range ? COLORS['off-white'] : 'transparent' }}>
                                            <Text style={{ ...styles.text, fontSize: 12, color: curGraph === range ? COLORS['teal-001'] : COLORS['off-white'] }}>{range}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>


                            </View>
                            <View style={{ marginTop: 14 }}>
                                {
                                    plan ? BREAKDOWN(plan, rate).map(({ title, value }, index) => (
                                        <View style={{ ...commonStyles.row, paddingVertical: 10, borderTopWidth: index === 0 ? 0 : 1, borderTopColor: COLORS['off-white-003'], justifyContent: 'space-between' }} key={index}>
                                            <Text style={{ ...styles.text }}>{title}</Text>
                                            <Text style={{ ...commonStyles.grotesk }}>{value}</Text>
                                        </View>
                                    )) : null
                                }
                            </View>


                        </View>
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        padding: SIZES.padding,
        ...commonStyles.row,
        justifyContent: 'space-between',
        resizeMode: 'cover',
        height: 150
    },
    body: {
        padding: SIZES.padding,
        paddingTop: 24,
    },
    authButton: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 'auto'
    },
    iconContainer: {
        height: 36,
        width: 36,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.40)'
    },
    headerIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        tintColor: COLORS['off-white']

    },
    text: {
        ...commonStyles.normalText,
        color: COLORS['text-soft'],
        fontSize: 15
    },
    addMoney: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        padding: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS['off-white-003'],
        marginTop: 23.4
    },
    graph: {
        marginTop: 23,
        backgroundColor: COLORS['teal-001'],
        borderRadius: 12,
        padding: SIZES.padding
    },
    labelCont: {
        ...commonStyles.row,
        justifyContent: 'space-around',
        marginBottom: 30
    },
    label: {
        ...commonStyles.row
    },
    indicator: {
        width: 9,
        height: 9,
        borderRadius: 9,
        marginRight: 6
    },
    labelText: {
        color: COLORS['off-white'],
        ...commonStyles.normalText,
        fontSize: 12
    }

})