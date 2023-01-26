install:
	npm ci
	
publish:
	npm publish --dry-run

lint:
	npx eslint .

lintfix:#fixing linter
	npx eslint . --fix