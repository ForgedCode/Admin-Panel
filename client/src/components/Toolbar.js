import React from "react";

const Toolbar = ({ onDelete, onBlock, onUnblock }) => {
	return (
		<div className='flex w-full m-auto py-4'>
			<button
				onClick={onDelete}
				className='bg-red-500 mr-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
			>
				Удалить
			</button>
			<button
				onClick={onBlock}
				className='bg-yellow-500 mr-4 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
			>
				<i className='material-icons'>lock</i>
			</button>
			<button
				onClick={onUnblock}
				className='bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				<i className='material-icons'>lock_open</i>
			</button>
		</div>
	);
};

export default Toolbar;
