import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const UPIOptions = ['Paytm', 'Google Pay', 'iMobile UPI'];
const CardOptions = ['Credit Card', 'Debit Card'];

const Payments = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const merchantMetadata = useSelector((state) => state.merchantMetadata);

  const paymentMethods = orderDetails.data?.paymentMethods || [];
  const [openItems, setOpenItems] = useState(Array(UPIOptions.length + CardOptions.length + 1).fill(false));

  useEffect(() => {
    if (merchantMetadata && merchantMetadata.data && merchantMetadata.data.theme) {
      const { theme } = merchantMetadata.data;
      document.documentElement.style.setProperty('--background', theme['--background']);
      document.documentElement.style.setProperty('--foreground', theme['--foreground']);
      document.documentElement.style.setProperty('--primary', theme['--primary']);
      document.documentElement.style.setProperty('--primary-foreground', theme['--primary-foreground']);
    }
  }, [merchantMetadata]);

  const handleOpen = (index) => {
    setOpenItems(openItems.map((item, idx) => (idx === index ? !item : item)));
  };

  const renderAccordionBody = (method, index) => openItems[index] ? (
    <AccordionBody className="bg-var(--background) p-4">
      <button style={{ backgroundColor: 'var(--primary-foreground)', color: 'var(--primary)' }} className="py-2 px-4 rounded-md hover:bg-opacity-90 transition ease-in-out duration-150">
        Pay with {method}
      </button>
    </AccordionBody>
  ) : null;

  const renderCardInputs = (method, index) => openItems[index] ? (
    <AccordionBody className="bg-var(--background) p-4 flex flex-col gap-3">
      <input style={{ backgroundColor: 'var(--primary-foreground)', color: 'var(--primary)' }} type="text" placeholder="Card number" className="input input-bordered w-full max-w-xs" />
      <input style={{ backgroundColor: 'var(--primary-foreground)', color: 'var(--primary)' }} type="text" placeholder="Valid Through (MM/YY)" className="input input-bordered w-full max-w-xs" />
      <input style={{ backgroundColor: 'var(--primary-foreground)', color: 'var(--primary)' }} type="text" placeholder="CVV" className="input input-bordered w-full max-w-xs" />
      <input style={{ backgroundColor: 'var(--primary-foreground)', color: 'var(--primary)' }} type="text" placeholder="Name on Card" className="input input-bordered w-full max-w-xs" />
      <button style={{ backgroundColor: 'var(--primary-foreground)', color: 'var(--primary)' }} className="py-2 px-4 w-[320px] rounded-md hover:bg-opacity-90 transition ease-in-out duration-150"> 
        Proceed with {method}
      </button>
    </AccordionBody>
  ) : null;

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }} className="pt-[100px] h-full px-[20px] md:px-[50px] mb-[210px]">
      <h2 style={{ color: 'var(--primary)' }} className="text-2xl mb-[20px] sm:text-3xl md:text-4xl font-bold">
        Select Payment Method
      </h2>
      {paymentMethods.map((method, index) => {
        if (method === "UPI") {
          return (
            <div key="UPI-section">
              <h3 style={{ color: 'var(--foreground)' }} className="text-[14px] md:text-[18px] mb-2 font-semibold">Pay by an UPI App</h3>
              {UPIOptions.map((upiMethod, upiIndex) => (
                <Accordion key={upiIndex} open={openItems[upiIndex]} icon={<Icon open={openItems[upiIndex]} />} className="mb-3">
                  <AccordionHeader
                    onClick={() => handleOpen(upiIndex)}
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                    className="cursor-pointer text-[22px] py-[10px] px-[10px] rounded-lg"
                  >
                    {upiMethod}
                  </AccordionHeader>
                  {renderAccordionBody(upiMethod, upiIndex)}
                </Accordion>
              ))}
            </div>
          );
        } else if (method === "CARDS") {
          return (
            <div key="CARDS-section">
              <h3 style={{ color: 'var(--foreground)' }} className="text-[14px] md:text-[18px] mt-4 mb-2 font-semibold">Credit & Debit Cards</h3>
              {CardOptions.map((cardMethod, cardIndex) => (
                <Accordion key={cardIndex} open={openItems[UPIOptions.length + cardIndex]} icon={<Icon open={openItems[UPIOptions.length + cardIndex]} />} className="mb-3">
                  <AccordionHeader
                    onClick={() => handleOpen(UPIOptions.length + cardIndex)}
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                    className="cursor-pointer text-[22px] py-[10px] px-[10px] rounded-lg"
                  >
                    {cardMethod}
                  </AccordionHeader>
                  {renderCardInputs(cardMethod, UPIOptions.length + cardIndex)}
                </Accordion>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Payments;
