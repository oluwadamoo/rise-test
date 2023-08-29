import { View, Text, SafeAreaView, StyleSheet, } from 'react-native'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import { CustomButton, CustomHeader, CustomInput, TextAnimation } from '../../components'
import { CALENDARICON, LEFTARROWICON, } from '../../constants/icons'
import PagerView from 'react-native-pager-view'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { formatToMoney } from '../../utils/formatters'
import { AYEARFROMNOW } from '../../constants/data'

const GOALS = [
    {
        title: 'Goal name',
        canGoBack: false,
        question: 'What are you saving for?',
        leftComponent: null,
        icon: null
    },
    {
        title: 'Target amount',
        canGoBack: true,

        question: 'How much do you need?',
        leftComponent: <Text style={{ ...commonStyles.boldText, fontSize: 15, marginRight: 10 }}>₦</Text>,
        icon: null
    },
    {
        title: 'Target date',
        canGoBack: true,
        question: 'When do you want to withdraw?',
        leftComponent: null,
        icon: CALENDARICON

    }
]

interface GoalScreenProps {
    label: string;
    pagerRef: RefObject<PagerView>;
    value: string
    setValue: (val: string) => void;
    icon?: number;
    reviewPlan: () => void;
    leftComponent?: any;
    index: number;

}
const GoalScreen = ({ reviewPlan, index, icon, leftComponent, label, value, setValue, pagerRef }: GoalScreenProps) => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [formattedAmount, setFormattedAmount] = useState('')
    const [inputError, setInputError] = useState('')

    useEffect(() => {
        setInputError("")
    }, [index])


    const validateInput = () => {
        if (index === 0) {
            if (value.length < 3) {
                setInputError("Please enter your plan name")
            } else {
                pagerRef.current?.setPage(index + 1)
            }
        } else if (index === 1) {
            if (!value.length || parseFloat(value) < 10000) {
                setInputError("Amount must be greater than ₦10,000")
            }
            else {
                pagerRef.current?.setPage(index + 1)
            }
        } else {
            if (!Date.parse(value) || (AYEARFROMNOW > Date.parse(value))) {
                setInputError("Date must be atleast a year from now")
            } else {
                reviewPlan()
            }
        }
    }

    const setDate = (_: DateTimePickerEvent, date?: Date | undefined) => {

        setShowDatePicker(false)
        if (date) {
            setValue(date.toISOString().split("T")[0])
        }
    };
    return (


        <View>
            <Text style={{ ...commonStyles.boldText, fontSize: 17, marginBottom: 20, color: COLORS['text-black'] }}>{label}</Text>

            <CustomInput
                hasError={inputError.length > 1}
                value={leftComponent ? formattedAmount : value} placeholder={''}
                keyboardType={leftComponent ? 'phone-pad' : 'default'}
                editable={!icon}
                onFocus={() => setInputError('')}
                onIconPress={() => setShowDatePicker(true)}
                onEndEditing={() => {
                    if (leftComponent) {
                        const formatted = formatToMoney(value)
                        setFormattedAmount(formatted)
                    }
                }}

                setValue={
                    (text) => {
                        if (leftComponent) {
                            setFormattedAmount(text)

                        }
                        setValue(text)

                    }
                } extraData={leftComponent} icon={icon} />
            {(inputError) && <TextAnimation text={inputError} />}

            <CustomButton
                containerStyles={{ ...commonStyles.authButton, marginTop: 26 }} label='Continue' onPress={validateInput} />
            {showDatePicker && <RNDateTimePicker
                mode='date'
                minimumDate={new Date()}
                value={value && !isNaN(Date.parse(value)) ? new Date(value) : new Date()}
                onChange={setDate} />}
        </View>
    )
}
export const CreateInvestmentPlanGoals = ({ navigation }: any) => {
    const [currIndex, setCurrIndex] = useState(0)
    const pagerRef = useRef<PagerView>(null)
    const [savingReason, setSavingReason] = useState('')
    const [amountNeeded, setAmountNeeded] = useState('')
    const [withdrawalDate, setWithdrawalDate] = useState('Choose a date')

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



    const reviewPlan = () => {

        navigation.navigate("ReviewInvestmentPlan", {
            plan_name: savingReason,
            target_amount: parseFloat(amountNeeded),
            maturity_date: withdrawalDate

        })

    }

    return (
        <SafeAreaView style={commonStyles.screenWrapper}>
            <View style={styles.container}>
                {/* Header */}
                <CustomHeader title={GOALS[currIndex].title} onIconPress={() => {
                    if (currIndex == 0) {
                        navigation.goBack()
                    } else {
                        pagerRef.current?.setPage(currIndex - 1)
                    }


                }} icon={LEFTARROWICON} />


                <Text style={{ ...commonStyles.normalText, fontSize: 15, marginTop: 37, marginBottom: 21, color: COLORS['text-soft'] }}>Question {currIndex + 1} of 3</Text>

                <View style={{ width: '100%', marginBottom: 64, overflow: 'hidden', height: 10, backgroundColor: COLORS['off-white-003'], borderRadius: 10 }}>
                    <View style={{ height: 10, backgroundColor: COLORS['teal-001'], width: `${(currIndex + 1) * 100 / 3}%` }} />
                </View>
                <PagerView scrollEnabled={false} ref={pagerRef} style={{ ...styles.container, paddingHorizontal: 0 }} onPageScroll={(e) => setCurrIndex(e.nativeEvent.position)}>


                    {GOALS.map(({ question, icon, leftComponent, }, index) => (
                        <GoalScreen reviewPlan={reviewPlan} index={index} icon={icon} leftComponent={leftComponent} value={index === 0 ? savingReason : index === 1 ? amountNeeded : withdrawalDate} setValue={index === 0 ? setSavingReason : index === 1 ? setAmountNeeded : setWithdrawalDate} key={index} label={question} pagerRef={pagerRef} />
                    ))}
                </PagerView>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding
    },


})