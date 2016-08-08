#!/usr/bin/env sh
base=$1
mkdir -p "$base/release";
cd "$base/dist/";
files=./*
for file in $files
do
    echo "working on folder -> $file"
    package=$(ls "./$file" | sed s/.js$/.zip/);
    zip -r "$package" "$file/";
    mv "$package" "$base/release/"
done;
cd $base;
