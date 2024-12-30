import colors from '@/constants';
import tw from '@/lib/tailwind';
import { gameModeStore$, languageStore$, paletteStore$, speedLevelStore$ } from '@/store';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { observer } from '@legendapp/state/react';
import { Switch, SwitchProps, Text, View } from 'react-native';


type SettingsSwitchProps = SwitchProps & {
    option: "mode" | "lang" | "palette" | "speed";
    label?: string;
}

export const SettingsSwitch = observer(({ option, label, disabled }: SettingsSwitchProps) => {
    const palette = paletteStore$.palette.get();
    let value = false;
    
    switch (option) {
        case 'mode':
            const mode = gameModeStore$.mode.get();
            value = mode !== "standard";
            break;
        case 'lang':
            const language = languageStore$.language.get();
            value = language !== "ukr";
            break;
        case 'palette':
            value = palette !== "default";
            break;
        case 'speed':
            const speed = speedLevelStore$.level.get();
            value = speed !== "normal";
    }

    const onValueChange = () => {
        switch (option) {
            case 'mode':
                return gameModeStore$.mode.set(prev => prev === "standard" ? "advanced" : "standard");
            case 'lang':
                return languageStore$.language.set(prev => prev === "ukr" ? "en" : "ukr");
            case 'palette':
                return paletteStore$.palette.set(prev => prev === "default" ? "alternative" : "default");
            case 'speed':
                return speedLevelStore$.level.set(prev => prev === "normal" ? "forced" : "normal");
        }
    }


    return (
        <View style={tw`flex-row gap-x-[10px] items-center`}>
            <Switch
                trackColor={{ false: '#ccc', true: palette === "default" ? "#ffbb80" : "#c6d8d3" }}
                thumbColor={palette === "default" && value ? colors.primary.darkPrimary : palette === "alternative" && value ? colors.secondary.tint : '#f4f3f4'}
                onValueChange={onValueChange}
                value={value}
                disabled={disabled}
            />
            {(option === "mode" || option === "lang") && (
                <Text
                    style={tw.style(`font-ibmBold text-base landscape:text-xl text-secondary-lightSlateGray`, { 'text-primary-darkPrimary': value && palette === "default", "text-secondary-tint": value && palette === "alternative" })}>{label}</Text>
            )}
            {option === "palette" && (
                <View style={tw.style(`h-5 w-8 bg-teal-600 rounded`, { 'bg-secondary-tint': value && palette === "alternative" })} />
            )}
            {option === "speed" && (
                <MaterialCommunityIcons name="bike-fast" size={24} color={value && palette === "default" ? colors.primary.darkPrimary : value && palette === "alternative" ? colors.secondary.tint : colors.secondary.lightSlateGray} />
            )}
        </View>
    )
})