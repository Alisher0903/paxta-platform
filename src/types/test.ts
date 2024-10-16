export interface Test {
    testList: TestList[] | null
    setTestList: (val: TestList[] | null) => void
    crudTest: TestList | null
    setCrudTest: (val: TestList | null) => void
    optionDto: OptionsDto[] | null
    setOptionDto: (val: OptionsDto[] | null) => void
}

export interface TestList {
    id?: number
    name: string
    categoryId: number | null
    lessonId: number | null
    optionDto: OptionsDto[] | null
    lessonName: string
    categoryName: string
}

export interface OptionsDto {
    answer: string
    isCorrect: boolean
}