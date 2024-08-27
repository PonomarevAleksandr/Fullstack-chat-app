<div align="center">
  <br />
      <img src="https://github.com/PonomarevAleksandr/FullStack-chat-app/blob/main/public/images/chat.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_._JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://shields.io/badge/react-black?logo=react&style=for-the-badge" alt="react" />
        <img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongo" />
  </div>

  <h3 align="center">REAL-TIME CHAT APP</h3>
     <div align="center">
     Оналйн чат для обмена сообщениями, фотографиями с другими пользователями.
    </div>
</div>

</div>

## <a name="Функции">🔋 Функции</a>

👉 **Авторизация/Регистрация**: Система авторизации/регистрации с интеграцией Google Cloud Platform

👉 **Список Пользователей**: Список доступных пользователей для начала диалога

👉 **Чаты**: Диалоговые окна для обмена сообщениями, фотографиями c другими пользователями

👉 **Кастомизация**: Возможность смены аватарки/имени

👉 **В реальном времени**: Отображение сообщений и пользователей в реальном времени при помощи pusher

👉 **Групповые чаты**: Возможность создавать групповые чаты от 3х пользователей

👉 **Информация о собеседнике**: В каждом чате можно изучить информацию о собеседнике (город, email)

👉 **Адаптивный дизайн**: Оптимизация под мобильные, планшетные и десктопные устройства


## <a name="tech-stack">⚙️ Стэк</a>

- Next.js
- TypeScript
- MongoDB
- React
- Tailwind CSS
- Pusher

## <a name="quick-start">🤸 Установка</a>

Следуйте этим шагам для успешной установки.

**Предварительные условия**

Убедитесь, что на вашем компьютере установлено следующее:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Клонирование репозитория**

```bash
git clone https://github.com/PonomarevAleksandr/Fullstack-chat-app.git
cd FullStack-chat-app
```

**Установка**

Установите зависимости проекта с помощью npm:

```bash
npm install
```

**Настройка переменных среды**

Создайте новый файл с именем `.env` в корне вашего проекта и добавьте следующий контент:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=
CLOUDINARY_URL=
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=
```


**Запуск проекта**

```bash
npm run dev
```

Перейди по ссылке [http://localhost:3000](http://localhost:3000) в твоем браузере чтобы увидеть проект.

## <a name="snippets">🕸️ Snippets</a>
<details>
<summary><code>prisma/schema.prisma</code></summary>
  
```typescript
    generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  name           String?
  email          String?   @unique
  emailVerified  DateTime?
  image          String?
  hashedPassword String?
  town           String?   @default("Новосибирск")
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  role           String?   @default("user")

  conversationIds String[]       @db.ObjectId
  conversations   Conversation[] @relation(fields: [conversationIds], references: [id])

  seenMessageIds String[]  @db.ObjectId
  seenMessages   Message[] @relation("Seen", fields: [seenMessageIds], references: [id])

  accounts Account[]
  messages Message[]
}

