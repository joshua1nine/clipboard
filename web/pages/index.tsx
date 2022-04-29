import type { NextPage } from 'next';
import { Card } from '../components/Card';
import { getClient } from '../lib/sanity.server';
import { GetServerSideProps } from 'next';
import { getAllResources } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { SearchBar } from '../components/SearchBar';
import { HiCog } from 'react-icons/hi';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { useState } from 'react';
import { applyFilters } from '../lib/applyFilters';

export const getServerSideProps: GetServerSideProps = async () => {
	const resources = await getClient().fetch(getAllResources);

	return {
		props: {
			resources,
		},
	};
};

interface Props {
	resources: any;
}

const Home = ({ resources }: Props) => {
	const [filters, setfilters] = useState({
		type: 'ELA',
		tags: ['Kindergarten'],
	});
	const [query, setQuery] = useState('');

	const searchItems = applyFilters(resources, filters);

	const fuse = new Fuse(searchItems, {
		keys: ['title', 'tags', 'type'],
	});

	const results = fuse.search(query);

	const searchResults = query
		? results.map((result: any) => result.item)
		: searchItems;

	const handleOnSearch = (e: any) => {
		const value = e.target.value;
		setQuery(value);
	};

	return (
		<div className='page'>
			<main>
				<header className='p-3 mb-1 flex justify-between items-center'>
					<h1 className='font-bold text-3xl'>SECC Resources</h1>
					<Link href='/reservations'>
						<a>
							<HiCog size={30} className='text-blue' />
						</a>
					</Link>
				</header>
				<SearchBar query={query} handleOnSearch={handleOnSearch} />
				<section className='p-3'>
					{searchResults?.map((resource: any) => {
						return (
							<Card
								key={resource._id}
								id={resource._id}
								title={resource.title}
								image={urlFor(resource.mainImage).url()}
								type={resource.type}
								slug={resource.slug}
							/>
						);
					})}
				</section>
			</main>
		</div>
	);
};

export default Home;
