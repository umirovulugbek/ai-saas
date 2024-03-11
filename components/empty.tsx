import Image from 'next/image';

const Empty = ({ label }: { label: string }) => {
	return (
		<div className='h-full p-20 flex flex-col items-center justify-center'>
			<div className='relative h-72 w-72'>
				<Image alt='Empty' fill src={'/empty.png'} />
			</div>
			<p className='text-sm text-muted-foreground text-center'>{label}</p>
		</div>
	);
};

export default Empty;
