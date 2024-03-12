'use client';
import Empty from '@/components/empty';
import Heading from '@/components/heading';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Music, Video, VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
const VideoPage = () => {
	const router = useRouter();
	const [video, setVideo] = useState<string>();

	const formSchema = z.object({
		prompt: z.string().min(1, {
			message: 'Video Prompt is required.',
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
			setVideo(undefined);

			const response = await axios.post('/api/video', values);

			setVideo(response?.data[0]);
			form.reset();
		} catch (error: any) {
			console.log(error);
			toast.error('Something went wrong');
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<div>
				<Heading iconColor='text-orange-700' bgColor='bg-orange-700/10' title='Video Generation' description='Turn your prompt into vide.' icon={VideoIcon} />
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
											placeholder='Clown fish swimming around a coral reef'
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
				{!video && !isLoading && (
					<div>
						<Empty label='No video started.' />
					</div>
				)}
				{video && (
					<video controls className='w-full mt-8 aspect-video rounded-lg border bg-black'>
						<source src={video} />
					</video>
				)}
			</div>
		</div>
	);
};

export default VideoPage;
