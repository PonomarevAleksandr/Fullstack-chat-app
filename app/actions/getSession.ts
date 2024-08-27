import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";  // Прямой импорт

export default async function getSession() {
    return await getServerSession(authOptions);
}
