'use client';
import BotAvatar from '@/components/bot-avatar';
import Empty from '@/components/empty';
import Heading from '@/components/heading';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from 'openai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const ConversationPage = () => {
	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

	const formSchema = z.object({
		prompt: z.string().min(1, {
			message: 'Prompt is required.',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionRequestMessage = {
				role: 'user',
				content: values.prompt,
			};

			const newMessages = [...messages, userMessage];

			const response = await axios.post('/api/conversation', {
				messages: newMessages,
			});

			setMessages(current => [...current, userMessage, response.data]);

			form.reset();
		} catch (error: any) {
			console.log(error);
		} finally {
			router.refresh();
		}
	};

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
			<div className='space-y-4 mt-4'>
				{isLoading && (
					<div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
						<Loader />
					</div>
				)}
				{messages?.length === 0 && !isLoading && (
					<div>
						<Empty label='No conversation started.' />
					</div>
				)}
				<div className='flex flex-col-reverse gap-y-4'>
					{messages.map(item => (
						<div className={cn('p-8 w-full flex item-start gap-x-8 rounded-lg', item?.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')} key={item?.content}>
							{item?.role === 'user' ? <UserAvatar /> : <BotAvatar />}
							{item?.content}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ConversationPage;
