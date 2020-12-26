#Команда №2
Дизайнеры: Татьяна Панина, Алена Хорошилова
Программисты: Дементьева Виктория, Кожеватова Анна, Лисус Михаил

#Сайт проекта
Проект “Гражданин-Поэт 2025” в реализованном виде представлен на сайте
https://freespeech2025.com

Дизайн сайта доступен по адресу:
https://bit.ly/3aJgBnD

#О проекте
###Цель проекта
Дать возможность пользователю в 2025 году создать инициативу / петицию используя эзопов язык классической поэзии.

###Целевая аудитория
Любой взрослый гражданин.

###Модерация
Единственная единица контента, которая появляется на сайте без модерации - ключевое слово. Для этих слов реализована проверка на обсценную лексику.
Если пользователь в качестве иллюстрации использует свою картинку, то такая инициатива публикуется на сайте, но доступна только данному пользователю.

#Доступные скрипты
### Режим разработчика
npm start

###Сборка проекта
npm run build

###Публикация проекта
firebase deploy

#Инфраструктура
###Backend
В качестве backend использована облачная платформа Firebase. Средствами этой платформы решены следующие задачи:
•	авторизации посетителей сайта (passwordless authentication with email link);
•	хранение базы данных со стихами и работа с ней (Cloud Firestore);
•	хранение созданных посетителями карточек (в контексте этого сайта - инициатив)(Cloud Firestore);
•	хранение картинок, загруженных пользователями (Storage);
•	хостинг сайта (Hosting).

###Frontend
Проект реализован на технологиях HTML5, CSS3, ReactJS (функциональный подход)
При оформлении стилей использовалась методология BEM.

####Дополнительные компоненты:
•	react-elastic-carousel (для карусели карточек);

•	react-simple-timestamp-to-date (для преобразования timestamp в дату);

•	react-router-dom (для навигации);

•	uuid (для генерации ключей);

•	classnames (для управления классами)

####Разрешения / Браузеры /SEO
•	Сайт корректно отображается на всех стандартных разрешениях: от 320px до 1440px и выше.

•	Корректная работа всей функциональности сайта протестирована на браузерах Chrome, Safari под операционными системами MacOS, iOS, Android, Windows.

•	Проведены начальные SEO мероприятия: сделаны метатеги, добавлена favicon.
