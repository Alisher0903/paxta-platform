// phone number ni backend fotmatda junatish uchun
export const formatedNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/[\s+()-]/g, '');
    const phonePattern = /^(?:\+998|998)\d{9}$/;

    if (phonePattern.test(cleaned)) return cleaned;
};

// inputga html kodlarini kiritishni taqiqlaydi
export const validateText = (inputText: string) => {
    const htmlPattern = /<[^>]*>/g;

    if (htmlPattern.test(inputText)) return ''

    return inputText;
};

