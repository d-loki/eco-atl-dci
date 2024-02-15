#!/bin/bash

# Suppression du tag
git tag -d v0.1.0

# Suppression du tag sur le serveur
git push --delete origin v0.1.0

# Création du tag
git tag v0.1.0

# Push du tag
git push origin v0.1.0
