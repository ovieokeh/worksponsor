import { prisma } from "~/db.server";

export async function addWaitlist(email: string): Promise<boolean> {
  const waitlistedEmail = await prisma.waitlist.create({ data: { email } });
  return !!waitlistedEmail;
}
