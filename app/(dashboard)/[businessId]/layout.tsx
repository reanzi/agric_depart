import { auth } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { Navbar } from '@/components/navbar';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { businessId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const business = await prismadb.business.findFirst({
    where: { id: params.businessId, userId },
  });

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
