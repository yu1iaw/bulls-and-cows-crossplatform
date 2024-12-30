import { DraftRow } from "@/components/draft-row";
import { DraftScrollable } from "@/components/draft-scrollable";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { MotionList } from "@/components/motion-list";
import { Rules } from "@/components/rules";
import { Spinner } from "@/components/spinner";
import { isWeb } from '@/constants';
import tw from '@/lib/tailwind';
import { Attempt } from "@/lib/types";
import { generator, guessNumber, hp } from "@/lib/utils";
import { gameModeStore$, languageStore$, paletteStore$, speedLevelStore$, statisticsStore$, switcherStore$ } from "@/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Motion } from "@legendapp/motion";
import { Computed, observer, Show, useObservable } from "@legendapp/state/react";
import * as Haptics from 'expo-haptics';
import { router } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { Keyboard, Platform, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Modal from 'react-native-modal';



let time = 120;

const Index = observer(function Index() {
	const language = languageStore$.language.get();
	const palette = paletteStore$.palette.get();
	const gameMode = gameModeStore$.mode.get();
	const speedLevel = speedLevelStore$.level.get();
	switcherStore$.onChange(() => onResetPress(), { initial: false });
	const keyboard$ = useObservable(false);
	const inputValue$ = useObservable('');
	const gameTracking$ = useObservable({ seekingValue: '0', finished: false });
	const attempts$ = useObservable<Attempt[]>([]);
	const noAttempts$ = useObservable(() => !!!attempts$.length);
	const timeIntervalTitle$ = useObservable("");
	const isModalVisible$ = useObservable(false);
	const scrollviewRef = useRef<ScrollView>(null);
	const idRef = useRef(0);
	const { height, width } = useWindowDimensions();	

	const generatedNumber = useMemo(() => {
		return generator(gameMode);
	}, [gameMode, gameTracking$.seekingValue.get()])


	useEffect(() => {
		time = 120;
		timeIntervalTitle$.set("");
		if (speedLevel === "normal" || !attempts$.length || gameTracking$.finished.get()) return;

		const timerId = setInterval(() => {
			const min = Math.floor(time / 60);
			const sec = `0${time % 60}`.slice(-2);

			timeIntervalTitle$.set(min
				? `${min}${language === "ukr" ? 'хв' : 'min'} ${sec}${language === "ukr" ? 'с' : 's'}`
				: `${sec}${language === "ukr" ? 'с' : 's'}`
			);
			if (time <= 15) {
				if (Platform.OS !== "web") {
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				}
			}
			if (time <= 0) {
				clearInterval(timerId);
				const newAttempt = {
					id: ++idRef.current,
					value: generator("advanced"),
					result: ""
				};
				newAttempt.result = guessNumber(newAttempt.value, generatedNumber, language);
				attempts$.unshift(newAttempt);
				scrollviewRef.current?.scrollTo({ x: 0, y: 0 });

				if (newAttempt.result.includes("4 бика") || newAttempt.result.includes("4 bulls")) {
					gameTracking$.assign({ seekingValue: newAttempt.value, finished: true });
					router.navigate({ pathname: "/result", params: { title: newAttempt.value } });
					if (newAttempt.id > 10) {
						statisticsStore$["11+"].set(prev => prev ? ++prev : 1);
					} else {
						statisticsStore$[newAttempt.id].set(prev => prev ? ++prev : 1);
					}
				}
			}
			time -= 1;
		}, 1000)

		return () => {
			clearInterval(timerId);
		}

	}, [speedLevel, attempts$.length, gameTracking$.finished.get()])


	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			keyboard$.set(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			keyboard$.set(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);


	const onStartPress = () => {
		const value = inputValue$.peek();

		if (value.split('').find(n => value.indexOf(n) !== value.lastIndexOf(n)) || !value || value.length < 4 || /\D/g.test(value)) {
			isModalVisible$.set(true);
			return;
		}

		const newAttempt = {
			id: ++idRef.current,
			value,
			result: guessNumber(value, generatedNumber, language),
		};
		inputValue$.set("");

		if (newAttempt.result.includes("4 бика") || newAttempt.result.includes("4 bulls")) {
			gameTracking$.assign({ seekingValue: newAttempt.value, finished: true });
			router.navigate({ pathname: "/result", params: { title: newAttempt.value } });
			if (newAttempt.id > 10) {
				statisticsStore$["11+"].set(prev => prev ? ++prev : 1);
			} else {
				statisticsStore$[newAttempt.id].set(prev => prev ? ++prev : 1);
			}
		}

		attempts$.unshift(newAttempt);
		scrollviewRef.current?.scrollTo({ x: 0, y: 0 });
	}

	const onResetPress = () => {
		attempts$.set([]);
		gameTracking$.finished.set(false);
		idRef.current = 0;
	}


	return (
		<>
			<Computed>
				{() => (
					<Header
						gameTracking={gameTracking$.get()}
						noAttempts={noAttempts$.get()}
						timeIntervalTitle={timeIntervalTitle$.get()}
						language={language}
						palette={palette}
					/>
				)}
			</Computed>

			<View style={tw`flex-1`}>
				<Input
					disabled={gameTracking$.finished.peek()}
					palette={palette}
					value$={inputValue$}
					onPress={onStartPress}
					w={width}
				/>
				<View style={tw.style(`flex-2`, { 'portrait:flex-3': height > 600 }, { 'w-[1000px] self-center pt-5 pb-10': isWeb })}>
					<ScrollView
						ref={scrollviewRef}
						contentContainerStyle={tw.style(`gap-y-2 p-2 landscape:gap-y-1`, { 'pt-5': isWeb })}
						showsVerticalScrollIndicator={false}
					>
						<Show
							if={!noAttempts$.get()}
							else={gameTracking$.seekingValue.get() === "0"
								? <Rules language={language} h={height} />
								: <Spinner palette={palette} h={height} />
							}
						>
							<MotionList
								attempts$={attempts$}
								language={language}
								palette={palette}
								w={width}
								h={height}
							/>
						</Show>
					</ScrollView>
					<Show
						if={gameTracking$.finished}
					>
						<Motion.View
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ type: "tween", duration: 200, delay: 300, ease: "circOut" }}
							style={tw`z-10`}
						>
							<TouchableOpacity
								activeOpacity={0.95}
								onPress={onResetPress}
								style={tw.style(`bg-primary-darkPrimary absolute -bottom-8 left-[50%] w-[50%] items-center p-2 border-[3px] border-white rounded-md shadow-sm z-10`, { 'bg-secondary-darkPrimary': palette === "alternative" }, { transform: [{ translateX: isWeb ? -1000 / 4 : -width / 4 }] })}
							>
								<Text style={tw.style('text-[17px] landscape:text-[21px] font-ibmBold text-primary-tint', { 'text-secondary-lightSlateGray': palette === "alternative" })}>{language === "ukr" ? "Рестарт" : "Restart"}</Text>
							</TouchableOpacity>
						</Motion.View>
					</Show>
				</View>
				<Computed>
					{() => (
						<Show if={!noAttempts$.get() && !isWeb}>
							<View style={tw.style(`flex-2`, { 'hidden': keyboard$.get() })}>
								<Text style={tw.style(`text-[#2F4F4F] text-center text-[22px] landscape:text-[26px] font-playfair mb-2`)}>{language === "en" ? 'ROUGH DRAFT' : 'ЗАПИСНИК'}</Text>
								<DraftRow w={width} h={height} language={language} />
								<DraftScrollable palette={palette} w={width} h={height} />
							</View>
						</Show>
					)}
				</Computed>
			</View>
			<Computed>
				{() => (
					<Modal
						isVisible={isModalVisible$.get()}
						onBackdropPress={() => isModalVisible$.set(false)}
						backdropColor="dimgray"
						supportedOrientations={["landscape", "portrait"]}
					>
						<View style={tw`bg-rose-50 p-4 gap-y-4 items-center`}>
							<Ionicons name="warning-outline" size={26} color="orangered" />
							<Text style={tw.style(`font-caveatSemi text-darkGray text-center text-[${hp(4, height)}px] landscape:text-4xl`, { fontSize: isWeb && hp(5.5, height) })}>
								{language === "en"
									? '4-digit number is required and all digits must be different '
									: 'Не допускаються однакові цифри та число менше чотиризначного '}
							</Text>
							<TouchableOpacity onPress={() => isModalVisible$.set(false)} style={tw`self-end p-2`}>
								<Text style={tw.style(`text-darkGray font-ibm text-[17px]`, { fontSize: Platform.OS === 'web' && hp(3.8, height) })}>{language === "en" ? 'Okay!' : 'Святий Ґрааль!'}</Text>
							</TouchableOpacity>
						</View>
					</Modal>
				)}
			</Computed>
		</>
	);
})

export default Index;