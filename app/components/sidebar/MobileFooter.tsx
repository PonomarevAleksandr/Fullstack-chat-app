"use client";

import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "@/app/hooks/useConversation";
import MobileItem from "@/app/components/sidebar/MobileItem";
import Avatar from "@/app/components/Avatar";
import {useState} from "react";
import {User} from "@prisma/client";
import SettingsModal from "@/app/components/sidebar/SettingsModal";
import useRoutesMobile from "@/app/hooks/useRoutesMobile";

interface MobileFooterProps {
    currentUser: User
}

const MobileFooter: React.FC<MobileFooterProps> = ({
                                                       currentUser
                                                   }) => {
    const routes = useRoutesMobile();
    const {isOpen} = useConversation();
    const [isOpened, setIsOpened] = useState(false)

    if (isOpen) {
        return null;
    }
    return (
        <>
            <SettingsModal
                currentUser={currentUser}
                isOpen={isOpened}
                onClose={() => setIsOpened(false)}
            />
            <div className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
        ">
                {routes.map((route) => (
                    <MobileItem
                        key={route.href}
                        href={route.href}
                        active={route.active}
                        icon={route.icon}
                        onClick={route.onClick}
                    />
                ))}


            </div>
        </>
    );
}
export default MobileFooter;