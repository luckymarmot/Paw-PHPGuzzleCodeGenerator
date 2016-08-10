#!/usr/bin/env sh
base=$1
extensions_dir="$HOME/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/"

mkdir -p "$extensions_dir"
cp -r "$base/dist/" "$extensions_dir"
