import SidebarItems from "./SidebarItem";
import { Youtube } from "lucide-react"
import { Twitter } from "lucide-react"
import { Files } from 'lucide-react';
import { Link2 } from 'lucide-react';
import { Tags } from 'lucide-react';
import { Brain } from 'lucide-react';

export default function Sidebar() {

    return (
        <div className="h-screen fixed bg-white border-r w-72 top-0 left-0 flex flex-col">

            <div className=" mt-2  mb-10 flex items-center p-2  gap-2">
                <Brain />
                <h1 className="font-bold font-mono text-xl">Second Brain</h1>
            </div>

            <div className="flex flex-col gap-4 cursor-pointer">

                <SidebarItems title="Tweet" icon={<Twitter />} />

                <SidebarItems title="Videos" icon={<Youtube />} />



                <SidebarItems title="Files" icon={<Files />} />

                <SidebarItems title="Links" icon={<Link2 />} />

                <SidebarItems title="Tags" icon={<Tags />} />

            </div>







        </div>
    )
}