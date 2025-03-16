# Pilot Arcade
A maritime-themed gaming platform built with Next.js, featuring arcade games, achievements, and leaderboards.

## Overview
Pilot Arcade is a web-based gaming platform that brings together maritime-themed games in one place. The platform includes:

Multiple arcade games with a nautical theme
User authentication and profiles
Real-time leaderboards
Achievement system
In-game rewards (coins and XP)
News feed showing player activities
Featured Games
Hajfyldt Havari
Navigate through treacherous waters, avoiding obstacles and earning points. Track your high scores and unlock achievements based on your performance.

## Technologies Used
Frontend: Next.js 14, React, TypeScript, Tailwind CSS
Backend: Next.js server actions, and SSR
Database: PostgreSQL with Prisma ORM
Authentication: NextAuth.js
UI Components: Custom component library with Shadcn UI

## Technical Features
* Optimized images and assets for fast loading times.
* Server-side rendering for improved SEO and performance.
* Caching of dynamic data for faster loading times.
* Achievements system with unlockable Achievements.
* User authentication with NextAuth.js.
* Responsive design for mobile and desktop.
* News feed showing player activities.
* In-game rewards system with coins and XP.
* Leaderboards to show top players.

## Getting Started
### Prerequisites
* Node.js 22.x or higher
* PostgreSQL database - I recommend using docker to run a local instance of PostgreSQL for development.
    ```sh
    docker run -d \
    --name postgres-db \
    -e POSTGRES_USER=myuser \
    -e POSTGRES_PASSWORD=mypassword \
    -e POSTGRES_DB=mydatabase \
    -p 5432:5432 \
    -v postgres_data:/var/lib/postgresql/data \
    --restart=always \
    postgres:latest
    ```
    connection string: `postgresql://myuser:mypassword@mydatabase:5432/mydatabase` 
* npm or yarn
### Installation
1. Clone the repository
2. run ```npm install``` to install the dependencies
3. Set up environment variables Create a .env file in the root directory with the following variables: - see .env.example
4. To initialize the database, run ```npx prisma db push``` to create the tables.
5. Run ```npx prisma db seed``` to seed the database with game and achievement data.
6. Start the development server by running ```npm run dev```
7. Open http://localhost:3000 in your browser
### Project Structure
pilot-arcade/
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── src/
│   ├── app/                # App router pages
│   ├── components/         # React components
│   │   ├── ui/             # UI components 
│   │   └── navBar/         # Navigation components
│   └── lib/                # Utility functions and shared code
├── .env                    # Environment variables
└── README.md              

### Deployment
This project uses the following services and tools:
* Neon Postgres as Serverless Database
* Cookiebot for cookie consent
* Sentry for error tracking
* Vercel Analytics for tracking
* Vercel for deployment


## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.