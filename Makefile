install:
	npm ci
	
publish:
	npm publish --dry-run

lint:
	npx eslint .

lintfix:
	npx eslint . --fix

test-coverage:
	npm test -- --coverage