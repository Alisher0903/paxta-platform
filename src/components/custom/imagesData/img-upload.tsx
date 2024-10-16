import {useEffect, useState} from 'react';
import {BiSolidImageAdd} from 'react-icons/bi';
import {config} from "@/helpers/token.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import {imgGet, imgUpdate, imgUploadPost} from "@/helpers/api.tsx";
import globalStore from "@/helpers/state-management/globalStore.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import toast from "react-hot-toast";

const ImageUpload = ({imgID, textType}: { imgID?: string | number, textType?: boolean }) => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>(null);
    const {setImgUpload, imgUpload} = globalStore();
    const {loading, response, globalDataFunc} = useGlobalRequest(imgUploadPost, 'POST', formData, config)
    const editImg = useGlobalRequest(`${imgUpdate}${imgID}`, 'PUT', formData, config)

    useEffect(() => {
        if (response) {
            setImgUpload(response)
            consoleClear()
        } else if (editImg.response) {
            setImgUpload(response)
            consoleClear()
        }
    }, [response, editImg.response]);

    useEffect(() => {
        if (formData) {
            if (imgID) editImg.globalDataFunc()
            else globalDataFunc()
        }
    }, [formData]);

    useEffect(() => {
        if (!imgUpload) setSelectedFile(null)
    }, [imgUpload]);

    const handleImageChange = async (event: any) => {
        const file = event.target.files[0];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        const imageTypes = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG'];
        const fileTypes = ['pdf', 'pptx', 'doc', 'docx', 'zip'];

        if (imageTypes.includes(fileExtension || '') || fileTypes.includes(fileExtension || '')) {
            const formData = new FormData();
            formData.append('file', file);
            setFormData(formData);

            if (imageTypes.includes(fileExtension || '')) {
                const reader = new FileReader();
                reader.onloadend = () => setSelectedFile(reader.result);
                reader.readAsDataURL(file);
                setFileName(null);
            } else {
                setSelectedFile(null);
                setFileName(file.name);
            }
        } else {
            toast.error('Fayl formati noto\'g\'ri! Iltimos, faqat jpg, jpeg, png, pdf, pptx, doc, docx, zip fayllarni yuklang.');
            return;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-40 h-28 bg-lighterGreen rounded-lg p-4">
            <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
            >
                {loading ? (
                    <span className="text-black font-semibold text-base">Yuklanmoqda...</span>
                ) : selectedFile || imgID ? (
                    selectedFile ? (
                        <img
                            src={selectedFile}
                            alt="Selected"
                            className="w-40 h-28 object-contain"
                        />
                    ) : imgID ? (
                        <img
                            src={imgGet + imgID}
                            alt="Selected"
                            className="w-40 h-28 object-contain"
                        />
                    ) : null
                ) : fileName ? (
                    <span className="text-black font-semibold text-base">{fileName}</span>
                ) : (
                    <div className="text-whiteGreen text-center">
                        <div className="flex justify-center items-center">
                            <BiSolidImageAdd className="text-7xl"/>
                        </div>
                        <span className="font-semibold text-base">{textType ? 'Fayl yuklash' : 'Rasm yuklash'}</span>
                    </div>
                )}
            </label>
            <input
                id="image-upload"
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.pptx,.zip"
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    );
};

export default ImageUpload;
