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
git clone https://github.com/adrianhajdin/jsm_podcastr.git
cd jsm_podcastr
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
```

Replace the placeholder values with your actual Convex & Clerk credentials. You can obtain these credentials by signing up on the [Convex](https://www.convex.dev/) and [Clerk](https://clerk.com/) websites.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

