import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Institution
  const institution = await prisma.institution.create({
    data: {
      name: 'Global Eco Corp',
      domain: 'globaleco.com',
    },
  });
  console.log(`Created institution with id: ${institution.id}`);

  // 2. User
  const user = await prisma.user.create({
    data: {
      email: 'jane.doe@globaleco.com',
      passwordHash: 'hashed_password_placeholder',
      role: 'USER',
      institutionId: institution.id,
    },
  });
  console.log(`Created user with id: ${user.id}`);

  // 3. DigitalTwinState
  const twin = await prisma.digitalTwinState.create({
    data: {
      userId: user.id,
      currentEmissions: 15.5,
      energyUsage: 350.2,
    },
  });
  console.log(`Created twin with id: ${twin.id}`);

  // 4. CarbonAction
  const action = await prisma.carbonAction.create({
    data: {
      userId: user.id,
      type: 'SOLAR_INSTALLATION',
      description: 'Installed 5kW solar panels on roof',
      emissionReduction: 2.5,
    },
  });
  console.log(`Created action with id: ${action.id}`);

  // 5. Verification
  const verification = await prisma.verification.create({
    data: {
      carbonActionId: action.id,
      status: 'APPROVED',
      trustScore: 98.5,
      mediaHash: '0x1ab2c3d4e5f6g7h8i9j0',
      previousHash: '0x00000000000000000000',
      verifiedAt: new Date(),
    },
  });
  console.log(`Created verification with id: ${verification.id}`);

  // 6. CarbonScore
  const score = await prisma.carbonScore.create({
    data: {
      digitalTwinId: twin.id,
      score: 85.0,
    },
  });
  console.log(`Created score with id: ${score.id}`);

  // 7. Recommendation
  const recommendation = await prisma.recommendation.create({
    data: {
      digitalTwinId: twin.id,
      title: 'Switch to LED Lighting',
      description: 'Replace all incandescent bulbs to save energy.',
      potentialImpact: 0.5,
    },
  });
  console.log(`Created recommendation with id: ${recommendation.id}`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
