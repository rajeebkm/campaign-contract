import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

//functional component gets called with props
export default props => {
    return (
        <Container>
            <Head>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
            </Head>

            <Header />
            {props.children}
            {/* <Footer /> */}
        </Container>
    );

};