.PHONY: install
install:
	pnpm install

.PHONY: build
build:
	cd ui && pnpm lingui:extract && pnpm lingui:compile
	pnpm -r build

.PHONY: test
test:
	pnpm -r test

.PHONY: format
format:
	pnpm prettier ui game --write
	# cd game && pnpm eslint . --fix
	# cd ui && pnpm eslint . --fix

.PHONY: check-format
check-format:
	pnpm prettier ui game --check
	# cd game && pnpm eslint . --quiet
	# cd ui && pnpm eslint . --quiet

.PHONY: watch
watch:
	pnpm -r --parallel watch

.PHONY: dev
dev:
	cd ui && pnpm dev
