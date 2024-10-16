const CheckboxMain = ({isChecked, setIsChecked, id, style}: {
    setIsChecked: (val: boolean) => void,
    isChecked: boolean,
    id: number,
    style?: any
}) => {
    return (
        <div>
            <label
                htmlFor={`checkbox${id}`}
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id={`checkbox${id}`}
                        className="sr-only"
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <div
                        className={`box mr-2 flex ${style ? `h-${style} w-${style}` : 'h-5 w-5'} items-center justify-center rounded border ${
                            isChecked && 'border-darkGreen bg-whiteGreen'
                        }`}
                    >
                        <span className={`text-darkGreen opacity-0 ${isChecked && '!opacity-100'}`}>
                          <svg
                              className="h-3.5 w-3.5 stroke-current"
                              fill="none"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </span>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default CheckboxMain;
