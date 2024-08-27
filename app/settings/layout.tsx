import Sidebar from "@/app/components/sidebar/Sidebar";
import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import Settings from "@/app/settings/components/Settings"
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function ConversationsLayout({
    children
                                                  }: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()

    return(
        <Sidebar>
            <div className="h-full">
                <Settings
                    currentUser={currentUser!}
                />

            </div>
        </Sidebar>
    )
}