'use client';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ConversationPage = () => {
	const formSchema = z.object({
		prompt: z.string().min(2).max(50),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<div>
			<div>
				<Heading iconColor='text-violet-500' bgColor='bg-violet-500/10' title='Conversation' description='Our most advanced conversation model.' icon={MessageSquare} />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
						<FormField
							control={form.control}
							name='prompt'
							render={({ field }) => (
								<FormItem className='col-span-12 lg:col-span-10'>
									<FormControl className='p-0 m-0'>
										<Input
											{...field}
											className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
											disabled={isLoading}
											placeholder='How to I calculate the rasius of a circle?'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
							Generate
						</Button>
					</form>
				</Form>
			</div>
			<div className='space-y-4 mt-4'>Message Content</div>
		</div>
	);
};

export default ConversationPage;
