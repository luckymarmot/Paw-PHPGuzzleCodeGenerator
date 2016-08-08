BASE=$(shell pwd)
SCRIPTS=$(BASE)/scripts

all: configure pack

# Install the requirements
configure:
	npm install

# Build the ES5 script
build:
	sh "$(SCRIPTS)/build.sh" $(BASE)

# Builds a ready-to-deploy ZIP file
pack: build
	sh "$(SCRIPTS)/release.sh" $(BASE) $(VERSION)

# Install in Paw extensions folder
install: build
	sh "$(SCRIPTS)/transfer.sh" $(BASE)

# Validation commands
lint:
	sh "$(SCRIPTS)/lint.sh" $(BASE)

test:
	sh "$(SCRIPTS)/test.sh" $(BASE)

check: lint test
