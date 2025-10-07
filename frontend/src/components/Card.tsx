import { ShareIcon_1 } from "../icons/ShareIcon_1";
import { Trash2 } from 'lucide-react';
import { NotebookText } from 'lucide-react';
import { Youtube } from "lucide-react"
import { Twitter } from "lucide-react"
import { Files } from 'lucide-react';

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube" | "file" | "note"
}

export default function Card({ title, link, type }: CardProps) {
    return (
        <div className="bg-white p-4 border border-gray-200 max-w-72 min-h-48 rounded-md outline-slate-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500 items-center flex ">
                       {type==="twitter" && <Twitter className="text-blue-900 "/>} {type==="youtube" && <Youtube className="text-red-800 "/>} {type==="file" && <Files />} {type==="note" && <NotebookText />  }
                    </div>
                    <div className="font-semibold font-mono text-md"> 
                    {title}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <ShareIcon_1 size="lg"  />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <Trash2 />
                    </div>
                </div>
            </div>

            <div className="mt-4 space-y-4">
                {type === "youtube" && (
                    <div className="relative w-full aspect-video">
                        <iframe
                            className="absolute inset-0 w-full h-full rounded-lg border border-gray-200 shadow-sm"
                            src={link.replace("watch", "embed").replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                )}

                {type === "twitter" && (
                    <blockquote className="twitter-tweet h-[500px] overflow-auto border border-black-200 rounded-lg m-0 max-w-full">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                )}
            </div>
        </div>
    )
}
