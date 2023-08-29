import { Text, ImageBackground, TouchableOpacity, StyleSheet, ViewStyle, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { RIGHTARROWICON } from '../constants/icons';
import { BUILDWEALTH, EXTENSIONIMG, PLANWEDDINGIMG } from '../constants/images';

interface PlanCardProps {
    containerStyles?: ViewStyle;
    title: string;
    amount: string;
    onPress?: () => void;
    extraText?: string;
    bgImage?: number
}

export const PlanCard = ({ containerStyles, title, amount, onPress, extraText, bgImage }: PlanCardProps) => {
    const BGIMAGES = [
        PLANWEDDINGIMG,
        EXTENSIONIMG,
        BUILDWEALTH
    ];
    const randomIndex = Math.floor(Math.random() * BGIMAGES.length);

    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.planCardContainer, marginLeft: 20, ...containerStyles }}>
            <ImageBackground source={bgImage ? bgImage : BGIMAGES[randomIndex]} style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', paddingHorizontal: 14, paddingBottom: 16 }}>
                <View>
                    <Text style={{ ...styles.subText, color: COLORS['off-white'] }}>{title}</Text>
                    <Text style={{ ...styles.subText, fontSize: 18, color: COLORS['off-white'] }}>${amount}</Text>
                    {extraText && <Text style={{ ...styles.subText, color: COLORS['off-white'] }}>{extraText}</Text>
                    }
                </View>
                <Image source={RIGHTARROWICON} style={{ marginLeft: 'auto', width: 14.7, height: 12.8, resizeMode: 'contain', tintColor: COLORS['off-white'] }} />
            </ImageBackground>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    subText: {
        fontSize: 15,
        color: COLORS['text-soft']
    },
    planCardContainer: {
        height: 243,
        width: 188,
        borderRadius: 12,
        overflow: 'hidden'
    },

})