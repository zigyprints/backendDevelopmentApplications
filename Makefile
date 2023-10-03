install:
	npm install --save-dev

build: install
	npm run build

run: build
	npm run