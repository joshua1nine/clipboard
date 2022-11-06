import React from 'react';
import Header from '../components/Header';
import LoginBtn from '../components/LoginBtn';
type Props = {};

const Login = (props: Props) => {
	return (
		<div className='page'>
			<main className='max-w-4xl mx-auto relative'>
				<Header title='Login' />
				<LoginBtn />
			</main>
		</div>
	);
};

export default Login;
