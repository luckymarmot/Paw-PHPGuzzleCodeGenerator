BASE=$(shell pwd)
SCRIPTS=$(BASE)/scripts

# Setup commands
install:
	npm install

# Validation commands
lint:
	sh "$(SCRIPTS)/lint.sh" $(BASE)

test:
	sh "$(SCRIPTS)/test.sh" $(BASE)

validate: lint test

# Build commands
build:
	sh "$(SCRIPTS)/build.sh" $(BASE)

release:
	sh "$(SCRIPTS)/release.sh" $(BASE) $(VERSION)

deploy: install build release

transfer:
	sh "$(SCRIPTS)/transfer.sh" $(BASE)

# Super commands
paw-extension: deploy transfer

paw-fast: build release transfer
