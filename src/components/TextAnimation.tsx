import React, { useState, useEffect } from 'react';
import { View, Text, TextStyle } from 'react-native';
import { COLORS, commonStyles } from '../constants/theme';

interface TextAnimationProps {
    text: string;
    textStyle?: TextStyle
}
export const TextAnimation = ({ text, textStyle }: TextAnimationProps) => {
    const [animatedText, setAnimatedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setAnimatedText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 0.005);
            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    return (
        <View>
            <Text style={{ ...commonStyles.boldText, fontSize: 13, color: COLORS['instructive-red'], ...textStyle }}>{animatedText}</Text>
        </View>
    );
};

