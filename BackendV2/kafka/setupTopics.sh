#!/bin/bash

BROKER="localhost:9092"

# Wait for kafka to be ready
sleep 10

# Create topics
kafka-topics.sh --create --topic donor-registered --bootstrap-server $BROKER --partitions 3 --replication-factor 1
kafka-topics.sh --create --topic charity-created --bootstrap-server $BROKER --partitions 3 --replication-factor 1

echo "Topics created successfully!"