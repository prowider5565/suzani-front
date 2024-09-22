export default function Modal({ title, className, children, width }) {
	return (
		<div className='w-full z-50 h-screen flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm bg-black/30 bottom-0 right-0'>
			<div
				style={{ width: width ? `${width}px` : 'auto' }}
				className={`bg-white relative dark:bg-darkmode-600 dark:text-white p-4 sm:p-6 lg:p-7 rounded-[15px] w-full mx-4 min-w-[90%] sm:min-w-[500px] max-h-[90vh] overflow-y-scroll ${className}`}
			>
				<h1 className='text-xl lg:text-2xl whitespace-normal font-medium mx-auto text-center mb-6'>
					{title}
				</h1>
				<div>{children}</div>
			</div>
		</div>
	);
}
