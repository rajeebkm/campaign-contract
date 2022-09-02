import React from 'react';
import Header from './Header';

//functional component gets called with props
export default props => {
    return (
        <div>
            <Header />
            {props.children}
            {/* <Footer /> */}
        </div>
    );

};