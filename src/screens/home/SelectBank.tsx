import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { CustomHeader } from '../../components'
import { CARETRIGHTICON, LEFTARROWICON } from '../../constants/icons'
import { COLORS, commonStyles, SIZES, } from '../../constants/theme'
import { BANKACCOUNTS, } from '../../constants/data'

export const SelectBank = ({ navigation }: any) => {

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

                <CustomHeader title='Select bank' icon={LEFTARROWICON} onIconPress={() => navigation.goBack()} />

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={BANKACCOUNTS}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{ ...commonStyles.row, borderTopWidth: index > 0 ? 1 : 0, borderTopColor: COLORS['off-white-003'], paddingVertical: 15, justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ ...commonStyles.grotesk, fontSize: 15 }}>{item.accountNumber}  •  <Text style={{ ...commonStyles.normalText, color: COLORS['text-soft'] }}>{item.bankName}</Text></Text>
                                    <Text style={{ ...commonStyles.normalText, marginTop: 2, fontSize: 15 }}>{item.accountName}</Text>
                                </View>
                                <Image source={CARETRIGHTICON} style={{ width: 8.118, height: 14.427, resizeMode: 'contain' }} />
                            </TouchableOpacity>
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

