import { View, Text, StyleSheet, SafeAreaView, Dimensions, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomButton, CustomHeader, SuccessModal, ToastMessage } from '../../components'
import { INFOICON, LEFTARROWICON } from '../../constants/icons'
import { COLORS, commonStyles, SIZES } from '../../constants/theme'
import { LineChart } from 'react-native-chart-kit'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PLAN } from '../../api'
import { useIsFocused } from '@react-navigation/native'
import { formatDate, formatToMoney, getMonthsDifference, toDollarNaira } from '../../utils/formatters'
import { useSelector } from 'react-redux'
import { IUser } from '../../constants/data'

export const CreateInvestmentPlanReview = ({ navigation, route }: any) => {
    const { maturity_date, plan_name, target_amount } = route.params
    const user: IUser = useSelector((state: any) => state.user?.user)

    const isFocused = useIsFocused()

    const [showModal, setShowModal] = useState(false)
    const [planId, setPlanId] = useState('')
    const [rate, setRate] = useState('')
    const [error, setError] = useState('')


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

    const createPlanQuery = useMutation({
        mutationFn: () => {
            return PLAN.CREATE({
                maturity_date: new Date(maturity_date),
                plan_name, target_amount
            })
        },
        onSuccess: (response: any) => {

            if (response?.data?.message) {
                setError(response.data.message)
            } else {
                setPlanId(response.data.id)
                setShowModal(true)
            }
        }
    })

    const getMonthlyInvestment = () => {
        const numOfMonths = getMonthsDifference(new Date(), new Date(maturity_date))
        const monthlyInvestmentInDollar = parseFloat(toDollarNaira({ type: "dollar", rate, target_amount })) / numOfMonths

        return formatToMoney(monthlyInvestmentInDollar?.toString())
    }


    return (
        <SafeAreaView style={commonStyles.screenWrapper}>
            {error ? <ToastMessage message={error} type={'error'} close={() => setError("")} /> : null}
            <View style={styles.container}>
                {/* Header */}
                <CustomHeader title="Review" onIconPress={() => {
                    navigation.goBack()
                }} icon={LEFTARROWICON} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={{ ...commonStyles.normalText, color: COLORS['text-soft'], fontSize: 12, textAlign: 'center' }}>{plan_name}</Text>
                        <Text style={{ marginVertical: 4, fontSize: 24, ...commonStyles.groteskBold, textAlign: 'center' }}>${toDollarNaira({ type: "dollar", rate, target_amount })}</Text>
                        <Text style={{ ...commonStyles.normalText, textAlign: 'center' }}>by {formatDate(new Date(maturity_date))}</Text>
                    </View>

                    <View style={styles.graph}>
                        <View style={styles.labelCont}>
                            <View style={styles.label}>
                                <View style={{ ...styles.indicator, backgroundColor: COLORS['text-004'] }} />
                                <Text style={styles.labelText}>Investments • $50,400</Text>
                            </View>
                            <View style={styles.label}>
                                <View style={{ ...styles.indicator, backgroundColor: COLORS['teal-001'] }} />
                                <Text style={styles.labelText}>Returns • $20,803</Text>
                            </View>
                        </View>
                        <LineChart
                            data={{
                                labels: ['2034', '2035', '2036', '2037', '2038', '2039'],
                                datasets: [
                                    {
                                        data: [
                                            10000,
                                            20000,
                                            30000,
                                            40000,
                                            50000,
                                            60000
                                        ],
                                        color: () => COLORS['text-004']
                                    },
                                    {
                                        data: [
                                            10000,
                                            30000,
                                            40000,
                                            50000,
                                            60000,
                                            70000
                                        ],
                                        color: () => COLORS['teal-001'],

                                    },
                                ],
                            }}
                            width={Dimensions.get('window').width - 16} // from react-native
                            height={220}
                            getDotColor={() => '#ffffff1f'}
                            yAxisLabel={'$'}
                            withShadow
                            chartConfig={{

                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 2,
                                color: () => COLORS['text-004'],
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            bezier

                            style={{
                                marginVertical: 8,
                            }}
                        />

                        <View style={{ ...commonStyles.row, paddingVertical: 15, paddingBottom: 25, borderBottomColor: COLORS['off-white-light-stroke'], borderBottomWidth: 1, justifyContent: 'space-between' }}>
                            <Text style={{ ...commonStyles.normalText, fontSize: 15, color: COLORS['text-soft'] }}>Estimated monthly investment</Text>
                            <Text style={{ ...commonStyles.normalText, fontSize: 14, color: COLORS['gray-1'] }}>${getMonthlyInvestment()}</Text>
                        </View>

                        <View style={{ marginTop: 23, marginBottom: 27, ...commonStyles.row, backgroundColor: COLORS['off-white-004'], padding: 10, borderRadius: 8 }}>
                            <Image source={INFOICON} style={{ width: 24, height: 24, marginRight: 17 }} />

                            <Text style={{ ...commonStyles.normalText, flex: 1, fontSize: 15, color: COLORS['text-soft'] }}>
                                Returns not guaranteed. Investing involves risk. Read our Disclosures.
                            </Text>
                        </View>

                        <Text style={{ textAlign: 'center', ...commonStyles.normalText, color: COLORS['text-soft'], fontSize: 12 }}>
                            These are your starting settings, they can always be updated.
                        </Text>


                        <CustomButton isLoading={createPlanQuery.isLoading} containerStyles={{ ...commonStyles.authButton, marginTop: 29, marginBottom: 10 }} label='Agree & Continue' onPress={() => createPlanQuery.mutate()} />
                        <CustomButton disabled={createPlanQuery.isLoading} containerStyles={{ ...commonStyles.authButton, backgroundColor: COLORS['off-white-003'] }} labelStyles={{
                            color: COLORS['teal-001']
                        }} label='Start over' onPress={() => navigation.goBack()} />
                    </View>

                </ScrollView>
            </View>

            {showModal && <SuccessModal
                text='You just created your plan'
                subText={`Well done, ${user.first_name}`}
                onPress={() => {
                    setShowModal(false)
                    navigation.replace('InvestmentPlanDetails', { planId })
                }}
            />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding
    },


    graph: {
        marginTop: 19
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
        color: COLORS['gray-1'],
        ...commonStyles.normalText,
        fontSize: 12
    }
})