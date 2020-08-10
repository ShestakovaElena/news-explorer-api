# Проект NewsExplorer (бэкенд). Дипломная работа в Яндекс.Практикуме

## IP-адрес сервера:
    130.193.58.228
  
## поддомен для api:
    api.news-explorer24.tk/

## Описание запросов:

### регистрация нового пользователя
    POST /signup

### авторизация пользователя
    POST /signin

### возвращает информацию о пользователе (email и имя)
    GET /users/me

### возвращает все сохранённые пользователем статьи
    GET /articles

### создаёт статью с переданными в теле
### keyword, title, text, date, source, link и image
    POST /articles

### удаляет сохранённую статью  по _id
    DELETE /articles/articleId

## Для локального запуска проекта:

### npm run start

    запуск сервера на localhost:3000;

### npm run dev

    запуск сервера на localhost:3000 с hot reload;
