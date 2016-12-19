

rm -Rf ./dst && tsc && cd src && find . -name '*.json' -type f -exec cp {} ../dst/{} \\; && cd ..