import React, { useState } from 'react';

interface Props {
	filters: any;
	setFilters: any;
	setToggleFilter: any;
	tags: any;
}

export const FilterOverlay = ({
	filters,
	setFilters,
	setToggleFilter,
	tags,
}: Props) => {
	const [typeFilter, setTypeFilter] = useState(filters.type);
	const [tagsFilter, setTagsFilter] = useState<any>(filters.tags);

	const handelSubmit = (e: any) => {
		e.preventDefault();
		setFilters((currentValue: any) => ({
			...currentValue,
			type: typeFilter,
			tags: tagsFilter,
		}));
		setToggleFilter(false);
	};

	const handleTypeFilterChange = (e: any) => {
		setTypeFilter(e.target.value);
	};

	const handleTagFilterChange = (e: any) => {
		let box = e.target;
		if (box.checked) {
			setTagsFilter((current: any) => [...current, box.value]);
		} else {
			setTagsFilter(tagsFilter.filter((f: any) => f !== box.value));
		}
	};

	const handleClear = () => {
		setFilters({ type: 'none', tags: [] });
		setTypeFilter('');
		setTagsFilter([]);
	};

	return (
		<aside className='border border-blue border-t-0 bg-white w-full z-50 p-3 -mt-2 rounded-b-lg md:max-w-xs sm:absolute sm:right-0'>
			<form onSubmit={handelSubmit}>
				<div>
					<h2 className='text-base mb-2'>Types:</h2>
					<div className='flex gap-4 w-full mb-3'>
						<label className='filter-btn flex-1'>
							<input
								className='hidden'
								type='radio'
								name='type'
								id='STEM'
								value='STEM'
								checked={typeFilter === 'STEM'}
								onChange={handleTypeFilterChange}
							/>
							<span className='block border border-blue rounded-md py-1 text-center'>
								STEM
							</span>
						</label>
						<label className='filter-btn flex-1'>
							<input
								className='hidden'
								type='radio'
								name='type'
								id='ELA'
								value='ELA'
								checked={typeFilter === 'ELA'}
								onChange={handleTypeFilterChange}
							/>
							<span className='block border border-blue rounded-md py-1 text-center'>
								ELA
							</span>
						</label>
					</div>
				</div>
				<div>
					<h2 className='text-base mb-2'>Availability:</h2>
					<div className='flex gap-4 w-full mb-3'>
						<label className='filter-btn flex-1'>
							<input
								className='hidden'
								type='radio'
								name='available'
								id='today'
								value='today'
							/>
							<span className='block border border-blue rounded-md py-1 text-center'>
								Today
							</span>
						</label>
						<label className='filter-btn flex-1'>
							<input
								className='hidden'
								type='radio'
								name='available'
								id='week'
								value='week'
							/>
							<span className='block border border-blue rounded-md py-1 text-center'>
								This Week
							</span>
						</label>
					</div>
				</div>
				<div>
					<h2 className='text-base mb-2'>Tags:</h2>
					<div className='flex flex-wrap gap-2 w-full mb-3'>
						{tags?.map((tag: any) => {
							return (
								<label key={tag._id} className='filter-btn'>
									<input
										className='hidden'
										type='checkbox'
										name={tag.tag}
										id={tag.tag}
										value={tag.tag}
										checked={tagsFilter.some((f: any) => f.includes(tag.tag))}
										onChange={handleTagFilterChange}
									/>
									<span className='inline-block border border-blue rounded-md py-1 px-3'>
										{tag.tag}
									</span>
								</label>
							);
						})}
					</div>
				</div>
				<div>
					<div className='mt-8'>
						<button
							className='block w-full border border-blue bg-blue rounded-md py-2 text-white'
							type='submit'>
							Apply
						</button>
						<button
							className='block w-full border-none underline text-blue rounded-md py-1 bg-white'
							type='button'
							onClick={handleClear}>
							Clear
						</button>
					</div>
				</div>
			</form>
		</aside>
	);
};
