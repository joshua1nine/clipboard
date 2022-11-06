import { Card } from '../components/Card';
import { getClient } from '../lib/sanity.server';
import { GetServerSideProps } from 'next';
import { getAllResources, getAllTags } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { SearchBar } from '../components/SearchBar';
import { HiCog } from 'react-icons/hi';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { useState } from 'react';
import { applyFilters } from '../lib/applyFilters';
import { FilterOverlay } from '../components/FilterOverlay';
import Header from '../components/Header';

export const getServerSideProps: GetServerSideProps = async () => {
	const resources = await getClient().fetch(getAllResources);
	const tags = await getClient().fetch(getAllTags);

	return {
		props: {
			resources,
			tags,
		},
	};
};

interface Props {
	resources: Resource[];
	tags: any;
}

const Home = ({ resources, tags }: Props) => {
	const [filters, setFilters] = useState({ type: 'none', tags: [] });
	const [toggleFilter, setToggleFilter] = useState(false);
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
			<main className='max-w-4xl mx-auto relative'>
				<Header title='Clipboard' />
				<SearchBar
					query={query}
					handleOnSearch={handleOnSearch}
					setToggleFilter={setToggleFilter}
					toggleFilter={toggleFilter}
				/>
				{toggleFilter && (
					<FilterOverlay
						filters={filters}
						setFilters={setFilters}
						setToggleFilter={setToggleFilter}
						tags={tags}
					/>
				)}
				<section className='p-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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
