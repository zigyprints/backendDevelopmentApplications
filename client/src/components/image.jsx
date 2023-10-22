import React from 'react' 

const Image = ({path, rest}) => {

	return (<> 

		<div>
			<img src={path} alt="image" {...rest}/>
		</div>

	</>); 
}


export default Image;