import tw from '@/lib/tailwind';
import { LanguageStore } from '@/lib/types';
import { hp } from '@/lib/utils';
import { Text, View } from 'react-native';


type RulesProps = {
    language: LanguageStore["language"];
    h: number;
}

export const Rules = ({ language, h }: RulesProps) => {
    const content = language === "en"
        ? <Text>The goal of the game is to guess a four-digit number. All digits must be different. The number of <Text style={tw`underline`}>bulls</Text> means
            the number of guessed digits in the correct positions, the number of <Text style={tw`underline`}>cows</Text> is the number of guessed digits in
            the wrong positions. Let's play! </Text>
        : <Text>Мета гри - вгадати чотиризначне число. Всі цифри мають бути різними. Кількість <Text style={tw`underline`}>биків</Text> означає кількість
            вгаданих цифр на правильних позиціях, кількість <Text style={tw`underline`}>корів</Text> - кількість вгаданих цифр не на своїх позиціях. Нумо
            грати! </Text>


    return (
        <View style={tw.style(`flex-center p-2 landscape:p-[${hp(5, h)}px]`)}>
            <Text style={tw.style(`font-caveatSemi text-darkGray text-center text-[${hp(4, h)}px] landscape:text-[${hp(5.5, h)}px]`)}>{content}</Text>
        </View>
    )
}