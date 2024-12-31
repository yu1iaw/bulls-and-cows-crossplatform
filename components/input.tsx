import colors, { isWeb } from '@/constants';
import tw from '@/lib/tailwind';
import { PaletteStore } from '@/lib/types';
import { wp } from '@/lib/utils';
import Feather from '@expo/vector-icons/Feather';
import { ObservablePrimitive } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { useRef } from 'react';
import { TextInput, TextInputKeyPressEventData, TextInputProps, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';



type InputProps = TouchableOpacityProps & TextInputProps & {
    palette: PaletteStore["palette"];
    value$: ObservablePrimitive<string>;
    onPress: () => void;
    w: number;
}

export const Input = observer(({ palette, value$, onPress, disabled, w }: InputProps) => {
    const inputRef = useRef<TextInput>(null);
    

    const onKeyPress = ({ nativeEvent }: { nativeEvent: TextInputKeyPressEventData }) => {
        if (nativeEvent.key !== "Enter") return;
        
        onPress();
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100)
    }

    const onBtnPress = () => {
        onPress();
        isWeb && inputRef.current?.focus();
    }

    return (
        <View style={tw`flex-row self-center items-center p-4 gap-x-7 landscape:px-0 android:landscape:w-[600px] ios:landscape:w-[600px]`}>
            <TextInput
                ref={inputRef}
                value={value$.get()}
                onChangeText={(text) => value$.set(text)}
                onKeyPress={onKeyPress}
                autoFocus={isWeb}
                inputMode="numeric"
                maxLength={4}
                placeholder="1234"
                placeholderTextColor={palette === "default" ? colors.primary.sandyBrown : colors.secondary.lightSlateGray}
                style={tw.style(`flex-1 bg-primary-darkPrimary text-white px-5 py-2 border-[3px] border-white rounded-xl font-ibmBold shadow-lg text-[${wp(9, w)}px] landscape:text-[35px]`,
                    { 'bg-secondary-darkPrimary text-secondary-tint': palette === "alternative" }
                )}
            />
            <TouchableOpacity
                disabled={disabled}
                onPress={onBtnPress}
                style={tw.style(`w-18 h-18 flex-center bg-primary-darkPrimary rounded-full border-[3px] border-white shadow-lg`, { 'bg-secondary-darkPrimary': palette === "alternative" })}
            >
                <Feather name="check-circle" size={36} color={palette === "default" ? colors.primary.sandyBrown : colors.secondary.lightSlateGray} />
            </TouchableOpacity>
        </View>
    )
})