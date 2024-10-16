import {useEffect, useState} from 'react';
import {IoIosAddCircle, IoIosRemoveCircle} from "react-icons/io";
import CheckboxMain from "@/components/custom/checkbox/checkbox.tsx";
import testStore from "@/helpers/state-management/testStore.tsx";

const TestCrudCheck = ({defQues}: { defQues?: any }) => {
    const {setOptionDto, optionDto} = testStore();
    const [questions, setQuestions] = useState([{answer: '', isCorrect: false}]);

    useEffect(() => {
        setOptionDto(questions);
    }, [questions]);

    useEffect(() => {
        optionDto && setQuestions(optionDto);
    }, [optionDto]);

    useEffect(() => {
        if (defQues) {
            const formattedDefQues = defQues.map((q: any) => ({answer: q.answer, isCorrect: q.isCorrect}));
            setQuestions(formattedDefQues);
        }
    }, [defQues]);

    const addQuestion = () => {
        const newQuestion = {
            answer: '',
            isCorrect: false,
        };
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = (index: number) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((_, i) => i !== index));
        }
    };

    const handleCheckboxChange = (index: number) => {
        setQuestions(questions.map((question, i) =>
            i === index ? {...question, isCorrect: !question.isCorrect} : {...question, isCorrect: false}
        ));
    };

    const handleTextChange = (index: number, newText: string) => {
        setQuestions(questions.map((question, i) =>
            i === index ? {...question, answer: newText} : question
        ));
    };

    return (
        <>
            <div className="mt-4">
                {questions.map((question, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <CheckboxMain
                            id={index}
                            isChecked={question.isCorrect}
                            setIsChecked={() => handleCheckboxChange(index)}
                            style={7}
                        />
                        <input
                            type="text"
                            value={question.answer}
                            onChange={(e) => handleTextChange(index, e.target.value)}
                            placeholder="Javobni kiriting..."
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                        />
                        <button onClick={addQuestion} className="text-green-500 ml-2 scale-150">
                            <IoIosAddCircle/>
                        </button>
                        <button
                            onClick={() => removeQuestion(index)}
                            className={`text-red-500 ml-2 scale-150 ${questions.length === 1 ? 'cursor-not-allowed opacity-30' : ''}`}
                            disabled={questions.length === 1}
                        ><IoIosRemoveCircle/></button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TestCrudCheck;
