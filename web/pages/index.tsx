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
	const [typeFilter, setTypeFilter] = useState('');

	const filteredResources = resources.filter((resource: any) => {
		return resource.type.includes(typeFilter);
	});

	const searchItems = typeFilter ? filteredResources : resources;

	const [query, setQuery] = useState('');
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
