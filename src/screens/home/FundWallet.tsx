import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import { CLOSEICON } from '../../constants/icons'
import { CustomButton, CustomHeader, } from '../../components'
import Modal from "react-native-modal";
import { WALLETTRANSACTIONS, ABOUTEXCHANGERATES } from '../../constants/data'
import { useQuery } from '@tanstack/react-query'
import { PLAN } from '../../api'
import { useIsFocused } from '@react-navigation/native'


export const FundWallet = ({ navigation }: any) => {
    const [modalVisible, setModalVisible] = useState(true)

    const isFocused = useIsFocused()

    const [rate, setRate] = useState({
        buy_rate: 0,
        sell_rate: 0
    })
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

            setRate(rate.data)
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

    return (
        <SafeAreaView style={{ ...commonStyles.screenWrapper }}>
            <View style={styles.container}>

                <CustomHeader title='Fund Wallet' icon={CLOSEICON} onIconPress={() => navigation.goBack()} />

                <View>


                    <FlatList
                        data={WALLETTRANSACTIONS}
                        renderItem={({ item }) => (
                            <View style={styles.transactionContainer}>
                                <View style={{ ...commonStyles.row, maxWidth: '70%' }}>
                                    <View style={styles.transactionIconContainer}>
                                        <Image source={item.icon} style={styles.transactionIcon} />
                                    </View>

                                    <View style={{ maxWidth: '80%' }}>
                                        <Text style={{ ...commonStyles.semiBoldText, fontSize: 16, marginBottom: 4 }}>{item.title} </Text>
                                        <Text style={styles.text}>Timeline - {item.timeline}</Text>
                                    </View>


                                </View>
                                <View>
                                    <Text style={{ textAlign: 'left', ...styles.text, marginBottom: 4 }}>Rate - {item.rate}</Text>
                                    <Text style={{ ...styles.text, alignSelf: "flex-end" }}>Fee - {item.fee}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>


            <Modal
                isVisible={modalVisible}
                swipeDirection={"down"}
                onSwipeComplete={() => setModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        width: SIZES.width,
                        marginLeft: -SIZES.padding,
                        marginBottom: -SIZES.padding,
                        justifyContent: "flex-end",
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ flex: 1 }}
                        onPress={() => setModalVisible(false)}
                    ></TouchableOpacity>

                    <View
                        style={{
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            backgroundColor: COLORS['off-white'],
                            minHeight: SIZES.height * 0.6,
                            width: "100%",
                            paddingHorizontal: 25,
                        }}
                    >
                        <CustomHeader title='About Exchange Rates' icon={CLOSEICON} onIconPress={() => setModalVisible(false)} titleStyles={{ fontSize: 20, ...commonStyles.grotesk }} />
                        {
                            rate ? ABOUTEXCHANGERATES(rate).map(({ title, subText, amount }, index) => (
                                <View style={{ ...commonStyles.row, justifyContent: "space-between", borderTopWidth: index === 0 ? 1 : 0, borderBottomWidth: 1, borderBottomColor: COLORS['off-white-003'], borderTopColor: COLORS['off-white-003'], paddingVertical: 15 }} key={index}>
                                    <View style={{ maxWidth: '80%' }}>
                                        <Text style={{ ...commonStyles.normalText, fontSize: 15, color: COLORS['text-black'] }}>{title}</Text>
                                        <Text style={{ ...commonStyles.normalText, fontSize: 13, color: COLORS['text-soft'] }}>{subText}</Text>

                                    </View>

                                    <Text style={{ ...commonStyles.grotesk, fontSize: 15 }}>{amount}</Text>
                                </View>
                            )) : null
                        }


                        <Text style={{ ...commonStyles.normalText, fontSize: 11, marginTop: 24 }}>These exhange rates are provided by independent third parties who handle fund conversions at the prevailing parallel rates and are not set, or controlled or by Rise. They are subject to change based on market trends.</Text>

                        <CustomButton label='Accept & Continue' onPress={() => {
                            setModalVisible(false)
                            navigation.navigate('ChoosePlan')
                        }} containerStyles={{ ...commonStyles.authButton, marginTop: 24 }} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding
    },
    transactionContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS['off-white-light-stroke'],
        paddingVertical: 15
    },
    transactionIconContainer: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        backgroundColor: COLORS['off-white-003'],
        borderRadius: 36
    },
    transactionIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        tintColor: COLORS['teal-001']

    },
    text: {
        ...commonStyles.normalText,
        color: COLORS['gray-1'],
        fontSize: 14
    }

})