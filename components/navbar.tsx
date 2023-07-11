import { UserButton, auth } from '@clerk/nextjs';
import { BusinessSwitcher } from '@/components/business-switcher';
import { MainNav } from '@/components/main-nav';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

export const Navbar = async () => {
  const { userId } = auth();
  if (!userId) return redirect('/sign-in');
  const business = await prismadb.business.findMany({ where: { userId } });
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <BusinessSwitcher items={business} />
        <MainNav />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};
