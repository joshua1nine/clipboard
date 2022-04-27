import Image from 'next/image';
import Link from 'next/link';

interface Props {
	slug: string;
	type: string;
	image: string;
	title: string;
}

export const Card = ({ type, image, title, slug }: Props) => {
	return (
		<Link href={`/resources/${slug}`}>
			<a>
				<article>
					<div>
						<Image src={image} width={400} height={300} />
						<span>{type}</span>
					</div>
					<h2>{title}</h2>
				</article>
			</a>
		</Link>
	);
};
