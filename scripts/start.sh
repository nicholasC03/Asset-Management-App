#!/bin/bash

# Load environment variables from .env if present.
if [ -f .env ]; then
  set -o allexport
  source .env
  set +o allexport
fi

# Start the application
./mvnw spring-boot:run "$@"
