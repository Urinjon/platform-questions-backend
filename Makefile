.PHONY: dev setup db migration seed test

dev: 
	bun run start:dev

setup:
	bun install
	bunx prisma generate

db:
	docker rm -f platform-questions-db || true
	docker run --name platform-questions-db \
		-e POSTGRES_USER=admin \
		-e POSTGRES_PASSWORD=123456 \
		-p 5432:5432 \
		--network host \
		-d postgres

	sleep 5  
	bunx prisma db push
	bunx prisma db pull
	bunx prisma generate
	bun run prisma/seed.ts
 
migration:
	bunx prisma db push
	bunx prisma db pull
	bunx prisma generate


seed:
	bun run prisma/seed.ts


test:
	bun run lint:fix
	bun run format:fix
	bun run test:e2e
	bun run build
	bun run knip 


#docker build --no-cache -t p-q . 	
pre-prod: 
	docker rm -f p-q || true
	docker build -t p-q .
	docker run -t p-q

dashboard:
	bunx prisma studio



test-prisma:
	npx prisma generate
	npm run build
	npm run start:prod