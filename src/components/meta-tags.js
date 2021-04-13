import React from "react";
import Helmet from "react-helmet";

function MetaTags() {
    return (
        <Helmet>
            {/* <!-- HTML Meta Tags --> */}
            <title>Game Of Thrones Directory</title>
            <meta name="description" content="A Simple Directory of all Game of Thrones books, along with information About the Books (i.e. characters, POV, Author etc.)" />

            {/* <!-- Google / Search Engine Tags --> */}
            <meta itemprop="name" content="Game Of Thrones Directory" />
            <meta itemprop="description" content="A Simple Directory of all Game of Thrones books, along with information About the Books (i.e. characters, POV, Author etc.)" />
            <meta itemprop="image" content="https://user-images.githubusercontent.com/38506259/114482213-38029f00-9bd4-11eb-9be7-07e8f774722b.png" />

            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="http://got-books-directory.herokuapp.com" />
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Game Of Thrones Directory" />
            <meta property="og:description" content="A Simple Directory of all Game of Thrones books, along with information About the Books (i.e. characters, POV, Author etc.)" />
            <meta property="og:image" content="https://user-images.githubusercontent.com/38506259/114482213-38029f00-9bd4-11eb-9be7-07e8f774722b.png" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Game Of Thrones Directory" />
            <meta name="twitter:description" content="A Simple Directory of all Game of Thrones books, along with information About the Books (i.e. characters, POV, Author etc.)" />
            <meta name="twitter:image" content="https://user-images.githubusercontent.com/38506259/114482213-38029f00-9bd4-11eb-9be7-07e8f774722b.png" />
        </Helmet>
    );
}

export default MetaTags;