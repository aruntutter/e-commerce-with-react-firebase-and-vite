import React, { useContext } from "react";
import myContext from "../../context/data/myContext";

const Track = () => {
  const context = useContext(myContext);
  const { toggleMode, mode } = context;

  return (
    <div className="flex justify-center space-x-4 mb-2">
      {" "}
      <section className="text-gray-600 body-font flex-1">
        <div className="container mx-auto px-5 md:py-5">
          <div
            className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-blue-300 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg flex flex-col items-center"
            style={{
              backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-black-600 w-12 h-12 mb-3 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            <h2
              className="title-font font-medium text-lg text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Free Shipping
            </h2>
            <p className="leading-relaxed">We ship all over India for FREE.</p>
          </div>
        </div>
      </section>
      {/* Exciting Offers */}
      <section className="text-gray-600 body-font flex-1">
        <div className="container mx-auto px-5 md:py-5">
          <div
            className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-blue-300 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg flex flex-col items-center"
            style={{
              backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-black-600 w-12 h-12 mb-3 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <h2
              className="title-font font-medium text-lg text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Exciting Offers
            </h2>
            <p className="leading-relaxed">
              We provide amazing offers & discounts
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Track;
