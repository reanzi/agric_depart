import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const business = await prismadb.business.findFirst({
    where: {
      userId,
    },
  });
  if (business) {
    redirect(`/${business.id}`);
  }
  return <>{children}</>;
}
