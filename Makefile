ps:
	docker compose ps

up:
	docker compose up -d

down:
	docker compose down -v

install:
	docker compose exec nodejs npm install

dev:
	docker compose exec nodejs npm run dev

secret:
	openssl rand -base64 32

bash:
	docker compose exec nodejs /bin/sh

logs:
	docker compose logs nodejs -f

# Prisma commands
dbreset:
	docker compose exec nodejs npx prisma db push --force-reset # Not to be used in your production environment : to push the initial schema to the database. --force-reset to ignore the current state of the database and apply the schema from scratch.

dbupdate:
	docker compose exec nodejs npx prisma migrate dev --create-only  # To create a new migration based on the changes you made to your Prisma schema.

dpm:
	docker compose exec nodejs npx prisma migrate dev # To create a new migration based on the changes you made to your Prisma schema.

seed:
	docker compose exec nodejs npx prisma db seed # To seed the database with some initial data.