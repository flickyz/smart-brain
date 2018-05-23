import React from 'react';
import Tilt from 'react-tilt';
import mask from './mask.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className = 'ml4'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            	<div className="Tilt-inner pa3"><img className = "pt3" alt = 'logo' src = {mask} /></div>
            </Tilt>
		</div>	
	);
}

export default Logo;