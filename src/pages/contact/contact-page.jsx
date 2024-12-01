import { IoCallOutline } from "react-icons/io5";
import { RedButton } from "./red-button";
import { AiOutlineMessage } from "react-icons/ai";

const Contact = () => {
  return (

    <div className="flex flex-col mx-4 xl:ml-36 mt-16 gap-20 pb-5">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="shadow w-full lg:w-[340px] h-[457px] flex flex-col gap-8 py-10 px-8 rounded">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4 items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full">
                <IoCallOutline className="text-white text-2xl" />
              </div>
              <span className="text-lg font-medium">Call Us</span>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm">Available 24/7</p>
              <p className="text-sm">Phone: +8801611112222</p>
            </div>
            <hr className="mx-full border-gray-400"></hr>
            <div className="flex flex-row gap-4 items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full">
                <AiOutlineMessage className="text-white text-2xl" />
              </div>
              <span className="text-lg font-medium">Write To US</span>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-sm">Emails: ecommercereact@exclusive.com</p>
              <p className="text-sm">Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>

        <div className="shadow w-[full] flex flex-col py-10 px-4 lg:px-8 rounded">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <input
                type="text"
                placeholder={"Your Name"}
                required
                className="lg:w-[235px] rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-base focus:border outline-none focus:border-gray-300"
              />
              <input
                type="email"
                placeholder={"Your Email"}
                required
                className="lg:w-[235px] rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-base focus:border outline-none focus:border-gray-300"
              />
              <input
                type="tel"
                placeholder={"Your Phone"}
                required
                className="lg:w-[235px] rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-base focus:border outline-none focus:border-gray-300"
              />
            </div>
            <textarea
              placeholder={"Your Message"}
              required
              className="min-h-[50px] h-[207px] rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-base focus:border outline-none focus:border-gray-300"
            />
            <div className="ml-auto">
              <RedButton name={"Send Message"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
