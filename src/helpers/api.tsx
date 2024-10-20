export const baseURL = import.meta.env.VITE_BASE_URL;

// =============LOGIN=============
export const authLogin: string = `${baseURL}auth/login`
export const imgUploadPost: string = `${baseURL}file/upload`;
export const imgUpdate: string = `${baseURL}file/update/`;
export const imgGet: string = `${baseURL}file/files/`;
export const userGroupEditUser: string = `${baseURL}user/addStudentGroup/`
export const userConfirms: string = `${baseURL}user/searchUserAdmin`
export const userGetMe: string = `${baseURL}user/getMe`
export const categoryList: string = `${baseURL}category/list?categoryEnum=`
export const categoryAdd: string = `${baseURL}category/save/category?categoryEnum=`
export const categoryUpdate: string = `${baseURL}category/update/`
export const categoryDelete: string = `${baseURL}category/delete/`
export const categoryGetOne: string = `${baseURL}category/get-one/`
export const quizCategorySettings: string = `${baseURL}quiz-category/settings`
export const questionAllGetPage: string = `${baseURL}question/filter`
export const questionCrud: string = `${baseURL}question`
export const groupList: string = `${baseURL}group/list`
export const rateList: string = `${baseURL}rate/studentsRate`
export const resultSearch: string = `${baseURL}result/search`
export const moduleOnline: string = `${baseURL}module/searchModuleOnline`
export const lessonModuleID: string = `${baseURL}lesson/list/edu/`


//==============PAXTA==============
// Hokim Buva Apilari
export const statistic_H_page: string = `${baseURL}statistic/dashboard/`
export const district_getOne: string = `${baseURL}machines/machines/by/district`
export const district_getOne_invalid: string = `${baseURL}break-report/invalid-machine`
export const district_getOne_report: string = `${baseURL}break-report/list/today`
export const district_getOne_report_active: string = `${baseURL}report/report/by/machine`

// ============USER===========
export const getUserList: string = `${baseURL}user/list`
export const createUser: string = `${baseURL}user/create`
export const editUser: string = `${baseURL}user/edit/`
export const deleteUser: string = `${baseURL}user/`
export const searchUser: string = `${baseURL}user/search?text=`

//==============DISTRICT============
export const districtList: string = `${baseURL}district/list`
export const districtCreate: string = `${baseURL}district/create`
export const districtEditOrDelete: string = `${baseURL}district/`

// =============SECTOR===============
export const sectorByDistrict: string = `${baseURL}sector/by/district`
export const sectorGetAll: string = `${baseURL}sector/all`
export const sectorCreate: string = `${baseURL}sector/create`
export const sectorEdit: string = `${baseURL}sector/edit/`
export const sectorDelete: string = `${baseURL}sector/`

// ===========MACHINE==========
export const machineList: string = `${baseURL}machines/list`
export const machineEdits: string = `${baseURL}machines/edit-machine/`
export const machineEditUsers: string = `${baseURL}machines/edit-user/`
export const machineCreate: string = `${baseURL}machines/create`
export const machineDeletes: string = `${baseURL}machines/delete/`
export const machineCount: string = `${baseURL}machines/count-machine`

// ============Report========
export const breakReportGetMasterList: string = `${baseURL}break-report/list`
export const breakReportAddMaster: string = `${baseURL}break-report/create`
export const breakReportEditMaster: string = `${baseURL}break-report/`
export const reportAdminGet: string = `${baseURL}report/admin`
export const reportGetMaster: string = `${baseURL}report/master`
export const reportAddMaster: string = `${baseURL}report/create`
export const reportEditMaster: string = `${baseURL}report/edit/`

// ==========FARM=========
export const farmList: string = `${baseURL}farm/list`
export const farmCreate: string = `${baseURL}farm/create`
export const farmEditOrDelete: string = `${baseURL}farm/`
export const farmCotton: string = `${baseURL}cottonPicked/list/`

// ==========COTTON=========
export const cottonGet: string = `${baseURL}cottonPicked/list`
export const cottonPost: string = `${baseURL}cottonPicked/create`
export const cottonEditOrDelete: string = `${baseURL}cottonPicked/`

// ==============STS=============
export const stsReport: string = `${baseURL}statistic/report`

// ============DOWN FILE=========
export const excelDownload: string = `${baseURL}attachment/download`

// ============NOTIFICATION=================
export const notificationCount: string = `${baseURL}notification/count/admin`
export const notificationGet: string = `${baseURL}notification/page/admin`
export const notificationRead: string = `${baseURL}notification/read`
export const notificationDelete: string = `${baseURL}notification/del-registrant/`

// ============SECTOR=========
export const statistic_sectorByDistrict: string = `${baseURL}statistic/sectorBy`
export const sector_invalid_machine: string = `${baseURL}break-report/invalid-machine/sector`
export const active_machines_by_sector: string = `${baseURL}statistic/machines/by/sector`
