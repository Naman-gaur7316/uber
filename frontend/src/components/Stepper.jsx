import React from "react";

const Stepper = ({ step, totalSteps, titles }) => {
  return (
    <>
      <div className="flex justify-center mb-3">
        {totalSteps &&
          totalSteps > 1 &&
          Array.from({ length: totalSteps }).map((_, index) => (
            <div className="flex justify-center items-center" key={index}>
              <span
                className={`inline-flex justify-center items-center w-10 h-10 rounded-full p-3 border-2 border-black ${
                  step === index + 1 ? "bg-black text-white" : ""
                }`}
              >
                {index + 1}
              </span>
              {index < totalSteps - 1 && (
                <span className="inline-block w-20 h-0.5 bg-gray-200"></span>
              )}
            </div>
          ))}
      </div>
      <div className="text-center text-xl font-semibold mb-6">{titles[step-1]}</div>
    </>
  );
};

export default Stepper;
