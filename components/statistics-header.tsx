import tw from '@/lib/tailwind';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ObservableBoolean } from '@legendapp/state';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';


type StatisticsHeaderProps = {
    isModalVisible$: ObservableBoolean;
}

export const StatisticsHeader = ({ isModalVisible$ }: StatisticsHeaderProps) => {
    return (
        <Stack.Screen
            options={{
                headerRight: ({ tintColor }) => (
                    <TouchableOpacity
                        style={tw`p-[10px] z-50`}
                        onPress={() => isModalVisible$.set(true)}
                    >
                        <MaterialIcons
                            name="cleaning-services"
                            size={29}
                            color={tintColor}
                        />
                    </TouchableOpacity>
                )
            }}
        />
    )
}