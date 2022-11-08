import { getClient } from '@lib/sanity.server';
import { GetServerSideProps } from 'next';
import { getResource, getResourceReservations } from '@lib/queries';
import { urlFor } from '@lib/sanity';
import Image from 'next/image';
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug: any = context?.query?.slug;
	const id: any = context?.query?.id;
	// const resource = await getClient().fetch(getResource, { slug: slug });
	const resource = await getResource(slug);
	const reservations = await getResourceReservations(id);

	return {
		props: {
			resource,
			reservations,
		},
	};
};

interface Props {
	resource: any;
	reservations: any;
}

const Resource = ({ resource, reservations }: Props) => {
	// State
	const router = useRouter();
	const { title, tags, mainImage, _id } = resource;
	const [range, setRange] = useState<any>();
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	// Date Picker Options
	const disabledDays = reservations?.dates?.map((date: any) => ({
		from: new Date(date.from.split('-').join(', ')),
		to: new Date(date.to.split('-').join(', ')),
	}));

	let footer = <p>Please pick the first day.</p>;

	if (range?.from) {
		if (!range.to) {
			footer = <p>{format(range.from, 'PPP')}</p>;
		} else if (range.to) {
			footer = (
				<p>
					{format(range.from, 'PPP')} - {format(range.to, 'PPP')}
				</p>
			);
		}
	}

	const handleOnSubmit = (e: any) => {
		e.preventDefault();
		const formData = {
			resource: _id,
			teacher: {
				name: name,
				email: email,
			},
			date: {
				to: format(range.to, 'yyyy, MM, dd'),
				from: format(range.from, 'yyyy, MM, dd'),
			},
		};
		fetch('/api/reservation', {
			method: 'post',
			body: JSON.stringify(formData),
		});
	};

	return (
		<main className='p-4 max-w-4xl mx-auto'>
			<header className='mb-6'>
				<div className='flex items-center space-x-2'>
					<HiChevronLeft />
					<button type='button' onClick={() => router.back()}>
						Back
					</button>
				</div>
			</header>
			<h1 className='text-3xl font-bold mb-4'>{title}</h1>
			<div className='res-grid'>
				<div>
					<div className={`relative aspect-[4/3] shadow-lg border border-blue`}>
						<Image
							src={urlFor(mainImage).url()}
							layout='fill'
							objectFit='cover'
							priority
						/>
					</div>
					<div className='my-2 space-x-1'>
						{tags?.map((tag: string, index: number) => {
							return (
								<span
									key={index}
									className='text-white text-sm py-1 px-2 bg-blue rounded-md'>
									{tag}
								</span>
							);
						})}
					</div>
					{/* <p className='mb-10'>Available Now</p> */}
				</div>
				<div>
					<DayPicker
						mode='range'
						selected={range}
						footer={footer}
						onSelect={setRange}
						disabled={disabledDays}
					/>
					<form className='space-y-3' onSubmit={handleOnSubmit}>
						<label htmlFor='name' className='flex flex-col'>
							<span>Name</span>
							<input
								type='text'
								name='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label htmlFor='email' className='flex flex-col'>
							<span>Email</span>
							<input
								type='text'
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<input
							type='submit'
							value='Submit'
							className='text-white py-3 px-5 bg-blue rounded-md'
						/>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Resource;
