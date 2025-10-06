import { useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import { Button } from "./Button";


// controlled component 
export default function CreateContentModel({ open, Onclose }: { open: boolean, Onclose: () => void }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("");

    return (
        <div>
            {open && (
                <div className="w-full flex justify-center h-screen bg-slate-500 fixed opacity-60 top-0 left-0 rounded-md">
                    <div className="flex flex-col justify-center p-4 rounded-md ">

                        {/* changed span -> div (block container so inputs fit full width) */}
                        <div className="bg-white opacity-100 rounded-md max-w-xl min-w-96">

                            <div className="flex justify-end cursor-pointer p-2 text-black w-full">
                                <div onClick={Onclose} className="bg-red-900 rounded-full">
                                    <CrossIcon />
                                </div>
                            </div>

                            <div className="w-full flex flex-col items-center">
                                <Input
                                    placeholder="Title"
                                    onChange={(e:any) => setTitle(e.target.value)}
                                />
                                <Input
                                    placeholder="Link"
                                    onChange={(e:any) => setLink(e.target.value)}
                                />
                                <Input
                                    placeholder="Type"
                                    onChange={(e:any) => setType(e.target.value)}
                                />

                                <div className="flex justify-center p-4">
                                    <button className="px-4 py-2 rounded bg-blue-800 text-white hover:bg-blue-950">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Input({ onChange, placeholder }: { onChange: (e: any) => void, placeholder: string }) {
    return (
        <div >
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                className="w-full px-6 py-3 border rounded-md m-2"
            />
        </div>
    );
}
