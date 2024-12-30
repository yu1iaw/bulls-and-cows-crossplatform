import { isWeb } from "@/constants";
import tw from "@/lib/tailwind";
import { PaletteStore } from "@/lib/types";
import { hp } from "@/lib/utils";
import { useFocusEffect } from "expo-router";
import LottieView from "lottie-react-native";
import { useCallback, useRef } from "react";
import { Platform, View } from 'react-native';



type SpinnerProps = {
    palette: PaletteStore["palette"];
    h: number;
}

export const Spinner = ({ palette, h }: SpinnerProps) => {
    const ref = useRef<LottieView>(null);

    useFocusEffect(
        useCallback(() => {
            !isWeb && ref.current?.play();

            return () => {
                !isWeb && ref.current?.pause();
            };
        }, [])
    );


    return (
        <View style={tw.style(`flex-center`, Platform.select({
            web: { width: hp(45, h), height: hp(45, h), alignSelf: "center" }
        }))}
        >
            <LottieView
                ref={ref}
                autoPlay={isWeb}
                // loop
                source={palette === "default"
                    ? require('@/assets/images/rubik.json')
                    : require('@/assets/images/alternative-rubik.json')
                }
                style={{
                    width: hp(30, h),
                    height: hp(30, h)
                }}
            />
        </View>
    )
}

