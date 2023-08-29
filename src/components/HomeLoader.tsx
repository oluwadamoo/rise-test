import { Animated, Easing, View } from "react-native";
import React from "react";
import { COLORS, SIZES, commonStyles } from "../constants/theme";

export const HomeLoader = () => {
  const animatedOpacity = React.useRef(new Animated.Value(1));

  Animated.loop(
    Animated.timing(animatedOpacity.current, {
      toValue: 0.3,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FCFAFE",
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: animatedOpacity.current,
          padding: SIZES.padding,
          paddingTop: SIZES.padding * 2,
          backgroundColor: "#FCFAFE",
        }}
      >
        <View style={{ ...commonStyles.row, justifyContent: 'space-between' }}>
          <View>
            <View style={{ borderRadius: 5, height: 10, width: 70, backgroundColor: COLORS.border }} />
            <View style={{ borderRadius: 5, height: 15, marginTop: 5, width: 50, backgroundColor: COLORS.border }} />
          </View>

          <View style={{ ...commonStyles.row }}>
            <View style={{ width: 80, height: 30, borderRadius: 15, backgroundColor: COLORS.border }} />
            <View style={{ marginLeft: 10, width: 25, height: 25, borderRadius: 15, backgroundColor: COLORS.border }} />
          </View>
        </View>




        <View
          style={{
            marginTop: SIZES.padding,
            borderRadius: 5,
            height: 200,
            backgroundColor: COLORS.border,
          }}
        />

        <View style={{ ...commonStyles.row, marginTop: 20, justifyContent: 'space-between' }}>
          <View>
            <View style={{ borderRadius: 5, height: 15, marginTop: 5, width: 50, backgroundColor: COLORS.border }} />
          </View>

          <View style={{ ...commonStyles.row }}>
            <View style={{ width: 70, height: 10, borderRadius: 15, backgroundColor: COLORS.border }} />
          </View>


        </View>

        <View style={{ width: 300, marginTop: 10, height: 10, borderRadius: 15, backgroundColor: COLORS.border }} />
        <View style={{ width: 30, marginTop: 5, height: 10, borderRadius: 15, backgroundColor: COLORS.border }} />

        <View style={{ ...commonStyles.row }}>
          {
            [0, 0, 0].map((_, i) => (
              <View
                key={i}
                style={{
                  marginRight: 20,
                  marginTop: SIZES.padding,
                  borderRadius: 5,
                  width: '45%',
                  height: 200,
                  backgroundColor: COLORS.border,
                }}
              />

            ))
          }
        </View>

        <View
          style={{
            marginTop: SIZES.padding,
            borderRadius: 5,
            height: 40,
            backgroundColor: COLORS.border,
          }}
        />

        <View
          style={{
            marginTop: SIZES.padding,
            borderRadius: 5,
            height: 100,
            backgroundColor: COLORS.border,
          }}
        />

      </Animated.View>
    </View>
  );
};

