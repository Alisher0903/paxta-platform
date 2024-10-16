import {create} from 'zustand';
import {OptionsDto, Test, TestList} from "@/types/test.ts";

const testStore = create<Test>((set) => ({
    testList: null,
    setTestList: (val: TestList[] | null) => set({testList: val}),
    crudTest: null,
    setCrudTest: (val: TestList | null) => set({crudTest: val}),
    optionDto: null,
    setOptionDto: (val: null | OptionsDto[]) => set({optionDto: val}),
}));

export default testStore;