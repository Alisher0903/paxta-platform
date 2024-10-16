import {create} from 'zustand';
import {Group, GroupCreate} from "@/types/group.ts";

const groupStore = create<Group>((set) => ({
    crudGroup: {
        name: '',
        categoryId: 0,
        daysWeekIds: '',
        teacherId: 0,
        startDate: '',
        startTime: '',
        endTime: ''
    },
    defVal: {
        name: '',
        categoryId: 0,
        daysWeekIds: '',
        teacherId: 0,
        startDate: '',
        startTime: '',
        endTime: ''
    },
    setCrudGroup: (v: GroupCreate) => set({crudGroup: v}),
}));

export default groupStore;