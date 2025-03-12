import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



async function main() {
  console.log("Seeding achievements...");
  const games = [
    {
      id: "3f4d04da-46df-43d7-bb6c-0b15e943057a",
      title: "Hajfyldt Havari",
      description: "Du er kaptajnen på en skib, der suser gennem et hav fyldt med sultne hajer! 🦈💨 Dit mål? Undgå at blive dagens special på hajbuffeten! Navigér gennem farlige farvande, undvig rasende rovdyr, og se, hvor længe du kan overleve før DIN tur slutter i et kæmpe SPLASK! 🌊💀",
      imageUrl: "Hajfyldt-Havari/public/gameTitle.jpg",
    },
  ]

  const achievements = [
    // Distance Traveled
    {
      id: "6229a0c6-d3c2-46cc-b3fd-34b53adf9e24",
      name: "Bare en Damsejler",
      description: "Sejl 1 sømil i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/distance1.png",
      xpReward: 50,
      coinReward: 5,
    },
    {
      id: "77021a65-4852-4f24-919d-281d5ddfdd17",
      name: "Kystkrydseren",
      description: "Sejl 10 sømil i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/distance2.png",
      xpReward: 250,
      coinReward: 50,
    },
    {
      id: "df904650-b232-44ce-bf3e-597feda0b4e6",
      name: "Den Lange Fart",
      description: "Sejl 25 sømil i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/distance3.png",
      xpReward: 500,
      coinReward: 100,
    },
    {
      id:"6dce0aaf-7253-42c6-8ab6-133d7d64e04d",
      name: "Kaptajn, Vi Har Mistet Land af Syne",
      description: "Sejl 50 sømil i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/distance4.png",
      xpReward: 1250,
      coinReward: 500,
    }, 
    {
      id: "90394e9f-4490-433d-aa40-8e31a773809c",
      name: "Sejlet Ud Over Verdenskortet",
      description: "Sejl 100 sømil i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/distance5.png",
      xpReward: 3000,
      coinReward: 1500,
    },

    // High Scores
    {
      id:"1ab5c57d-c490-458c-b166-c620a57b5f54",
      name: "Børneskib",
      description: "Opnå en score på 1.000.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/score1.png",
      xpReward: 50,
      coinReward: 5,
    },
    {
      id:"3ff79b6c-0fb3-4ed8-ada8-1089494d29d2",
      name: "Weekendsejleren",
      description: "Opnå en score på 5.000.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/score2.png",
      xpReward: 250,
      coinReward: 50,
    },
    {
      id: "f96b5853-9d81-4165-8339-26ed450e56d6",
      name: "Fjordens Frygt",
      description: "Opnå en score på 10.000.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/score3.png",
      xpReward: 500,
      coinReward: 100,
    },
    {
      id:"dc13bbf9-00e8-47b1-8a3a-d41413deb8bf",
      name: "Titanic Uden Isbjerg",
      description: "Opnå en score på 20.000.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/score4.png",
      xpReward: 1250,
      coinReward: 500,
    },
    {
      id:"4d4277bb-39ff-44fe-a5a9-5ac61df8d6d8",
      name: "Poseidons Favorit",
      description: "Opnå en score på 50.000.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/score5.png",
      xpReward: 3000,
      coinReward: 1500,
    },

    // Obstacles Avoided
    {
      id:"c3ab5eaf-7ad4-46f6-9b6b-4f46320ed76b",
      name: "Hajerne Er Sultne",
      description: "Undgå 50 hajer i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/shark1.png",
      xpReward: 50,
      coinReward: 5,
    },
    {
      id:"e7e9e884-37ca-4eb4-9ef5-a8b0a62aab67",
      name: "Haj Hejjjj!",
      description: "Undgå 100 hajer i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/shark2.png",
      xpReward: 250,
      coinReward: 50,
    },
    {
      id:"2472658f-48a3-4348-a506-36711971060e",
      name: "Fuld Skipperlicens",
      description: "Undgå 500 hajer i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/shark3.png",
      xpReward: 500,
      coinReward: 100,
    },
    {
      id:"08075136-f6ba-4837-842c-037f689b71b8",
      name: "Havets Ninja",
      description: "Undgå 1.000 hajer i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/shark4.png",
      xpReward: 1250,
      coinReward: 500,
    },
    {
      id:"a03f0a86-6fba-4a6e-aed0-909d58f9e2dd",
      name: "Neptuns Mareridt",
      description: "Undgå 5.000 hajer i alt.",
      gameId: games[0].id,
      imageUrl: "Hajfyldt-Havari/shark5.png",
      xpReward: 3000,
      coinReward: 1500,
    },

    // Fun Extras
    {
      id:"11d37e0d-1431-4bf9-8898-965ceedd355a",
      name: "Bølgerne Var For Store!",
      description: "Dø 10 gange på første forhindring.",
      gameId: games[0].id,
      imageUrl: "fail.png",
      xpReward: 100,
      coinReward: 20,
    },
    {
      id:"842df461-7c5e-40e4-bca7-5b4d72f95e0a",
      name: "Kaffe og Kaptajnshat",
      description: "Spil kl. 8 om morgenen.",
      gameId: games[0].id,
      imageUrl: "early.png",
      xpReward: 50,
      coinReward: 10,
    },
    {
      id: "4a7fbdf9-dbe2-46c3-86b7-f8fdb2df2525",
      name: "For the Win!",
      description: "Spil 10 minutter uden at dø.",
      gameId: games[0].id,
      imageUrl: "marathon.png",
      xpReward: 1000,
      coinReward: 200,
    },
  ];

  for (const game of games) {
    await prisma.game.create({
      data: {
        id: game.id,
        title: game.title,
        releaseDate: new Date(),
        description: game.description,
        imageUrl: game.imageUrl,
      },
    });
  }
  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        imageUrl: achievement.imageUrl,
        gameId: achievement.gameId, // Replace games[0].id with actual game ID
        xpReward: achievement.xpReward,
        coinReward: achievement.coinReward,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
