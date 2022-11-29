# Задача: разработка веб-приложения «Чат»

Реализовать приложение, с похожим функционалом, как, например, Telegram, Yandex.Messenger или WhatsApp.

Используемый образец UI: <https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1>.

## Netlify - <https://chat-messanger-elvehnn.netlify.app/>

## Heroku - <https://frozen-hamlet-15688.herokuapp.com/>

## Используемые технологии

- JavaScript;
- CSS, препроцессор Sass;
- NodeJS. версия ≥ 12;
- Webpack;
- TypeScript;
- Eslint, Prettier, Stylelint, Husky;
- Handlebars;
- HTTP, WebSockets;
- Jest;
- Docker;
- Netlify, Heroku

## Функционал

- авторизация зарегистрированного пользователя;
- регистрация нового пользователя;
- вывод списка доступных чатов;
- отображение количества непрочитанных сообщений;
- поиск чата; // TODO
- действия с чатом:
  - просмотр;
  - отправка сообщения с фиксацией времени отправки;
  - прикрепить файл к сообщению; // TODO
  - добавить/удалить пользователей в чат;
- просмотр/редактирование страницы профиля;
- валидация и сбор данных из форм авторизации, регистрации, изменения данных пользователя;
- при обновлении страницы данные сохраняются;

## Как установить

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

Запускает тесты с флагом --coverage

```bash
npm run test
```

Сборка и запуск контейнера c помощью Docker:

```bash
docker build -t app-name .
docker run -p 3000:3000 -d app-name
```

Также настроен precommit и линтинг
