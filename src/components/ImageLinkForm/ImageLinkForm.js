import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return (
		<div>
			<p className = 'f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
			<div className = 'center'>
				<div className = 'form pa3 br3'>
					<input 
						className = 'w-70 f4 pa2' 
						type = 'text'
						onChange = {onInputChange} />
					<button 
						className = 'w-30 grow f4 br3 link ph3 pv2 dib white'
						onClick = { onPictureSubmit }
						>Detect</button>
				</div>
			</div>
		</div>
	);
}


export default ImageLinkForm;