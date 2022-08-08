import React from 'react';
import {Helmet} from 'react-helmet'
function Meta({title,description,keywords}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keyword" content={keywords}/>
        </Helmet>
    );
}

Meta.defaltProps = {
    title: "Welcome to Afiamart",
    description: 'We sell the best quality products at best price',
    keywords: 'electronics,buy electronics,cheap electronics'
}
export default Meta;