model Account {
  id                 String    @id @default(auto()) @map("_id") @db.ObjectId
  userId             String    @db.ObjectId
  type               String
  provider           String
  providerType       String?
  providerAccountId  String
  refresh_token      String?   @db.String
  access_token       String?   @db.String
  accessTokenExpires DateTime?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?   @db.String
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Conversation {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  createdAt     DateTime @default(now())
  lastMessageAt DateTime @default(now())
  name          String?
  isGroup       Boolean?

  messageIds String[]  @db.ObjectId
  messages   Message[]

  userIds String[] @db.ObjectId
  users   User[]   @relation(fields: [userIds], references: [id])
}

model Message {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  body      String?
  image     String?
  createdAt DateTime @default(now())

  seenIds String[] @db.ObjectId
  seen    User[]   @relation("Seen", fields: [seenIds], references: [id])

  conversationId String       @db.ObjectId
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  senderId String @db.ObjectId
  sender   User   @relation(fields: [senderId], references: [id], onDelete: Cascade)
}
```
</details>

<details>
<summary><code>app/(site)/components/AuthForm.tsx</code></summary>
  
```typescript
'use client';
import {useCallback, useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import AuthSocialButton from "@/app/(site)/components/AuthSocialButton";
import {BsGoogle} from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import RegionSelect from "@/app/components/inputs/RegionSelect"

type Variant = 'LOGIN' | 'REGISTER';


const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN')
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''

        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Что-то пошло не так'))
                .finally(() => setIsLoading(false))

        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Не верный логин или пароль')
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success('Успешный вход!')
                        router.push('/users')
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    const SocialAction = (action: string) => {
        setIsLoading(true);
        signIn(action, {redirect: false})
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Не верный логин или пароль')
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Успешный вход!')
                }
            })
            .finally(() => setIsLoading(false))

    }

    return (
        <div
            className="
              mt-8
              sm:mx-auto
              sm:w-full
              sm:max-w-md
            "
        >
            <div
                className="
                      bg-white
                      px-4
                      py-8
                      shadow
                      sm:rounded-lg
                      sm:px-10
                "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <><Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}/>

                            <RegionSelect
                            register={register}
                            id="town"
                            errors={errors}
                            disabled={isLoading}/>
                        </>
                    )}
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Войти' : 'Зарегестрироваться'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                                "
                        >
                            <div
                                className="
                                    w-full
                                    border-t
                                    border-gray-300"
                            />
                        </div>
                        <div className="
                            relative
                            flex
                            justify-center
                            text-sm
                            "
                        >
                            <span className="
                                bg-white
                                px-2
                                text-gray-500">
                                Или
                            </span>
                        </div>
                    </div>
                    {/*<div className="mt-6 flex gap-2">*/}
                    {/*    <AuthSocialButton*/}
                    {/*        icon={BsGoogle}*/}
                    {/*        onClick={() => SocialAction('google')}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>

                <div className="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
                ">
                    <div>
                        {variant === 'LOGIN' ? 'Не зарегестрированы?' : 'Уже есть аккаунт?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Создать аккаунт' : 'Войти'}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;

```
</details>

<details>
<summary><code>app/conversations/components/ConversationsList.tsx</code></summary>
  
```typescript
"use client";

import {FullConversationType} from "@/app/types";
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import {MdOutlineGroupAdd} from "react-icons/md";
import ConversationBox from "@/app/conversations/components/ConversationBox";
import GroupChatModal from "@/app/conversations/components/GroupChatModal";
import {User} from "@prisma/client";
import {useSession} from "next-auth/react";
import {pusherClient} from "@/app/libs/pusher";
import {find} from "lodash";

interface ConversationsListProps {
    initialItems: FullConversationType[];
    users: User[]
}

const ConversationsList: React.FC<ConversationsListProps> = ({
                                                                 initialItems,
                                                                 users
                                                             }) => {
    const session = useSession();
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const {conversationId, isOpen} = useConversation()

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, {id: conversation.id})) {
                return current;
                }

                return [conversation, ...current];
            })
        };

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }
                return currentConversation;
            }));
        }

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
               return [...current.filter((convo) => convo.id !== conversation.id)]
            });

            if (conversationId === conversation.id) {
                router.push('/conversations');
            }

        };

        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', newHandler);
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:remove', removeHandler)


        }

    }, [pusherKey, conversationId])

    return (
        <>
            <GroupChatModal
            users={users}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            />
            <aside
                className={clsx(`
                    fixed
                    inset-y-0
                    pb-20
                    lg:pb-0
                    lg:left-20
                    lg:w-80
                    lg:block
                    overflow-y-auto
                    border-r
                    border-gray-200

                    `,
                    isOpen ? 'hidden' : 'block w-full left-0'
                )}>
                    <div className="px-5">
                        <div className="flex justify-between mb-4 pt-4">
                            <div className="
                                text-2xl
                                font-normal
                                text-neutral-800">
                                Чаты
                            </div>
                            <div
                                onClick={() => setIsModalOpen(true)}
                                className="
                                    rounded-full
                                    p-2
                                    bg-gray-100
                                    text-gray-600
                                    cursor-pointer
                                    hover:opacity-75
                                    transition">
                                <MdOutlineGroupAdd size={20}/>
                            </div>
                        </div>
                        {items.map((item) => (
                            <ConversationBox
                                key={item.id}
                                data={item}
                                selected={conversationId === item.id}
                            />
                        ))}
                    </div>
            </aside>
        </>
    );
};

export default ConversationsList;

```
</details>

<details>
<summary><code>app/users/components/UserList.tsx</code></summary>
  
```typescript
"use client";

import { User } from "@prisma/client"
import UserBox from "./UserBox"

interface UserListProps {
    items: User[]
}

const UserList: React.FC<UserListProps> = ({
    items
                                           }) => {
    return(
        <aside
        className="
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        block
        w-full
        left-0

        ">
            <div className="px-5">
                <div className="flex-col">
                    <div
                    className="error
                    text-2xl
                    font-normal
                    text-neutral-800
                    py-4">
                        Пользователи

                    </div>
                </div>
            {items.map((item) => (
                <UserBox
                key={item.id}
                data={item}
                />
            ))}
            </div>
        </aside>
    );
};

export default UserList;

```
</details>








