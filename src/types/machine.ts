export interface Machine {
    crudMachine: GroupCreate;
    setCrudMachine: (val: GroupCreate | any) => void;
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
    district?: number
    districtName?: string
    districtId: number,
    farmName: string,
    ownerFullName: string,
    ownerPhoneNumber: string,
    machineId: string,
    machineModel: string,
    year: number
    firstName: string,
    lastName: string,
    phoneNumber: string,
    password: string,
    lavozimi: string
}