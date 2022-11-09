import { GetServerSideProps } from 'next';
import { getResource } from '@lib/queries';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug: any = context?.query?.slug;
	const resource = await getResource(slug);

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
