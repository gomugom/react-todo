import React from 'react';

const allList = [
    { id: 0, text: 'portfolio #0' },
    { id: 1, text: 'portfolio #1' }
];


export const Home = () => (
    <h2>Home</h2>
);

export const About = ({ children }) => (
    <div>
        <h2>About</h2>
        {children ? <div>{children}</div> : null}
    </div>
);

export const Name = () => (
    <h3>gomugom</h3>
);

export const Portfolio = ({ match }) => {
    const filteredList = (match.params && match.params.id) ? allList.filter(v=> v.id == match.params.id) : allList;
    const renderList = filteredList.map(v=>
        <li key={v.id}>{v.text}</li>
    );
    return (
        <div>
            <h2>Portfolio</h2>
            <ul>{renderList}</ul>
        </div>
    );
}
