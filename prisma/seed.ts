import prisma from '../src/database/config';
import { getEncryptedPassword } from '../src/services/authService';

async function main() {

  await prisma.user.upsert({
    where: { email: 'ADMIN@ADMIN.COM' },
    update: { },
    create: { 
      email:    'ADMIN@ADMIN.COM',
      firstName:'ADMIN',
      lastName: 'ADMIN',
      type:     'ADMIN',
      password: getEncryptedPassword('1234'), 
    },
  });
  
}

main().catch(err => {
  console.log(err);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
})