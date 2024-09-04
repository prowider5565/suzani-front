import React from "react";
import { getCompanyInfo } from "../../hooks/productsHook";
import parse from "html-react-parser";

const Contact = () => {
  // const { data } = getCompanyInfo();

  return (
    <div className="main-container min-h-[50vh] py-10 ">
      <h1 className="text-2xl mt-8">Biz bog'lanish:</h1>
      <div className=" flex flex-col xl:flex-row gap-8">
        <div className="border border-gray-500 rounded-md p-5 ">
          <h1>
            Manzilimiz:{" "}
            <div className="font-semibold">
              Наманган шаҳар Жийдакапа кўчаси 13А-уй
            </div>
          </h1>
          <div>
            Telefon raqamlar:
            <div>
              <p>+998 90-909-34-63</p>
              <p>+998 90-909-34-63</p>
              <p>+998 90-909-34-63</p>
              <p>+998 90-909-34-63</p>
            </div>
          </div>
          <span className="pr-2">Email:</span>
          <span>
            <a href="Abdulbositisakjanov@mail.ru" className="break-all">
              Abdulbositisakjanov@mail.ru
            </a>
          </span>
        </div>
        <div className="border border-gray-500 flex-1 rounded-md">
          {/* {parse(data ? data?.location : "")}  */}
          <iframe
            className="w-full h-full min-h-[300px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10178.35214891267!2d71.65137886150171!3d40.996032742116746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4b55f0a4c2c7%3A0xf67db43a49c6632!2z0J3QsNC80LDQvdCz0LDQvSDQqNCw0YXQsNGA!5e0!3m2!1sru!2s!4v1724853906641!5m2!1sru!2s"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
