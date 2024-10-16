// inputga html kodlarini kiritishni taqiqlaydi
export const validateText = (inputText: string) => {
    const htmlPattern = /<[^>]*>/g;

    if (htmlPattern.test(inputText)) return ''

    return inputText;
};

