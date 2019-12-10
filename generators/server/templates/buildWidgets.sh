#!/bin/bash

find ui/widgets/ -maxdepth 2 -mindepth 2 -type d -not -path "*utils*" -exec bash -c "cd '{}' && npm run build" \;
