import { getReservations } from '../../lib/queries';
import { SearchBar } from '../../components/SearchBar';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';
import { useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Header from '@components/Header';
import BackBtn from '@components/BackBtn';

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps() {
		const reservations = await getReservations();

		return {
			props: {
				reservations,
			},
		};
	},
});

interface Props {
	reservations: Reservation[];
}

const Reservations = ({ reservations }: Props) => {
	const router = useRouter();
	const [query, setQuery] = useState('');
	const [toggleFilter, setToggleFilter] = useState(false);
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
			<BackBtn />
			<Header title='Reservations' />
			<main className='max-w-4xl mx-auto'>
				<SearchBar
					query={query}
					handleOnSearch={handleOnSearch}
					setToggleFilter={setToggleFilter}
					toggleFilter={toggleFilter}
				/>
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
								<p>
									{dates[0].from} - {dates[0].to}
								</p>
							</div>
						);
					})}
				</section>
			</main>
		</div>
	);
};

export default Reservations;
