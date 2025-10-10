import axios from "axios";
import { ShareIcon_1 } from "../icons/ShareIcon_1";
import { Trash2, NotebookText, Youtube, Twitter, Files , Link } from "lucide-react";
import { useEffect, useRef } from "react";

interface CardProps {
  title: string;
  link: string;
  description:string,
  type: "twitter" | "youtube" | "image" | "note" ;
  image:string|null;
  id:string
}


function extractYouTubeId(url: string): string {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

async function deleteContent(id:string) {

  try{

    const response = await axios.delete("http://localhost:3000/api/v1/data/delete" ,{
      data:{contentId:id},
      withCredentials:true
    })

    console.log(response);

    if(response.status===200){
      alert("Content Deleted Successfully");
      window.location.reload();
    }
    else{
      alert("Error Occured while deleting..") 
      console.log(response.data)
    }



  }
  catch(er){
    console.log(er);
      alert("Error Occured while deleting..")
  }


  
}

export default function Card({ title, link, type ,description ,id , image}: CardProps) {



const imageUrl = `http://localhost:3000${image}`;
console.log(imageUrl);




 

  return (
    <div className="bg-white p-4 border border-gray-200 max-w-4xl min-h-48 rounded-md outline-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-md">
          <div className="pr-2 text-gray-500 items-center flex">
            {type === "twitter" && <Twitter className="text-blue-900" />}
            {type === "youtube" && <Youtube className="text-red-800" />}
            {type === "image" && <Link />}
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
            <button title="delete" onClick={(e)=>deleteContent(id)}><Trash2 /></button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 top-0 ">
       {type === "youtube" && link && (
  <div className="relative w-full aspect-video">
    <iframe
      className="absolute inset-0 w-full h-full rounded-lg border border-gray-200 shadow-sm"
      src={`https://www.youtube.com/embed/${extractYouTubeId(link)}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
)}

{type === "image" && imageUrl && (
  <div className="border border-gray-200 h-72 rounded-lg overflow-hidden shadow-sm bg-white flex justify-center items-center">
    <img
      src={imageUrl}
      alt={title || "Uploaded Image"}
      className="w-full h-full object-cover"
      onError={(e) => (e.currentTarget.src = "/fallback.jpg")} // optional fallback
    />
  </div>
)}
        {type === "twitter"  && (
          <div
            
            className="border border-gray-200 h-72 rounded-lg overflow-y-auto overflow-x-hidden shadow-sm bg-white flex justify-center"
          >
            <div className="w-full flex justify-center">
              <blockquote className="twitter-tweet m-0 max-w-full">
                <a
                  href={link.replace("x.com", "twitter.com")}
                  target="_blank"
                  rel="noopener noreferrer" className="m-0 max-w-full text-center font-poppins"
                >
                  View Tweet
                </a>
              </blockquote>
            </div>
          </div>
        )}

       

     

        {type === "note" &&(

          <div className="border border-gray-200 h-72 rounded-lg overflow-y-auto overflow-x-hidden shadow-sm bg-white flex justify-center items-center">
            {description}
            </div>

        )}
      
      </div>

       <div>{description}</div>

     
    </div>
  );
}
