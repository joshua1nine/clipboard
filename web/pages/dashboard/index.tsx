import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';
import Header from '../../components/Header';

export const getServerSideProps = withPageAuthRequired();

const Dashboard = () => {
	return (
		<div className='page'>
			<Header title='Dashboard' />
			<main className='px-3 max-w-4xl mx-auto relative'>
				<div>
					<Link href='/dashboard/reservations'>
						<a>Reservations</a>
					</Link>
				</div>
				<div>
					<Link href='/dashboard/resources'>
						<a>Resources</a>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
