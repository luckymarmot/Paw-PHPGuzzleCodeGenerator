#!/usr/bin/env sh
base=$1
version=$2
mkdir -p "$base/releases";
cd "$base/dist/";
files=./*
for file in $files
do
    echo "working on folder -> $file"
    package=$(ls "./$file" | sed "s/.js$/$version.zip/");
    zip -r "$package" "$file/";
    mv "$package" "$base/releases/"
done;
cd $base;
