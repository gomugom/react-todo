import React from 'react';

const tablist = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, labore.',
    'consectetur adipisicing elit. Sint culpa suscipit illum molestiae mollitia inventore!',
    'Cupiditate sit omnis eos nisi minima, nam consequuntur quis quibusdam expedita deserunt.',
    'Excepturi voluptatibus autem accusamus harum voluptate, perferendis, aliquid nesciunt veritatis voluptatem sint.'
];

const Tabs = ({
    focused,
    changeTab
}) => (
    <ul>
        {tablist.map((tab, i) =>
            <li key={'tablist'+ i} onClick={()=> changeTab(i)}>
                <span>#{i}</span>{' '}
                <span style={{display: i === focused ? 'block' : 'none'}}>{tab}</span>
            </li>
        )}
    </ul>
);

export default Tabs;
