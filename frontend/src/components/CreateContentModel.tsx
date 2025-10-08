import { useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import { Button } from "./Button";
import axios from "axios";


// controlled component 
export default function CreateContentModel({ open, Onclose }: { open: boolean, Onclose: () => void }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("");
    const[description , setDescription] = useState("");
    const[message ,SetMessage] =useState("");


    async function SubmitForm(e:any) {
        e.preventDefault();

        try{
            console.log("Submitting the form");

            const response = await axios.post("http://localhost:3000/api/v1/data/content" , {

                title,
                link,
                description,
                type

            } ,{
                withCredentials:true
            })

            console.log(response);

            if(response.status===200){
                 SetMessage("Contents added successfully..")

                 setTimeout(()=>{

                    setDescription("");
                    setLink("");
                    setTitle("");
                    setType("");

                 },2000)
            }
            else{

                SetMessage(response.data.message);
                setTimeout(()=>{

                    setDescription("");
                    setLink("");
                    setTitle("");
                    setType("");

                 },2000)

            }

        }
        catch(er){
            
            console.log(er);
            SetMessage("Request Failed . Server Error")
                         
        }

    }

    return (
        <div>
            {open && (
                <div className="w-full flex justify-center h-screen bg-gray-500 fixed opacity-60 top-0 left-0 rounded-md">
                    <div className="flex flex-col justify-center p-4 rounded-md ">

                        {/* changed span -> div (block container so inputs fit full width) */}
                        <div className="bg-white opacity-100 rounded-md max-w-xl min-w-96 ">

                            <div className="flex justify-end cursor-pointer p-2 text-black w-full">
                                <div onClick={Onclose} className="bg-red-900 rounded-full">
                                    <CrossIcon />
                                </div>
                            </div>

                            <div className="flex justify-center items-center bg-gray-50 mb-5">
                           
                                <form
                                    className="space-y-5 w-full max-w-80 bg-gray-800 font-mono p-6 rounded-lg shadow-md"
                                    onSubmit={SubmitForm}
                                >

                                    <h1 className="text-center font-mono text-xl font-semibold">Add Contents</h1>

                                    <div>
                                        <label className="font-bold text-lg sm:text-xl block mb-1 text-white">
                                            Title
                                        </label>

                                        <input onChange={(e) => setTitle(e.target.value)} required value={title} className="w-full text-black px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter Title"  />
                                    </div>

                                      <div>
                                        <label className="font-bold text-lg sm:text-xl block mb-1 text-white">
                                            Description
                                        </label>

                                        <input onChange={(e) => setDescription(e.target.value)} required value={description} className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter Description" />
                                    </div>


                                    <div>
                                        <label className="font-bold text-lg sm:text-xl block mb-1 text-white">
                                            Link
                                        </label>

                                        <input required onChange={(e) => setLink(e.target.value)} value={link} className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Paste the Link here" />
                                    </div>

                                    

                                    <div>
                                        <label className="font-bold text-lg sm:text-xl block mb-1 text-white">
                                            Type
                                        </label>

                                        <input required onChange={(e) => setType(e.target.value)} value={type} className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="ex :twitter ,youtube ,file ,note" />
                                    </div>


                                    <button className="text-center font-bold text-lg sm:xl  w-full rounded-lg bg-blue-500 text-white mb-5 px-3 py-2">
                                        Submit
                                    </button>

                                </form>

              
                            </div>

                                <div>

                                    {message && <h1 className="text-lg text-center text-red-800">{message}</h1>}
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


