import {create} from 'zustand';
import {Courses, CoursesClientCrudVal, CoursesList} from "@/types/course.ts";

const courseStore = create<Courses>((set) => ({
    courseData: null,
    setCourseData: (val: null | CoursesList[]) => set({courseData: val}),
    crudValueDef: {
        name: '',
        description: '',
        fileId: 0
    },
    crudValue: {
        name: '',
        description: '',
        fileId: 0
    },
    setCrudValue: (val: null | CoursesList | CoursesClientCrudVal) => set({crudValue: val}),
    editOrDeleteStatus: '',
    setEditOrDeleteStatus: (val: string) => set({editOrDeleteStatus: val}),
}));

export default courseStore;