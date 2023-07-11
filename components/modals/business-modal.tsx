'use client';
import * as z from 'zod';
import { useBusinessModal } from '@/hooks/use-business-modal';
import { Modal } from '@/components/ui/modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Name should be atleast 3 characters'),
});

export const BusinessModal = () => {
  const businessModal = useBusinessModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO:: create Business
    console.log({ values });
    try {
      setLoading(true);
      const res = await axios.post('/api/business', values);
      console.log(res.data);
      // toast.success('Business Createds!', { position: 'bottom-right' });
      window.location.assign(`/${res.data.id}`);
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!', { position: 'bottom-right' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title='Create'
      description='Add new business to manage priducts and categories'
      isOpen={businessModal.isOpen}
      onClose={businessModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='E-Commerce'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end'>
                <Button
                  disabled={loading}
                  variant={'ghost'}
                  onClick={businessModal.onClose}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={loading} variant={'secondary'}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
