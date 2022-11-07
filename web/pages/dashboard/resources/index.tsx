import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Fuse from 'fuse.js';
import Link from 'next/link';
import React, { useState } from 'react';
import BackBtn from '@components/BackBtn';
import { FilterOverlay } from '@components/FilterOverlay';
import Header from '@components/Header';
import { SearchBar } from '@components/SearchBar';
import { applyFilters } from '@lib/applyFilters';
import { getAllResources, getAllTags } from '@lib/queries';
import { getClient } from '@lib/sanity.server';

type Props = {
	resources: Resource[];
	tags: Tag[];
};

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps() {
		const resources: Resource[] = await getClient().fetch(getAllResources);
		const tags: Tag[] = await getClient().fetch(getAllTags);

		return {
			props: {
				resources,
				tags,
			},
		};
	},
});

const resources = ({ resources, tags }: Props) => {
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
			<BackBtn />
			<Header title='Resources' />
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
			<main className='px-3 max-w-4xl mx-auto'>
				<table className='table-auto border-collapse border border-blue w-full'>
					<thead>
						<tr className='bg-blue text-white'>
							<th className='text-left p-4'>Name</th>
							<th className='text-left p-4'>Type</th>
							<th className='text-left p-4'></th>
						</tr>
					</thead>
					<tbody>
						{searchResults?.map((r: Resource) => {
							return (
								<tr key={r._id} className='border-b border-blue'>
									<td className='text-left p-4'>
										<span>{r.title}</span>
									</td>
									<td className='text-left p-4'>
										<span>{r.type}</span>
									</td>
									<td className='text-center flex space-x-3 p-4'>
										<Link href={`/dashboard/resources/${r.slug}`}>
											<a>
												<img
													className='w-5 h-5 text-blue'
													src='/pen-solid.svg'
													alt=''
												/>
											</a>
										</Link>
										<button>
											<img
												className='w-5 h-5  text-red-700'
												src='/trash-solid.svg'
												alt=''
											/>
										</button>
									</td>
									{/* <td className='text-left p-4'>
										<span>Delete</span>
									</td> */}
								</tr>
							);
						})}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default resources;
