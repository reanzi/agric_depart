import prismadb from '@/lib/prismadb';
import { FC } from 'react';

interface DashboardPageProps {
  params: { businessId: string };
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const business = await prismadb.business.findFirst({
    where: { id: params.businessId },
  });
  return <div>Active business: {business?.name}</div>;
};
export default DashboardPage;
