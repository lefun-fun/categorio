.PHONY: install
install:
	pnpm install

.PHONY: build
build:
	cd ui && pnpm run lingui:extract && pnpm run lingui:compile
	pnpm run -r build

.PHONY: test
test:
	pnpm run -r test

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
	pnpm run -r watch

.PHONY: dev
dev:
	cd ui && pnpm run dev
