import tw from '@/lib/tailwind';
import { hp } from '@/lib/utils';
import LottieView from 'lottie-react-native';
import { useWindowDimensions, View } from 'react-native';


type AnimstedSplashProps = {
    setAnimationLoopEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AnimatedSplash = ({ setAnimationLoopEnded }: AnimstedSplashProps) => {
    const { height: h } = useWindowDimensions();

    return (
        <View style={tw`flex-1 flex-center bg-slate-100`}>
            <LottieView
                autoPlay
                loop={false}
                source={require('@/assets/images/alter-palette.json')}
                style={{ width: hp(40, h), height: hp(40, h) }}
                onAnimationFinish={() => setAnimationLoopEnded(true)}
                resizeMode='contain'
            />
        </View >
    )
}