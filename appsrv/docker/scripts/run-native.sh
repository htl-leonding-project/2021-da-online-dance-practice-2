#!/usr/bin/env bash

while ! nc -z postgres 5432; do
    echo "waiting for godot..."
    sleep 1
done
sleep 2
echo "starting quarkus..."
pwd
ls -l
./application

