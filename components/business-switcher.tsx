'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useBusinessModal } from '@/hooks/use-business-modal';
import { Business } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { string } from 'zod';
import { Button } from './ui/button';
import {
  Check,
  ChevronsUpDownIcon,
  PlusCircle,
  Store as BusinessIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface BusinessSwitcherProps extends PopoverTriggerProps {
  items: Business[];
}

interface FormatedItems {
  label: string;
  value: string;
}

export const BusinessSwitcher: FC<BusinessSwitcherProps> = ({
  items = [],
  className,
}) => {
  const businessModal = useBusinessModal();
  const params = useParams();
  const router = useRouter();

  // Control Modal State
  const [open, setOpen] = useState(false);

  const formatedItems: FormatedItems[] = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentBusiness = formatedItems.find(
    (item) => item.value === params.businessId
  );

  const onBusinessSelect = (business: FormatedItems) => {
    setOpen(false);
    router.push(`/${business.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          role='combobox'
          aria-expanded={open}
          aria-label='Select a business'
          className={cn(
            'w-[200px] justify-between items-center text-sm',
            className
          )}
        >
          <BusinessIcon className='mr-2 h-4 w-4' />
          {currentBusiness?.label}
          <ChevronsUpDownIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search business...' />
            <CommandEmpty>No business found.</CommandEmpty>
            <CommandGroup heading='all usiness'>
              {formatedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => onBusinessSelect(item)}
                  className='text-sm'
                >
                  <BusinessIcon className='mr-2 h-4 w-4' />
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w4',
                      currentBusiness?.value === item.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  businessModal.onOpen();
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create Business
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
