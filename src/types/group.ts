export interface Group {
    crudGroup: GroupCreate;
    setCrudGroup: (val: GroupCreate | any) => void;
    defVal: GroupCreate;
}

export interface GroupLists {
    groupId: number
    name: string
    teacherName: string
    categoryId: number
    startDate: string
    active: boolean
}

export interface GroupCreate {
    id?: number
    name: string
    categoryId: number
    teacherId: number
    daysWeekIds: string
    startDate: string
    startTime: string
    endTime: string
}