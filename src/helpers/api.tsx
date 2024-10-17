export const baseURL = import.meta.env.VITE_BASE_URL;

// =============LOGIN=============
export const authLogin: string = `${baseURL}auth/login`

// =============STATISTIC DASHBOARD==============
export const eduAdminSts: string = `${baseURL}statistic`
export const eduAdminTopGroup: string = `${baseURL}statistic/top/group`
export const eduAdminTopTeacher: string = `${baseURL}statistic/top/Teacher`
export const eduAdminTopStudent: string = `${baseURL}statistic/top/Student`
export const eduAdminCategoryStsYear: string = `${baseURL}statistic/categoryYearly`
export const eduAdminCategoryStsPercentage: string = `${baseURL}statistic/categoryPercentage`
export const quizAdminSts: string = `${baseURL}statistic/countAll-quiz`
export const quizAdminWeeklySts: string = `${baseURL}statistic/weekly-statistic`
export const quizAdminPercentageSts: string = `${baseURL}statistic/percentage-resultStatus`
export const onlineAdminSts: string = `${baseURL}statistic/getOnlineCount`

//================IMG CONTROLLER======================
export const imgUploadPost: string = `${baseURL}file/upload`;
export const imgUpdate: string = `${baseURL}file/update/`;
export const imgGet: string = `${baseURL}file/files/`;

// ==================USERS====================
export const userGroupEditUser: string = `${baseURL}user/addStudentGroup/`
export const userTeacherGet: string = `${baseURL}user/teachers`
export const userConfirms: string = `${baseURL}user/searchUserAdmin`
export const userGetMe: string = `${baseURL}user/get/me`

//================CATEGORY CONTROLLER==================
export const categoryList: string = `${baseURL}category/list?categoryEnum=`
export const categoryAdd: string = `${baseURL}category/save/category?categoryEnum=`
export const categoryUpdate: string = `${baseURL}category/update/`
export const categoryDelete: string = `${baseURL}category/delete/`
export const categoryGetOne: string = `${baseURL}category/get-one/`

// ==============CATEGORY QUIZ SETTINGS CONTROLLER====================
export const quizCategorySettings: string = `${baseURL}quiz-category/settings`

// ==============QUESTION CONTROLLER====================
export const questionAllGetPage: string = `${baseURL}question/filter`
export const questionCrud: string = `${baseURL}question`

// ==============GROUP CONTROLLER====================
export const groupList: string = `${baseURL}group/list`
export const groupCrud: string = `${baseURL}group` // edit, delete, add, oneGet

// ==============RATE CONTROLLER====================
export const rateList: string = `${baseURL}rate/studentsRate`

// ==============NOTIFICATION CONTROLLER====================
export const notificationGet: string = `${baseURL}notification/all`
export const notificationRead: string = `${baseURL}notification/read`
export const notificationCount: string = `${baseURL}notification/count`
export const notificationDelete: string = `${baseURL}notification/del-registrant/`

// ==============RESULT CONTROLLER====================
export const resultSearch: string = `${baseURL}result/search`

// ==============MODULE CONTROLLER====================
export const moduleCrud: string = `${baseURL}module`
export const moduleCategoryId: string = `${baseURL}module/byCategory/` //categoryga tegishli hamma module ni get qilish
export const moduleEdu: string = `${baseURL}module/searchModuleEducation`
export const moduleOnline: string = `${baseURL}module/searchModuleOnline`

// ==============LESSON CONTROLLER====================
export const lessonPageList: string = `${baseURL}lesson/search`
export const lessonCrud: string = `${baseURL}lesson`
export const lessonModuleID: string = `${baseURL}lesson/list/edu/`

// ==============TASK CONTROLLER====================
export const taskCrud: string = `${baseURL}report`
export const taskLessonId: string = `${baseURL}task/getTaskByLesson/` //lessonga tegishli hamma module ni get qilish


//==============PAXTA==============
export const getUserList: string = `${baseURL}user/list`
export const createUser: string = `${baseURL}user/create`
export const editUser: string = `${baseURL}user/edit/`
export const deleteUser: string = `${baseURL}user/`

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

// Report 
export const reportMaster: string = `${baseURL}break-report/list/today`
export const reportPostMaster: string = `${baseURL}break-report/create`
