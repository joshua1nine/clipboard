import Link from 'next/link';
import React from 'react';
import { HiCog } from 'react-icons/hi';

interface Props {
	title: string;
}

const Header = ({ title }: Props) => {
	return (
		<>
			<header className='p-3 mb-1 flex justify-between items-center'>
				<h1 className='font-bold text-3xl'>
					<Link href={'/'}>
						<a>{title}</a>
					</Link>
				</h1>
				<Link href='/dashboard'>
					<a>
						<HiCog size={30} className='text-blue' />
					</a>
				</Link>
			</header>
		</>
	);
};

export default Header;
