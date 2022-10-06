# Задача: разработка веб-приложения «Чат»

Реализовать приложение, с похожим функционалом, как, например, Telegram, Yandex.Messenger или WhatsApp.

Используемый образец UI: https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1.

## Текущий деплой - <https://sprint-2-elvehnn.netlify.app/>

## Используемые технологии

- JavaScript;
- CSS, препроцессоры или PostCSS;
- Netlify;
- NodeJS. Версия ≥ 12;
- Parcel;
- TypeScript;
- Eslint, Prettier, Stylelint;
- шаблонизатор Handlebars.

## Функционал

- авторизация зарегистрированного пользователя;
- регистрация нового пользователя;
- вывод списка доступных чатов;
- отображение количества непрочитанных сообщений;
- поиск чата;
- действия с чатом:
  - просмотр;
  - отправка сообщения с фиксацией времени отправки;
  - прикрепить файл к сообщению;
  - добавить/удалить пользователей в чат;
- просмотр/редактирование страницы профиля;
- валидация и сбор данных из форм авторизации, регистрации, изменения данных пользователя;
- класс для работы с запросамы - HttpTransport.

## Как установаить

Склонируйте репозиторий и запустите команду для установки зависимостей

```bash
npm install
```

## Доступные scripts

```bash
npm run dev
```

Запускает приложение в development mode в браузере по адресу [http://localhost:1234](http://localhost:1234).

```bash
npm run start
```

Запускает сервер Express с раздачей статики для запуска приложения по адресу [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

Parcel собирает проект в папку dist.
