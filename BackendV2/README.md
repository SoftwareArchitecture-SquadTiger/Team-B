# Kafka Setup

## Requirements
- Docker and Docker Compose installed.

## How to Run
1. Navigate to the BackendV2 directory
   ```bash
   cd BackendV2
2. Add .env file on the same level as docker-compose.yml folder, to check it, use:
   ```bash
   docker-compose config
3. Start Kafka and Zookeeper:
   ```bash
   docker-compose up
4. Verify Kafka:
    ```bash
    docker-compose logs kafka
5. List Topics
    ```bash
    docker exec -it kafka kafka-topics.sh --list --bootstrap-server localhost:9092
