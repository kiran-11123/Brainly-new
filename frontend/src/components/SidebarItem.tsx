

export default function SidebarItems({ icon, title }: { icon: React.ReactNode, title: string }) {

    return (
        <div className="flex pl-5 items-center p-2  font-mono gap-3 hover:bg-gray-600 hover:text-white hover-outline-1 rounded-md">

            <span >
                {icon}
            </span>
            <span>
                {title}
            </span>

        </div>
    )
}