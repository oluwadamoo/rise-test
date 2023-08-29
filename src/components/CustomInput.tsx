import { View, Text, Image, KeyboardType, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS, commonStyles } from '../constants/theme';

interface CustomInputProps {
    hasError?: boolean
    placeholder: string;
    value: string;
    keyboardType?: KeyboardType;
    hideText?: boolean;
    setValue: (val: string) => void;
    icon?: number;
    label?: string;
    onIconPress?: () => void;
    extraData?: any;
    placeholderPosX?: number;
    editable?: boolean;
    onEndEditing?: () => void;
    onFocus?: () => void;
    maxLength?: number

}
export const CustomInput = ({ onFocus, hasError, onEndEditing, maxLength, editable, label, placeholderPosX, extraData, placeholder, value, icon, keyboardType, onIconPress, hideText, setValue }: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const placeholderAnimation = useRef(new Animated.Value(0));

    const handleFocus = () => {
        if (onFocus) {
            onFocus()
        }
        Animated.timing(placeholderAnimation.current, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();

        setIsFocused(true);
    };

    const handleBlur = () => {
        if (value === '') {
            Animated.timing(placeholderAnimation.current, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();

            setIsFocused(false);
        }
    };

    const animatePlaceholder = placeholderAnimation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -25],
    });

    return (
        <View style={{ ...styles.inputContainer, borderColor: hasError ? COLORS['instructive-red'] : isFocused ? COLORS['teal-001'] : COLORS.border }}>

            <Animated.View
                style={{
                    position: 'absolute',
                    left: placeholderPosX && !isFocused ? placeholderPosX : isFocused ? 15 : 5,
                    height: 17,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isFocused ? COLORS['off-white'] : 'transparent',
                    top: '72%',
                    transform: [{ translateY: animatePlaceholder }],
                }}
            >
                <Text
                    style={{ ...commonStyles.boldText, fontSize: isFocused ? 10 : 15, color: hasError ? COLORS['instructive-red'] : isFocused ? COLORS['teal-001'] : COLORS['input-color'] }}
                >
                    {(isFocused && label) ? label : isFocused && placeholder ? placeholder : !value.length ? placeholder : ''}
                </Text>
            </Animated.View>

            {extraData}
            <TextInput
                style={styles.input}
                keyboardType={keyboardType}
                value={value}
                maxLength={maxLength}
                onChangeText={setValue}
                placeholderTextColor={COLORS['input-color']}
                secureTextEntry={hideText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                editable={editable}
                onEndEditing={onEndEditing}
            />

            {icon && <TouchableOpacity style={{ marginLeft: 15 }}
                disabled={!onIconPress}
                onPress={() => {
                    if (onIconPress) {
                        onIconPress()
                        if (onFocus) {
                            onFocus()
                        }
                    }
                }}
            >
                <Image source={icon} style={{ height: 23, width: 23, resizeMode: 'contain' }} />
            </TouchableOpacity>}

        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        marginBottom: 17
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS['input-color'],
        ...commonStyles.boldText
    }

})
