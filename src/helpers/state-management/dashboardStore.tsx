import {create} from 'zustand'

type DashboardStoreType = {
    dashboardCardSts: any
    setDashboardCardSts: (val: any) => void
}

const dashboardStore = create<DashboardStoreType>((set) => ({
    dashboardCardSts: null,
    setDashboardCardSts: (val: any) => set({dashboardCardSts: val}),
}))

export default dashboardStore;