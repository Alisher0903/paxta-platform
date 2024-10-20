import toast from "react-hot-toast";

export const toastMessage = (code: string | number, message: string) => {
    if (+code === 1) return toast.error('Kirish taqiqlanadi');
    else if (+code === 2) return toast.error(message);
    else if (+code === 3) return toast.error(message);
    else if (+code === 4) return toast.error('Bu ma\'lumot allaqachon mavjud');
    else if (+code === 5) return toast.error(message);
    else if (+code === 6) return toast.error(message);
    else if (+code === 7) return toast.error(message);
    else if (+code === 8) return toast.error('Serverda xatolik yuz berdi');
    else return toast.error(message);
};

export const consoleClear = () => console.clear();
// export const consoleClear = () => {}

export const siteSecurity = () => {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && (
            e.key === 'shift' ||
            e.key === 'i' ||
            e.key === 'I' ||
            e.key === 'j' ||
            e.key === 'J' ||
            e.keyCode === 74 ||
            e.keyCode === 85 ||
            e.keyCode === 73
        )) || e.key === 'F12') e.preventDefault();
    });
};