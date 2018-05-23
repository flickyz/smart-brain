import React from 'react';

const Demographics = ({ imageUrl }) => {
	return (
		<div className = 'center ma'>
			<div className = 'mt2'>
				<img alt = 'random' src = {imageUrl} width = '700px' height = 'auto' />
			</div>
		</div>
		);
}

export default Demographics;