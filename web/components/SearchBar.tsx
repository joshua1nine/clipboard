import { HiChevronDown } from 'react-icons/hi';

export const SearchBar = () => {
	return (
		<nav className='flex justify-between border-t border-b border-blue space-x-2 p-2 mb-2'>
			<input
				className='flex-1 border-t-0 border-b-0 border-l-0 border-r border-blue placeholder:text-blue focus:ring-0 focus:border-blue'
				type='text'
				name='search'
				placeholder='Search...'
			/>
			<div className='flex justify-center items-center space-x-2 px-4'>
				<button type='button'>Filters</button>
				<HiChevronDown />
			</div>
		</nav>
	);
};
