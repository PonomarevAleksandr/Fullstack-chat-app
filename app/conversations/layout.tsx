import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationsList from "@/app/conversations/components/ConversationsList";
import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";

export default async function ConversationsLayout({
    children
                                                  }: {
    children: React.ReactNode
}) {
    const conversations = await getConversations();
    const users = await getUsers();

    return(
        <Sidebar>
            <div className="h-full">
                <ConversationsList
                    users={users}
                initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}