#!/usr/bin/env zsh
txt=$(cat "./input/day$1.txt")
deno run -A "./day$1.ts" "$txt"