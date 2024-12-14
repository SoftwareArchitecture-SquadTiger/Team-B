#!/bin/bash
# Wait for Kafka to be ready
sleep 10

# Create topics
kafka-topics.sh --create --topic my-topic-1 --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
kafka-topics.sh --create --topic my-topic-2 --bootstrap-server localhost:9092 --partitions 2 --replication-factor 1
