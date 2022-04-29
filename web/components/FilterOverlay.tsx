interface Props {}

export const FilterOverlay = (props: Props) => {
	return (
		<aside className='border border-blue rounded-t-lg p-5'>
			<h1 className='font-bold text-4xl'>Filter</h1>
			<form className='spacing-y-3'>
				<div>
					<h2 className='text-base'>Types:</h2>
					<label>
						<input
							className='hidden'
							type='radio'
							name='type'
							id='STEM'
							value='STEM'
						/>
						<span className='inline-block border border-blue rounded-md p3'>
							STEM
						</span>
					</label>
					<label>
						<input
							className='hidden'
							type='radio'
							name='type'
							id='ELA'
							value='ELA'
						/>
						<span className='inline-block border border-blue rounded-md p3'>
							ELA
						</span>
					</label>
				</div>
				<div>
					<h2 className='text-base'>Availability:</h2>
					<label>
						<input
							className='hidden'
							type='radio'
							name='type'
							id='today'
							value='today'
						/>
						<span className='inline-block border border-blue rounded-md p3'>
							Today
						</span>
					</label>
					<label>
						<input
							className='hidden'
							type='radio'
							name='type'
							id='week'
							value='week'
						/>
						<span className='inline-block border border-blue rounded-md p3'>
							This Week
						</span>
					</label>
				</div>
				<div>
					<h2 className='text-base'>Tags:</h2>
					<label>
						<input
							className='hidden'
							type='checkbox'
							name='tag1'
							id='tag1'
							value='tag1'
						/>
						<span className='inline-block border border-blue rounded-md p3'>
							Tag 1
						</span>
					</label>
					<label>
						<input
							className='hidden'
							type='checkbox'
							name='tag2'
							id='tag2'
							value='tag2'
						/>
						<span className='inline-block border border-blue rounded-md p3'>
							Tag 2
						</span>
					</label>
				</div>
				<button
					className='w-full border border-blue rounded-md p3 text-white'
					type='submit'>
					Apply
				</button>
			</form>
		</aside>
	);
};
