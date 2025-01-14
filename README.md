# Team-B System

## Overview
Team-B System is a web application designed for administrators to manage the user system developed by Team A. The architecture includes a modularized frontend and a microservice-based backend with integrated Kafka as message broker

---

## Prerequisites

To run this system, ensure you have the following installed:
- **Docker**: For containerized services (BackendV2, Kafka, Redis)
- **Node.js** and **npm**: For the frontend

---

## Setup Instructions

### Backend Setup
The backend uses a microservice architecture. Each service is containerized using Docker.

#### Kafka (Run first)
1. Navigate to the Kafka directory
    ```bash
    cd Kafka
2. Create a .env file and add the necessary environment variables.
    ```bash
   # Zookeeper Configuration
   ZOOKEEPER_PORT=2181
   ZOOKEEPER_TICK_TIME=2000

   # Kafka Configuration
   KAFKA_BROKER_ID=1
   KAFKA_PORT=9092
   KAFKA_EXTERNAL_PORT=9093
   KAFKA_ADVERTISED_HOSTNAME=kafka
   KAFKA_EXTERNAL_ADVERTISED_HOSTNAME=<Kafka IPv4 address>
3. Build and start the Kafka container
   ```bash
   docker-compose up -d --build
4. To stop or restart the container, use
   ```bash
   docker-compose down -v
#### Redis 
1. Navigate to the Redis directory
   ```bash
   cd Redis
2. Create a .env file and add the necessary environment variables.
   ```bash
    #Redis Configuration
    REDIS_SENTINEL_HOST=redis-sentinel
    REDIS_PASSWORD=iamAdmin

    REDIS_MASTER_PORT=6379
    REDIS_REPLICA_PORT=6380
    REDIS_SENTINEL_PORT=26379
3. Build and start the Redis container
   ```
   docker-compose up -d --build
4. Stop or restart the container, use
   ```
   docker-compose down -v
#### BackendV2
1. Navigate to the BackendV2 directory
   ```bash
   cd BackendV2
2. Create a .env file and add the necessary environment variables
   ```bash
    # Kafka Configuration
   KAFKA_EXTERNAL_PORT=9093
   KAFKA_EXTERNAL_ADVERTISED_HOSTNAME=<Kafka IPv4 address>

   #MongoDB Uri
   MONGO_URI=mongodb+srv://admin:iamadmin@monolithic-cluster.xgeha.mongodb.net/?retryWrites=true&w=majority&appName=Monolithic-Cluster

   #Auth Key
   JWS_PRIVATE_KEY_PATH=/usr/src/app/keys/jws_private.pem
   JWE_PUBLIC_KEY_PATH=/usr/src/app/keys/jwe_public.pem
   RSA_PRIVATE_KEY_PATH=/usr/src/app/keys/rsa_private.pem
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin

   #Stats
   TEAM_A_API_GATEWAY = http://<API-Gateway IPv4 address>:5001/internal/
   INTERNAL_API_KEY=291zhI0AhUzU99YJ3CrkqatoPtb_8tY42VpD4y9CcuHNsizecGlQZylwoicQhiYSUHczM93Zk-mJl_yyI17RlQ
3. Build and start the backend services
   ```bash
   docker-compose up -d --build
4. Stop or restart the container, use
   ```bash
   docker-compose down -v
### Frontend Setup
The frontend handles the user interface for the admin portal
1. Navigate to the `Frontend` directory
   ```bash
   cd Frontend
2. Create a .env file and add the necessary environment variables
   ```bash
   VITE_HOST=<API-Gateway IPv4 address>
   VITE_PORT=5001
3. Navigate to the vite.config.js file
   ```bash
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   // https://vite.dev/config/
   export default defineConfig({
   server: {
      host: <website IPv4>,
   },
   plugins: [react()],
   })
4. Install dependencies:
   ```bash
   npm install
5. Start the web app:
   ```bash
   npm run dev
## License
This project is licensed under the [MIT License](LICENSE).
