# Paw-ES7-Generator-Template
A boilerplate for writing Paw generators using es7 syntax

### How to create a new Code Generator from the template
Create a bare repository that will contain the codebase.
Copy/Paste the following commands when in the repository:
```
git remote add boilerplate git@github.com:luckymarmot/Paw-ES7-Generator-Template.git
git pull boilerplate master
make
```

### Creating a build
```
make build
```

The build will be located in the `dist` folder

### Creating a release
```
make deploy VERSION="@2.3.1"
```

The `VERSION` variable is optional.
The releases can be found in the `releases` folder as `.zip` files.
The release is only local.

### How to test locally
```
make paw-fast
```

or
```
make paw-extension
```

The extension will be compiled into a build and immediately copied to the Extension folder in Paw.

**note:** `paw-extension` is basically `paw-fast` with a `make install` before.
