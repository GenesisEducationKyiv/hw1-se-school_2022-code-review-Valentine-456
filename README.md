# GSES BTC Application
Технічне завдання та опис API [тут](https://drive.google.com/file/d/1yTam6PdjgAY9l8IhqyYMC3I_LAe7OOCL/view)

Цей проект був завантажений за допомогою [Fastify-CLI](https://www.npmjs.com/package/fastify-cli).

Цей проект був побудований з [Fastify](https://fastify.io) та [TypeScript](https://typescriptlang.org).
***

## Docker
Припустимо що ви перебуваєте в корені проекту, для запуску проекту, запустіть наступне у вашому терміналі:

```bash
$ docker build -t fastify_gses_btc_app .
$ docker run -p 5000:5000 fastify_gses_btc_app
```
**Важливо:** Потрібно обов'язково указувати параметр `-p 5000:5000` щоб API ендпоінтами можна було користуватися.

**Важливо:** В рамках відбору до Genesis Software Engineer School, щоб передати необхідні настройки **для запуску проекту в Docker (що є умовою конкурсу)**, мені довелось закомітити .env файл (що є неприпустимо в звичайних ситуаціях). В можливому майбутньому розвитку цього пет-проекту, я зміню env змінні.

<!-- **Important:** you should specify port option `-p 5000:5000` for app's API endpoints to be reachable. -->

***
## Available Scripts
В директорії проекту можна запускати:

#### `npm run start`
Запускає попередньо скомпільований проект у JS у папці **/dist/** в production mode.

#### `npm run start:ts`
Компілює і запускає сервер в production mode.

#### `npm run build`
Компілює проект в JS

#### `npm run watch:ts`
Компілює проект в JS у watch mode.

#### `npm run dev`
Запускає проєкт в development mode (в watch mode).

#### `npm run dev:start`
Запускає проєкт в development mode (без watch mode).

#### `npm run lint`
Форматує код та запускає лінтер.

#### `npm run test:unit`
Запускає unit тести.

#### `npm run test:integration`
Запускає integration тести.

#### `npm run test:e2e`
Запускає e2e тести стороннього сервісу.

Запустіть [http://localhost:5000](http://localhost:5000) щоб побачити чи протестувати

***

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
