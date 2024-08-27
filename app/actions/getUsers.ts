import prisma from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

const getUsers = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
        return [];
    }

    try {
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                town: true,
                role: true
            },
        });

        if (!currentUser) {
            return [];
        }

        const baseQuery = {
            where: {
                NOT: {
                    email: session.user.email,
                },
                town: currentUser.town,
            },
        };

        let users;

        if (currentUser.role === "admin") {
            // Admin can see all users from their town
            users = await prisma.user.findMany({
                ...baseQuery,
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else if (currentUser.role === "it") {
            // IT can see all users
            users = await prisma.user.findMany({
                where: {
                    NOT: {
                        email: session.user.email,
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else {
            // Regular users can only see users with role admin from their town
            users = await prisma.user.findMany({
                ...baseQuery,
                where: {
                    ...baseQuery.where,
                    role: "admin",
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }

        return users;
    } catch (error: any) {
        return [];
    }
};

export default getUsers;
