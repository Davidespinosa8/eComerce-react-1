import { IoCallOutline } from "react-icons/io5";

export const CartFinalyPage = () => {

    return (
        <div className="flex flex-col mx-4 xl:ml-36 mt-16 gap-20 pb-5">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="shadow w-full lg:w-[340px] h-[457px] flex flex-col gap-8 py-10 px-8 rounded">
                    <div className="flex flex-col gap-6">
                        <div className="text-lg font-medium">Your order was success</div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full">
                                <IoCallOutline className="text-white text-2xl" />
                            </div>
                            <span className="text-lg font-medium">We will contact you</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};