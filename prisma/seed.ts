import type { Company, CompanyContact, CompanySocials } from "@prisma/client";

import { PrismaClient } from "@prisma/client";
import {
  randCompanyName,
  randEmail,
  randNumber,
  randPhoneNumber,
  randProductDescription,
  randUrl,
} from "@ngneat/falso";

type GeneratedCompany = Omit<Company, "id" | "createdAt" | "updatedAt">;

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .getFullYear()
    .toString();
}

const categories = [
  "Technology",
  "Travel",
  "Manufacturing",
  "Consulatancy",
  "Weather",
  "Media",
  "ECommerce",
  "Fintech",
];
function generateCompanies(length = 20): GeneratedCompany[] {
  const companies = new Array(length).fill(randNumber()).map(() => ({
    category: categories[Math.floor(Math.random() * categories.length)],
    description: randProductDescription(),
    foundedYear: randomDate(new Date(2000, 1, 1), new Date()),
    kvk: randNumber().toString(),
    name: randCompanyName(),
  }));

  return companies;
}

function generateCompanySocials(companies: Company[]): CompanySocials[] {
  return companies.map((company) => {
    return {
      companyId: company.id,
      facebook: randUrl(),
      linkedin: randUrl(),
      twitter: randUrl(),
    };
  });
}

function generateCompanyContacts(companies: Company[]): CompanyContact[] {
  return companies.map((company) => {
    return {
      companyId: company.id,
      email: randEmail(),
      phoneNumbers: [randPhoneNumber()].toString(),
    };
  });
}

const prisma = new PrismaClient();

async function seed() {
  const companies = generateCompanies();

  try {
    await prisma.company.deleteMany();
    await prisma.companyContact.deleteMany();
    await prisma.companySocials.deleteMany();

    const companiesRes = await prisma.company.createMany({
      data: companies,
    });
    console.info(
      `Database has been seeded with companies 🌱`,
      companiesRes.count
    );
    const createdCompanies = await prisma.company.findMany();

    const companySocials = generateCompanySocials(createdCompanies);
    const companySocialsRes = await prisma.companySocials.createMany({
      data: companySocials,
    });
    console.info(
      `Database has been seeded with companies socials 🌱`,
      companySocialsRes.count
    );

    const companyContacts = generateCompanyContacts(createdCompanies);
    const companyContactsRes = await prisma.companyContact.createMany({
      data: companyContacts,
    });
    console.info(
      `Database has been seeded with companies contacts 🌱`,
      companyContactsRes.count
    );
  } catch (err) {
    console.error(err);
  } finally {
    console.info("Database seeding complete");
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
