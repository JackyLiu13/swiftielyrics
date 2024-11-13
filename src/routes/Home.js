import React from 'react';

import { useNavigate } from 'react-router-dom';

import TicketCode from '../components/TicketCode';

import ticketArt from '../assets/ticketart.png';



const Home = () => {

  const navigate = useNavigate();



  return (

    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4 md:p-8">

      <div className="flex flex-col md:flex-row bg-[#fdf5e6] border-4 border-black shadow-brutal max-w-7xl w-full md:h-[600px]">

        {/* Left Section - Ticket Art */}

        <div className="w-full md:w-2/5 h-[200px] md:h-full border-b-4 md:border-b-0 md:border-r-4 border-black">

          <img 

            src={ticketArt} 

            alt="Ticket Art" 

            className="w-full h-full object-cover"

            style={{ objectPosition: 'center' }}

          />

        </div>



        {/* Middle Section - Main Content */}

        <div className="w-full md:w-2/5 p-4 md:p-8 flex flex-col items-center justify-center">

          <div className="space-y-4 md:space-y-8 text-center">

            <h1 className="text-4xl md:text-7xl font-bold text-gray-800 border-4 border-black p-4 md:p-6 rotate-1 shadow-brutal bg-white" 

                style={{ fontFamily: "'Bodoni MT', serif" }}>

              Taylor Lyric Guesser

            </h1>

            <p className="text-lg md:text-xl text-gray-700 -rotate-1 border-2 border-black p-3 md:p-4 bg-[#fff8dc] shadow-brutal">

              Guess the lyrics that come after!

            </p>

            <button

              onClick={() => navigate('/play')}

              className="text-xl md:text-2xl px-8 md:px-10 py-4 md:py-5 bg-pink-400 border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform shadow-brutal"

            >

              PLAY

            </button>

          </div>

        </div>



        {/* Divider - Only visible on desktop */}

        <div className="hidden md:block border-l-4 border-black border-dashed"></div>



        {/* Right Section - Code */}

        <div className="w-full md:w-1/5 h-[100px] md:h-full border-t-4 md:border-t-0 md:border-l-4 border-black">

          <TicketCode />

        </div>

      </div>

    </div>

  );

};



export default Home; 
