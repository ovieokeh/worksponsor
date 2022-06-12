import type { Company, CompanyContact, CompanySocials } from "@prisma/client";

import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { randEmail, randPhoneNumber, randUrl } from "@ngneat/falso";
import csv from "csv-parser";

type GeneratedCompany = Omit<Company, "id" | "createdAt" | "updatedAt">;

function generateCompanies(length = 20): GeneratedCompany[] {
  const generatedCompanies: GeneratedCompany[] = [];

  let counter = 0;
  fs.createReadStream(path.resolve("companies.csv"))
    .pipe(csv())
    .on("data", (data: any) => {
      if (counter === length) return;

      const company: GeneratedCompany = {
        name: data.Company,
        kvk: data["KvK nummer"],
        description: data.Description || "unknown",
        address: data.Address || "unknown",
        websiteUrl: data["Website URL"] || "unknown",
        foundedYear: data["Year founded"] || "unknown",
        numOfEmployees: data["Number of employees"] || "unknown",
      };
      generatedCompanies.push(company);

      counter += 1;
    })
    .on("end", () => {
      console.info("companies generated");
    });

  return generatedCompanies;
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
  const companies = generateCompanies(9087);

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
