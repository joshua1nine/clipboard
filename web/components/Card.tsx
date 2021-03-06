import Image from 'next/image';
import Link from 'next/link';

interface Props {
	slug: string;
	type: string;
	image: string;
	title: string;
	id: string;
}

export const Card = ({ type, image, title, slug, id }: Props) => {
	return (
		<Link
			href={{ pathname: `/resources/${slug}`, query: { slug: slug, id: id } }}>
			<a>
				<article>
					<div
						className={`relative aspect-[4/3] shadow-lg ${
							type == 'ELA' ? 'border-green' : 'border-coral'
						} border-2`}>
						<span
							className={`${
								type == 'ELA'
									? 'bg-green border-green'
									: 'bg-coral border-coral'
							} z-40 absolute border bottom-0 left-0 py-1 px-2 text-white`}>
							{type}
						</span>
						<Image src={image} layout='fill' objectFit='cover' />
					</div>
					<h2 className='text-2xl md:text-xl font-semibold mt-2 md:mt-1 leading-none'>
						{title}
					</h2>
				</article>
			</a>
		</Link>
	);
};
