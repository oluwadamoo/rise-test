import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import { LINEARBG } from '../../constants/images'
import { CustomButton, HomeLoader, PlanCard, ToastMessage } from '../../components'
import { BELLICON, LEFTARROWICON, EYEOFFICON, CARETRIGHTICON, ADDICON, ADDROUNDICON, QMARKICON, SHAREICON, LOGOICON } from '../../constants/icons'
import PagerView from 'react-native-pager-view';
import { Greeting, IPlan, IUser, } from '../../constants/data'
import { useQuery } from '@tanstack/react-query'
import { useIsFocused } from '@react-navigation/native'
import { AUTH, PLAN } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../store/user.reducer'
import { formatToMoney } from '../../utils/formatters'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IQuote {
    quote: string;
    author: string;
}


export function Home({ navigation }: any) {
    const stateUser = useSelector((state: any) => state.user.user)
    const [user, setUser] = useState<IUser>(stateUser)
    const [refreshing, setRefreshing] = useState(false)
    const [plans, setPlans] = useState<IPlan[]>([])
    const [quote, setQuote] = useState<IQuote>()
    const dispatch = useDispatch()
    const pagerRef = useRef<PagerView>(null);
    const [error, setError] = useState('')

    const isFocused = useIsFocused();

    const getSession = useQuery({
        queryKey: ["getSession", isFocused],
        queryFn: () => AUTH.GETSESSION()


    })
    const getPlans = useQuery({
        queryKey: ["getPlans", isFocused],
        queryFn: () => PLAN.GETALL()

    })
    const getQuotes = useQuery({
        queryKey: ["getQuotes", isFocused],
        queryFn: () => PLAN.GETQUOTES()
    })

    useEffect(() => {
        getSession.refetch();
        getPlans.refetch();
        getQuotes.refetch()
    }, [isFocused]);


    useEffect(() => {
        if (getSession.isSuccess && getSession.data) {


            const user: any = getSession.data

            if (user?.data.message) {
                // setError(user?.data.message)
            }
            if (!user?.data.message) {
                setUser(user.data)
                dispatch(updateUser(user.data))
            }
        }
        if (getPlans.isSuccess && getPlans.data) {
            const plans: any = getPlans.data

            setPlans(plans.data.items)

        }
        if (getQuotes.isSuccess && getQuotes.data) {
            const quote: any = getQuotes.data

            setQuote(quote.data)

        }
    }, [getSession.data, getPlans.data, getQuotes.data]);

    const handleRefresh = () => {
        setRefreshing(true);
        getSession.refetch();
        getPlans.refetch();
        getQuotes.refetch();
        setRefreshing(false);
    }
    return (
        <SafeAreaView style={commonStyles.screenWrapper}>
            {error ? <ToastMessage message={error} type={'error'} close={() => setError("")}
            /> : null}
            {
                getPlans.isLoading || getQuotes.isLoading || getSession.isLoading ?
                    <HomeLoader /> :

                    <View
                        style={styles.container}
                    >
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
                                />
                            } data={[]}
                            showsVerticalScrollIndicator={false}
                            renderItem={() => (
                                <>
                                </>
                            )}
                            ListHeaderComponent={() => (
                                <>
                                    <ImageBackground source={LINEARBG} style={styles.linearBg}>
                                        {/* Header */}
                                        <View style={styles.headerContainer}>
                                            <View>
                                                <Text style={styles.greeting}>{Greeting()} </Text>
                                                <Text style={styles.userName}>{user?.first_name} </Text>
                                            </View>

                                            <View style={styles.headerRight}>
                                                <CustomButton
                                                    label='Earn 3% bonus'
                                                    onPress={() => console.log('')}
                                                    disabled={true}
                                                    containerStyles={{
                                                        borderRadius: 16,
                                                        padding: 8
                                                    }}
                                                    labelStyles={{
                                                        fontSize: 12
                                                    }}
                                                />

                                                <TouchableOpacity style={styles.notificationContainer}>

                                                    <Image source={BELLICON} style={styles.notificationIcon} />
                                                    <View style={styles.notificationCountContainer}>
                                                        <Text style={styles.notificationCount}>9+</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                        {/* BALANCE CARD */}
                                        <PagerView initialPage={0} ref={pagerRef} style={{ flex: 1 }}>
                                            {[0, 0, 0].map((val, index) => (
                                                <View style={styles.balanceCardContainer} key={index}>
                                                    <View
                                                        style={commonStyles.row}
                                                    >
                                                        <Text
                                                            style={styles.subText}
                                                        >Total Balance</Text>
                                                        <TouchableOpacity>
                                                            <Image source={EYEOFFICON} style={{ marginLeft: 10, width: 13, height: 13, resizeMode: 'contain' }} />
                                                        </TouchableOpacity>
                                                    </View>

                                                    <Text style={styles.bal}>
                                                        ${formatToMoney(user?.total_balance?.toString())}

                                                    </Text>

                                                    <View style={{ width: '50%', height: 1, backgroundColor: COLORS['off-white-003'], marginVertical: 12 }} />

                                                    <TouchableOpacity style={styles.totalGains}>
                                                        <Text style={styles.subText}>Total Gains</Text>
                                                        <Image source={LEFTARROWICON} style={{ width: 8.5, height: 8.5, resizeMode: 'contain', marginHorizontal: 4, tintColor: COLORS['instructive-green'], transform: [{ rotate: '135deg' }] }} />
                                                        <Text style={{ ...styles.subText, color: COLORS['instructive-green'] }}>0.00%</Text>
                                                        <Image source={CARETRIGHTICON} style={{ marginRight: 8, height: 9, width: 9, resizeMode: 'contain' }} />
                                                    </TouchableOpacity>


                                                    <View style={styles.dotsContainer}>
                                                        {[0, 0, 0].map((dot, i) => (
                                                            <View style={[styles.dots, { width: index == i ? 12 : 5, backgroundColor: index == i ? COLORS['teal-001'] : COLORS['off-white-light-stroke'] }]} key={i} />
                                                        ))}
                                                    </View>
                                                </View>
                                            ))}
                                        </PagerView>
                                    </ImageBackground>


                                    <View style={styles.body}>

                                        {/* ADD MONEY */}
                                        <TouchableOpacity style={styles.addMoney} onPress={() => navigation.navigate("FundWallet")}>
                                            <Image source={ADDICON} style={{ width: 21, height: 21, marginRight: 9 }} />
                                            <Text style={{ ...styles.subText, ...commonStyles.boldText, color: COLORS['teal-001'] }}>Add money</Text>
                                        </TouchableOpacity>

                                        <View style={{ ...commonStyles.row, marginBottom: 12, justifyContent: 'space-between', marginTop: 31 }}>
                                            <Text style={styles.userName}>Create a plan</Text>

                                            <TouchableOpacity style={{ ...commonStyles.row, }}>
                                                <Text style={{ ...styles.subText, color: COLORS['text-004'], textAlign: 'right', marginRight: 8 }}>View all plans</Text>
                                                <Image source={CARETRIGHTICON} style={{ marginRight: 8, height: 9, width: 9, resizeMode: 'contain' }} />
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={{ ...styles.subText }}>
                                            Start your investment journey by creating a plan"
                                        </Text>


                                        {/* PLANS */}
                                        <FlatList

                                            contentContainerStyle={{ marginTop: 20, paddingBottom: SIZES.padding }}
                                            horizontal
                                            data={plans}
                                            ListEmptyComponent={() => (
                                                <TouchableOpacity style={{ ...styles.planCardContainer, backgroundColor: COLORS['off-white-003'], alignItems: 'center', justifyContent: 'center' }}
                                                    onPress={() => navigation.navigate("CreateInvestmentPlan")}
                                                >

                                                    <Image source={ADDROUNDICON} style={{ width: 42, height: 42 }} />
                                                    <Text style={{ ...commonStyles.boldText, fontSize: 14, color: COLORS['gray-1'], maxWidth: '70%', textAlign: 'center', marginTop: 7.6 }}>Create an investment plan</Text>
                                                </TouchableOpacity>
                                            )}
                                            renderItem={({ item, index }) => (
                                                <>
                                                    {index === 0 && <TouchableOpacity style={{ ...styles.planCardContainer, backgroundColor: COLORS['off-white-003'], alignItems: 'center', justifyContent: 'center' }}
                                                        onPress={() => navigation.navigate("CreateInvestmentPlan")}
                                                    >

                                                        <Image source={ADDROUNDICON} style={{ width: 42, height: 42 }} />
                                                        <Text style={{ ...commonStyles.boldText, fontSize: 14, color: COLORS['gray-1'], maxWidth: '70%', textAlign: 'center', marginTop: 7.6 }}>Create an investment plan</Text>
                                                    </TouchableOpacity>}

                                                    <PlanCard
                                                        onPress={() => navigation.navigate("InvestmentPlanDetails", { planId: item.id })}
                                                        title={item.plan_name}
                                                        amount={item.target_amount?.toString()}

                                                    />
                                                </>
                                            )}
                                        />

                                        {/* NEED HELP */}

                                        <View style={styles.helpContainer}>
                                            <View style={commonStyles.row}>
                                                <Image source={QMARKICON} style={{ width: 24, height: 24 }} />
                                                <Text style={{ ...styles.subText, marginLeft: 10, color: COLORS['dark-mode'] }}>Need help?</Text>
                                            </View>

                                            <CustomButton
                                                onPress={() => console.log("CONTACT US")}
                                                label='Contact us'
                                            />
                                        </View>

                                        {/* QUOTE OF THE DAY */}

                                        <View style={styles.quoteContainer}>
                                            <Text style={{ ...commonStyles.boldText, color: COLORS['off-white'], fontSize: 14 }}>TODAY'S QUOTE</Text>

                                            <View style={{ height: 2, width: 27.556, backgroundColor: COLORS['off-white'], marginVertical: SIZES.padding }} />

                                            <Text style={{ ...styles.subText, color: COLORS['off-white'], }}>
                                                {quote?.quote}
                                            </Text>

                                            {/* QUOTE OF THE DAY FOOTER */}
                                            <View style={{ ...commonStyles.row, marginTop: 10, justifyContent: 'space-between', }}>
                                                <Text style={{ ...commonStyles.boldText, color: COLORS['off-white'], fontSize: 14 }}>{quote?.author}</Text>
                                                <View style={{ borderRadius: 25, height: 42, width: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF33' }}>
                                                    <Image source={SHAREICON} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                                                </View>
                                            </View>
                                        </View>

                                        <Image source={LOGOICON} style={{ tintColor: COLORS['off-white-light-stroke'], alignSelf: 'center', maxWidth: 80.56, resizeMode: 'contain', height: 24, marginTop: 32 }} />
                                    </View>
                                </>
                            )}
                        />

                    </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        fontSize: 15,
        ...commonStyles.normalText
    },
    userName: {
        fontSize: 20,
        ...commonStyles.normalText

    },
    linearBg: {
        minHeight: 300,
        padding: SIZES.padding
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SIZES.padding
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationContainer: {
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notificationIcon: {
        width: 21,
        height: 21,
        resizeMode: 'contain'
    },
    notificationCountContainer: {
        marginLeft: 10,
        top: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: COLORS['instructive-red'],
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notificationCount: {
        color: COLORS['off-white'],
        fontSize: 12,
        fontWeight: "600"
    },
    balanceCardContainer: {
        backgroundColor: COLORS['off-white'],
        marginTop: 7.5,
        alignItems: 'center',
        padding: 15,
        borderRadius: 10
    },
    subText: {
        fontSize: 15,
        color: COLORS['text-soft']
    },
    bal: {
        marginTop: 12,
        color: COLORS['gray-1'],
        fontSize: 32,
        ...commonStyles.grotesk
    },
    totalGains: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 40,
        justifyContent: 'space-between',
        marginTop: 14
    },
    dots: {
        height: 5,
        width: 5,
        borderRadius: 5
    },
    addMoney: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        padding: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS['off-white-light-stroke']
    },
    body: {
        padding: SIZES.padding
    },
    planCardContainer: {
        height: 243,
        width: 188,
        borderRadius: 12,
        overflow: 'hidden'
    },
    helpContainer: {
        ...commonStyles.row,
        justifyContent: 'space-between',
        borderRadius: 12,
        marginTop: 31,
        padding: 12,
        backgroundColor: COLORS['off-white'],
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    quoteContainer: {
        borderWidth: 2,
        borderColor: COLORS['teal-003'],
        backgroundColor: COLORS['teal-001'],
        marginTop: 34,
        borderRadius: 12,
        padding: SIZES.padding
    },

})