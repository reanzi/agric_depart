import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import SettingsForm from './components/settings-form';

interface SettingsPageProps {
  params: { businessId: string };
}
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) return redirect('/sign-in');

  const business = await prismadb.business.findFirst({
    where: {
      id: params.businessId,
      userId,
    },
  });

  if (!business) return redirect('/');
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={business} />
      </div>
    </div>
  );
};
export default SettingsPage;
