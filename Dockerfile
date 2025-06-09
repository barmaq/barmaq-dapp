FROM python:3.11-slim

WORKDIR /app

# Установка зависимостей
RUN apt-get update && \
    apt-get install -y nginx supervisor && \
    pip install flask && \
    rm -rf /var/lib/apt/lists/*

# Копирование приложения
COPY . .

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Копирование конфигурации supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord"]
