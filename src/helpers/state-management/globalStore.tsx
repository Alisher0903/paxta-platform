import {create} from 'zustand';
import {Global, RegionOrDistricts} from "@/types/global.ts";

const globalStore = create<Global>((set) => ({
    region: null,
    setRegion: (val: RegionOrDistricts[] | null) => set({region: val}),
    district: null,
    setDistrict: (val: RegionOrDistricts[] | null) => set({district: val}),
    getMeData: null,
    setGetMeData: (val: any | null) => set({getMeData: val}),
    imgUpload: null,
    setImgUpload: (val: any) => set({imgUpload: val}),
    notificationCounts: null,
    setNotificationCounts: (counts: number | null) => set({notificationCounts: counts}),
    meData: null,
    setMeData: (val: any | null) => set({meData: val}),
}));

export default globalStore;