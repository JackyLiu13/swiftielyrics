import React from 'react';

const TicketCode = () => {
  return (
    <div className="w-full h-full relative bg-white">
      {/* Container that rotates on desktop */}
      <div className="w-full h-full flex flex-col items-center justify-center bg-transparent py-6 md:p-4 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:-rotate-90 md:transform md:origin-center">
        {/* Barcode text */}
        <div 
          className="text-3xl md:text-5xl tracking-wider whitespace-nowrap"
          style={{ fontFamily: "'Libre Barcode 128', cursive" }}
        >
          TAYLOR SWIFT ERAS TOUR
        </div>

        {/* Ticket details with adjusted spacing */}
        <div className="flex justify-center gap-1 md:gap-4 w-full mt-2 md:mt-0">
          <div className="text-center flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-bold">13</div>
            <div className="text-xs md:text-sm">SECTION</div>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-bold">13</div>
            <div className="text-xs md:text-sm">ROW</div>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-bold">13</div>
            <div className="text-xs md:text-sm">SEAT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCode; 


