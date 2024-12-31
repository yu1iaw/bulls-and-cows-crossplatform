import { SettingsSwitch } from '@/components/settings-switch';
import tw from '@/lib/tailwind';
import { hp, wp } from '@/lib/utils';
import { useLocalSearchParams } from 'expo-router';
import { useWindowDimensions, View } from "react-native";


export default function Settings() {
    const { set } = useLocalSearchParams();
    const { width, height } = useWindowDimensions();

    return (
        <View style={tw`flex-1 items-end`}>
            <View style={tw`gap-y-5 p-[${wp(6.5, width)}px] landscape:p-[${hp(8.5, height)}px]`}>
                <SettingsSwitch option="mode" label='0123' disabled={set === "off"} />
                <SettingsSwitch option='lang' label='EN' disabled={set === "off"} />
                <SettingsSwitch option='palette' disabled={set === "off"} />
                <SettingsSwitch option='speed' disabled={set === "off"} />
            </View>
        </View>
    )
}