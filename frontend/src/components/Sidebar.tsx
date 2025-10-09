import SidebarItems from "./SidebarItem";
import { Youtube, Twitter, Files, Link2, Tags, Brain, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { title: "Tweet", icon: <Twitter /> },
    { title: "Videos", icon: <Youtube /> },
    { title: "Files", icon: <Files /> },
    { title: "Links", icon: <Link2 /> },
    { title: "Tags", icon: <Tags /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 bg-gray-800 rounded-lg shadow-md focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-black via-cyan-800 to-teal-700 text-white flex flex-col p-6 transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        {/* Logo */}
        <div className="hidden sm:flex items-center gap-2 mb-10">
          <Brain />
          <h1 className="font-poppins font-semibold text-xl">Brain Hub</h1>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col gap-4 cursor-pointer">
          {items.map((item) => (
            <SidebarItems key={item.title} title={item.title} icon={item.icon} />
          ))}
        </div>
      </div>
    </>
  );
}
