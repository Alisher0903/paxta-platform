export interface Courses {
    courseData: null | CoursesList[];
    setCourseData: (val: null | CoursesList[]) => void;
    crudValue: null | CoursesClientCrudVal | CoursesList;
    setCrudValue: (val: null | CoursesClientCrudVal | CoursesList) => void;
    crudValueDef: CoursesClientCrudVal;
    editOrDeleteStatus: string
    setEditOrDeleteStatus: (val: string) => void
}

export interface CoursesClientCrudVal {
    id?: number
    name: string
    description: string
    fileId: string | number | null
}

export interface CoursesList {
    id: number
    name: string
    description: string
    categoryEnum: string
    active: boolean
    countQuiz: number
    durationTime: number
    fileId: null | number | string
    moduleCount: number
}