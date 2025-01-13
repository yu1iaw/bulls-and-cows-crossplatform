import colors from '@/constants';
import tw from '@/lib/tailwind';
import { languageStore$, paletteStore$ } from '@/store';
import { useMemo, useState } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { NavigationState, SceneMap, SceneRendererProps, TabBar, TabDescriptor, TabView } from 'react-native-tab-view';
import Forced from './forced';
import Normal from './normal';



const renderScene = SceneMap({
    first: Normal,
    second: Forced,
});

const renderTabBar = (props: SceneRendererProps & {
    navigationState: NavigationState<{
        key: string;
        title: string;
    }>;
    options: Record<string, TabDescriptor<{
        key: string;
        title: string;
    }>> | undefined;
}) => {
    const palette = paletteStore$.palette.peek();

    return (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            pressColor='white'
            style={tw.style(`border-t-[0.5px] border-white bg-primary-darkPrimary`, { 'bg-secondary-darkPrimary': palette === "alternative" })}
        />
    )
};

export default function TopStatistics() {
    const [index, setIndex] = useState(0);
    const { width } = useWindowDimensions();
    const palette = paletteStore$.palette.peek();
    const language = languageStore$.language.peek();

    const routes = useMemo(() => ([
        { key: 'first', title: language === "ukr" ? 'Безліміт' : 'Normal' },
        { key: 'second', title: language === "ukr" ? 'Ліміт' : 'Forced' },
    ]), [language]);

  
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width }}
            lazy={({ route }) => route.title === "Forced" || route.title === "Ліміт"}
            renderTabBar={renderTabBar}
            commonOptions={{
                label: ({ route, focused, color }) => (
                    <Text style={tw.style(`text-lg font-ibm`, {'font-ibmBold': focused}, { color: focused ? (palette === "default" ? colors.primary.sandyBrown : colors.secondary.tint) : color })}>{route.title}</Text>
                ),
            }}
        />
    )
}