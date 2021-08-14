
const Errors = ({errMsg}) => {

  return (
    <div className="bg-indigo-100" style={{ minHeight: "700px" }}>
      <div className="flex flex-wrap justify-around items-center py-24 m-auto w-7/12">
        <div className="w-96 h-96 bg-blue-300 rounded-2xl shadow-2xl bg-opacity-90 my-8 py-16 px-7
         font-medium text-justify relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-8 p-1 rounded-2xl shadow-inner bg-gray-300 overflow-hidden">
            <div className="w-full h-full relative">
                <div className="absolute left-0 w-6/12 bg-red-500 h-full rounded-l-2xl drop-shadow-xl
                 rounded-r-md hihihi"></div>
            </div>
        </div>
          <strong>We coudn't get the data!<br /> here is some reasons for that:</strong> <br />
          1- You are a user from Iran (or other country with limited internet)
          and you need to turn on your VPN to see the contents! <br /> <br />
          2- You need to check your connection! maybe it lost. <br /> <br />
          3- The Server is down currently! (Low chance)
        </div>
        <div className="w-96 h-96 bg-yellow-300 rounded-xl shadow-2xl bg-opacity-90 my-8 py-16
         px-7 font-medium text-justify relative">
          <strong>Media not Found! it may happen when:</strong> <br />
          1- You trying to reach a media with specific ID that is not exist in
          the server! <br /> <br />
          2- Do not try to add ID number 2 at the address bar after /anime/2 .
          it doesn't exist, don't try that! <br /> <br />
          3- The media was deleted from the server but still exist in relation
          of other media! (Low chance)
        </div>
        <div className="w-96 h-96 bg-pink-300 rounded-xl shadow-2xl bg-opacity-90 my-8 py-16 px-7
         font-medium text-justify relative">
          <strong>Toooooooo many Request! it may happen when:</strong> <br />
          1- You trying to open more than 50 diferent pages in less than one
          minute! (WTF dude?) <br /><br />
          2- You are a bot! please get out my site stupid
          bot! DO NOT come back again, or no I will *** *** ***.
        </div>
        <div className="w-96 h-96 bg-red-300 rounded-xl shadow-2xl bg-opacity-90 my-8 py-16 px-7
         font-medium text-justify relative">
          <strong>We really really dont know WTF is going on!</strong>
          <br /> <br />
          If you know please contact me from links at the footer and report the
          bug! I very appreciate that. <br /> <br />
          It can be because of changes that happend on the server! (Low chance)
        </div>
      </div>
    </div>
  );
};

export default Errors;
