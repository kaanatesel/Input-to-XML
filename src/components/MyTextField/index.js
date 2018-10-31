import React from 'react';
import './style.css'

const MyTextField = React.forwardRef((props, ref) => (
    <textarea ref={ref}  { ...props } className="mytextfield" />
));


export default MyTextField;