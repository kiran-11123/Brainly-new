import { ShareIcon_1 } from "../icons/ShareIcon_1";
import { Trash2, NotebookText, Youtube, Twitter, Files } from "lucide-react";
import { useEffect, useRef } from "react";

interface CardProps {
  title: string;
  link: string;
  description:string,
  type: "twitter" | "youtube" | "file" | "note" ;
}

export default function Card({ title, link, type ,description}: CardProps) {


 

  return (
    <div className="bg-white p-4 border border-gray-200 max-w-4xl min-h-48 rounded-md outline-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-md">
          <div className="pr-2 text-gray-500 items-center flex">
            {type === "twitter" && <Twitter className="text-blue-900" />}
            {type === "youtube" && <Youtube className="text-red-800" />}
            {type === "file" && <Files />}
            {type === "note" && <NotebookText />}
          </div>
          <div className="font-semibold font-mono text-md">{title}</div>
        </div>

        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ShareIcon_1 size="lg" />
            </a>
          </div>
          <div className="text-gray-500 cursor-pointer">
            <Trash2 />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 top-0 ">
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
          <div
            
            className="border border-gray-200 h-72 rounded-lg overflow-y-auto overflow-x-hidden shadow-sm bg-white flex justify-center"
          >
            <div className="w-full flex justify-center">
              <blockquote className="twitter-tweet m-0 max-w-full">
                <a
                  href={link.replace("x.com", "twitter.com")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Tweet
                </a>
              </blockquote>
            </div>
          </div>
        )}
      </div>

       <div>{description}</div>

     
    </div>
  );
}
