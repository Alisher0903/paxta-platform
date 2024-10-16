import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {BorderBeam} from "@/components/magicui/border-beam.tsx";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {CoursesClientCrudVal, CoursesList} from "@/types/course.ts";
import {useNavigate} from "react-router-dom";

export function CourseCard({imgUrl, title, desc, openModal, fullData}: {
    imgUrl: any,
    title: string,
    desc: string,
    openModal?: () => void,
    fullData?: CoursesList | CoursesClientCrudVal | any
}) {
    const navigate = useNavigate()
    const admin_role = sessionStorage.getItem('admin_roles');
    const {setEditOrDeleteStatus, setCrudValue} = courseStore()
    return (
        <CardContainer className="inter-var w-full">
            <CardBody
                className="bg-gray-50 relative group/card border-veryPaleGreen w-full h-auto rounded-xl p-6 border"
            >
                <BorderBeam size={200} duration={10} delay={2} colorFrom={`#16423C`}/>
                <CardItem translateZ="60" className="w-full">
                    <span
                        className={`hover:cursor-pointer`}
                        onClick={() => {
                            if (admin_role === 'ADMIN_QUIZ') navigate(`/quiz/category/${fullData.id}`)
                        }}
                    >
                        <img
                            src={imgUrl}
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </span>
                </CardItem>
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 mt-5"
                ><p
                    className={`hover:cursor-pointer hover:text-lighterGreen duration-300`}
                    onClick={() => {
                        if (admin_role === 'ADMIN_QUIZ') navigate(`/quiz/category/${fullData.id}`)
                    }}
                >{title}</p></CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm mt-2"
                >{desc}</CardItem>
                <CardItem translateZ={'50'} className={`w-full mt-10 flex justify-between items-center gap-2`}>
                    <ShinyButton
                        icon={<FaEdit size={25}/>}
                        text={`Edit`}
                        className={`bg-darkGreen w-full py-3`}
                        onClick={() => {
                            if (openModal && fullData) {
                                setCrudValue(fullData)
                                openModal()
                            }
                            setEditOrDeleteStatus('EDIT')
                        }}
                    />
                    <ShinyButton
                        icon={<MdDelete size={25}/>}
                        text={`Delete`}
                        className={`bg-darkGreen w-full py-3`}
                        onClick={() => {
                            if (openModal && fullData) {
                                setCrudValue(fullData)
                                openModal()
                            }
                            setEditOrDeleteStatus('DELETE')
                        }}
                    />
                </CardItem>
            </CardBody>
        </CardContainer>
    );
}
