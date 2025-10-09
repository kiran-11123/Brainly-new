
export default function Dashboard() {

    return(

        <div className="h-screen flex flex-col items-center  justify-between bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">

            <div className=" px-10 py-7 w-full max-w-sm  sm:max-w-4xl rounded-xl bg-gradient-to-r text-white from-[#0f0c29] via-[#302b63] to-[#24243e] hover:bg-gradient-to-r hover:from-[#625c9bad] hover:via-[#302b63] hover:to-[#6565b0] mt-10 flex items-center justify-between" >
                     
                     <div className="flex items-center font-poppins text-sm sm:text-lg font-semibold">

                        <h1>Brainly</h1>
                      
                      </div>

                      <div className="flex items-center justify-between gap-10 font-roboto ">

                        <div className="px-4 py-2 hover:bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-lg shadow-md">Login</div>
                        <div className="px-4 py-2 hover:bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-lg shadow-md">Register</div>

                    </div>
            </div>



        </div>
    )

}