import React from 'react';
import './Demographics.css';

const Demographics = ({ imageUrl, box }) => {
	return (
		<div className = 'center ma'>
			<div className = 'relative mt2'>
				<img 
					id = 'inputimage' 
					alt = ''
					src = {imageUrl} 
				/>
				<div
					className = 'facebox' 
					style = {{
							left: box.left,
						 	top: box.top,
						 	right: box.right,
						 	bottom: box.bottom
					}}>
				</div>
			</div>
		</div>
		);
}

export default Demographics;