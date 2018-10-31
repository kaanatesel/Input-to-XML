import React from 'react';
import './style.css'

const DownloadBtn = React.forwardRef((props, ref) => (
    <button {...props} className="btn ">download</button>
));

// class DownloadBtn extends Component {
//     render() {
//         return (
//             <button className="btn ">download
//             </button>
//         );
//     }
// }

export default DownloadBtn;