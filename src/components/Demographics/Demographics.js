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
					width = '700px' 
					height = 'auto'
				/>
				<div
					className = 'facebox ba bw1 blue' 
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