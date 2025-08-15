# AI Agent Hub - Развертывание на Akash Network

## Подготовка к развертыванию

### 1. Скачайте проект
Скачайте все файлы проекта в локальную папку.

### 2. Создайте Docker образ

```bash
# Соберите Docker образ
docker build -t your-dockerhub-username/ai-agent-hub:latest .

# Загрузите образ в Docker Hub
docker push your-dockerhub-username/ai-agent-hub:latest
```

### 3. Установите Akash CLI

```bash
# Для Linux/macOS
curl -sSfL https://raw.githubusercontent.com/akash-network/provider/main/install.sh | sh

# Для Windows - скачайте с GitHub releases
```

### 4. Настройте кошелек

```bash
# Создайте новый кошелек или импортируйте существующий
akash keys add wallet

# Пополните кошелек AKT токенами (минимум 5 AKT)
```

### 5. Разверните на Akash

```bash
# Создайте сертификат
akash tx cert generate client --from wallet --chain-id akashnet-2 --node https://rpc.akash.forbole.com:443

# Опубликуйте сертификат
akash tx cert publish client --from wallet --chain-id akashnet-2 --node https://rpc.akash.forbole.com:443

# Создайте развертывание
akash tx deployment create deploy.yaml --from wallet --chain-id akashnet-2 --node https://rpc.akash.forbole.com:443

# Найдите ваше развертывание
akash query deployment list --owner $(akash keys show wallet -a) --chain-id akashnet-2 --node https://rpc.akash.forbole.com:443

# Просмотрите предложения провайдеров
akash query market bid list --owner $(akash keys show wallet -a) --chain-id akashnet-2 --node https://rpc.akash.forbole.com:443

# Создайте аренду с выбранным провайдером
akash tx market lease create --owner $(akash keys show wallet -a) --dseq DEPLOYMENT_SEQUENCE --gseq 1 --oseq 1 --provider PROVIDER_ADDRESS --from wallet --chain-id akashnet-2 --node https://rpc.akash.forbole.com:443

# Отправьте манифест провайдеру
akash provider send-manifest deploy.yaml --from wallet --provider PROVIDER_ADDRESS --dseq DEPLOYMENT_SEQUENCE --chain-id akashnet-2 --node https://rpc.akash.forbole.com:443
```

### 6. Получите URL приложения

```bash
# Получите статус аренды
akash provider lease-status --from wallet --provider PROVIDER_ADDRESS --dseq DEPLOYMENT_SEQUENCE --gseq 1 --oseq 1 --chain-id akashnet-2 --node https://rpc.akash.forbole.com:443
```

## Важные замечания

1. **Замените** `your-dockerhub-username` на ваш реальный username в Docker Hub
2. **Обновите** `deploy.yaml` с правильным именем образа
3. **Убедитесь**, что у вас есть достаточно AKT токенов для развертывания
4. **Сохраните** все адреса и последовательности для управления развертыванием

## Стоимость

Примерная стоимость развертывания: 1-5 AKT в месяц (зависит от провайдера и ресурсов).

## Поддержка

Для получения помощи обратитесь к документации Akash Network: https://docs.akash.network/