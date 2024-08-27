import {useMemo} from "react";
import {useParams, usePathname} from "next/navigation";
import {HiChat} from "react-icons/hi";
import {
    HiArrowLeftOnRectangle, HiBars3,
    HiUsers
} from "react-icons/hi2";
import {signOut} from "next-auth/react";
import useConversation from "./useConversation";
import SettingsModal from "@/app/components/sidebar/SettingsModal";
import {CiSettings} from "react-icons/ci";
import {IoMdSettings} from "react-icons/io";

const useRoutes = () => {
    const pathname = usePathname();
    const {conversationId} = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Чаты',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId,
        },
        {
            label: 'Заявки',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label: 'Настройки',
            href: '/settings',
            icon: IoMdSettings,

        },
        {
            label: 'Выйти',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,

        },
    ], [pathname, conversationId]);
    return routes;
}

export default useRoutes;