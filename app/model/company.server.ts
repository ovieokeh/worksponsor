import type { Company, CompanyContact, CompanySocials } from "@prisma/client";
import { prisma } from "~/db.server";

type CompanyId = { id: string };
export type CompanyWithContactsAndSocials = {
  details: Company;
  contact: CompanyContact;
  socials: CompanySocials;
};

export function getCompanies({ skip = 0, take = 10 }) {
  return prisma.company.findMany({
    skip,
    take,
  });
}

function getCompanyContact({ id }: CompanyId) {
  return prisma.companyContact.findUnique({
    where: { companyId: id },
  });
}

function getCompanySocials({ id }: CompanyId) {
  return prisma.companySocials.findUnique({
    where: { companyId: id },
  });
}

export async function getCompany(
  companyId: CompanyId
): Promise<CompanyWithContactsAndSocials> {
  const companyDetails = await prisma.company.findUnique({
    where: companyId,
  });
  const companyContact = await getCompanyContact(companyId);
  const companySocials = await getCompanySocials(companyId);

  return {
    details: companyDetails as Company,
    contact: companyContact as CompanyContact,
    socials: companySocials as CompanySocials,
  };
}
