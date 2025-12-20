

dev: 
	bun run start:dev

db:
	docker rm -f platform-questions-db || true
	docker run --name platform-questions-db \
		-e POSTGRES_USER=admin \
		-e POSTGRES_PASSWORD=123456 \
		-p 5432:5432 \
		-d postgres
	sleep 5  
	bunx prisma db push
	bunx prisma db pull
	bun run prisma/seed.ts
 
migration:
	bunx prisma db push
	bunx prisma db pull
	bunx prisma generate


seed:
	bun run prisma/seed.ts