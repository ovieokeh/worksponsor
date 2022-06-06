-- CreateTable
CREATE TABLE "CompanyContact" (
    "companyId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumbers" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CompanySocials" (
    "companyId" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "twitter" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "foundedYear" TEXT NOT NULL,
    "kvk" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyContactCompanyId" TEXT,
    "companySocialsCompanyId" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyContact_companyId_key" ON "CompanyContact"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySocials_companyId_key" ON "CompanySocials"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_kvk_key" ON "Company"("kvk");
