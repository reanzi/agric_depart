'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useBusinessModal } from '@/hooks/use-business-modal';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useEffect } from 'react';

export default function SetupPage() {
  const onOpen = useBusinessModal((state) => state.onOpen);
  const isOpen = useBusinessModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}
