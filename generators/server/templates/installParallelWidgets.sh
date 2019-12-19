#!/bin/bash

find ui/widgets -maxdepth 2 -mindepth 2 -type d -not -path "*utils*" | xargs -I{} -P 10 bash -c "cd {} && npm i"
