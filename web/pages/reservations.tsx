import { getClient } from '../lib/sanity.server';
import { GetServerSideProps } from 'next';
import { getReservations } from '../lib/queries';
import { SearchBar } from '../components/SearchBar';
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
	const reservations = await getClient().fetch(getReservations);

	return {
		props: {
			reservations,
		},
	};
};

interface Props {
	reservations: any;
}

const Reservations = ({ reservations }: Props) => {
	const router = useRouter();
	const [query, setQuery] = useState('');
	const fuse = new Fuse(reservations, {
		keys: ['resource', 'teacher.name', 'type'],
	});

	const results = fuse.search(query);
	const searchResults = query
		? results.map((result: any) => result.item)
		: reservations;

	const handleOnSearch = (e: any) => {
		const value = e.target.value;
		setQuery(value);
	};
	return (
		<div className='page'>
			<main>
				<header className='p-3 mb-1'>
					<div className='flex items-center space-x-2 mb-3'>
						<HiChevronLeft />
						<button type='button' onClick={() => router.back()}>
							Back
						</button>
					</div>
					<h1 className='font-bold text-3xl'>Reservations</h1>
				</header>
				<SearchBar query={query} handleOnSearch={handleOnSearch} />
				<section className='p-3 space-y-4'>
					{searchResults?.map((reservation: any) => {
						const { _id, teacher, resource, dates, type } = reservation;
						return (
							<div
								key={_id}
								className={`p-2 border-l-4 ${
									type == 'ELA' ? 'border-green' : 'border-coral'
								}`}>
								<p>{teacher.name}</p>
								<p className='font-semibold'>{resource}</p>
								<p>{dates[0]}</p>
							</div>
						);
					})}
				</section>
			</main>
		</div>
	);
};

export default Reservations;
