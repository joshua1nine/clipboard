import { GetServerSideProps } from 'next';
import { getResource } from '@lib/queries';
import { getClient } from '@lib/sanity.server';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { slug } = context?.query;
	const resource = await getClient().fetch(getResource, { slug: slug });

	return {
		props: {
			resource,
		},
	};
};

type Props = {
	resource: Resource;
};

const SingleResource = ({ resource }: Props) => {
	return (
		<div>
			<h1>{resource.title}</h1>
		</div>
	);
};

export default SingleResource;
