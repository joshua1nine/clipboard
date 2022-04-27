import type { NextPage } from 'next';
import Image from 'next/image';

import { Card } from '../components/Card';
import { getClient } from '../lib/sanity.server';
import { GetServerSideProps } from 'next';
import { getAllResources } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { SearchBar } from '../components/SearchBar';

export const getServerSideProps: GetServerSideProps = async () => {
	const resources = await getClient().fetch(getAllResources);

	return {
		props: {
			data: resources,
		},
	};
};

const Home: NextPage = (props: any) => {
	const resources = props.data;
	return (
		<div className='page'>
			<main>
				<header className='p-3 mb-1'>
					<h1 className='font-bold text-4xl'>SECC Resources</h1>
				</header>
				<SearchBar />
				<section className='p-3'>
					{resources?.map((resource: any) => {
						return (
							<Card
								key={resource.id}
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
