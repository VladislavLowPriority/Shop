FROM postgres:latest

# Устанавливаем переменные окружения для подключения к базе данных
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=online_store

# Открываем порт для доступа к базе данных извне
EXPOSE 5432