import { View, Text, FlatList, SafeAreaView, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomHeader, PlanCard } from '../../components'
import { LEFTARROWICON } from '../../constants/icons'
import { commonStyles, SIZES, } from '../../constants/theme'
import { IPlan, } from '../../constants/data'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { PLAN } from '../../api'

export const ChoosePlan = ({ navigation }: any) => {

    const isFocused = useIsFocused();
    const [plans, setPlans] = useState<IPlan[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const getPlans = useQuery({
        queryKey: ["getPlans", isFocused],
        queryFn: () => PLAN.GETALL()

    })

    useEffect(() => {
        getPlans.refetch();
    }, [isFocused]);

    useEffect(() => {
        if (getPlans.isSuccess && getPlans.data) {
            const plans: any = getPlans.data

            setPlans(plans.data.items)

        }

    }, [getPlans.data,]);

    const handleRefresh = () => {
        setRefreshing(true);
        getPlans.refetch();
        setRefreshing(false);
    }




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

                <CustomHeader title='Choose from plans' icon={LEFTARROWICON} onIconPress={() => navigation.goBack()} />

                <View style={{ flex: 1 }}>
                    <Text style={{ ...commonStyles.normalText, fontSize: 15, marginBottom: 24, textAlign: 'center' }}>Tap on any of the plans to select </Text>


                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                        numColumns={SIZES.width > (188 * 2) ? 2 : 1}
                        data={plans}
                        renderItem={({ item, index }) => (
                            <PlanCard
                                onPress={() => navigation.navigate("SelectBank")}
                                containerStyles={{
                                    marginLeft: index % 2 > 0 ? 10 : 0,
                                    marginBottom: 10,
                                    width: SIZES.width > (188 * 2) ? 331 / 2 : SIZES.width
                                }} title={item?.plan_name} amount={item?.target_amount.toString()} />
                        )}
                    />
                </View>
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

