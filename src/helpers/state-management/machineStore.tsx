import {create} from 'zustand';
import {Machine, GroupCreate} from "@/types/machine.ts";

const machineStore = create<Machine>((set) => ({
    crudMachine: {
        districtId: 0,
        farmName: '',
        ownerFullName: '',
        ownerPhoneNumber: '',
        machineId: '',
        machineModel: '',
        year: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        lavozimi: ''
    },
    defVal: {
        districtId: 0,
        userIdIs: '',
        farmName: '',
        ownerFullName: '',
        ownerPhoneNumber: '',
        machineId: '',
        machineModel: '',
        year: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        lavozimi: ''
    },
    setCrudMachine: (v: GroupCreate) => set({crudMachine: v}),
}));

export default machineStore;