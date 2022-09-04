import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ marginTop: '30px' }}>
            {/* <Menu.Item>
                CrowdCoin
            </Menu.Item> */}
            <Link route='/'>
                <a className='items' style={{padding: '10px', textAlign: 'center', border: 'solid 2px blue', backgroundColor: 'black', color: 'pink'}}>CrowdCoin</a>
            </Link>
            <Menu.Menu position='right'>
                {/* <Menu.Item>
                    Campaigns
                </Menu.Item> */}
                <Link route='/'>
                <a className='items' style={{padding: '10px', textAlign: 'center', border: 'solid 2px blue', backgroundColor: 'black', color: 'pink'}}>Campaigns</a>
                </Link>
                {/* <Menu.Item>
                    +
                </Menu.Item> */}
                <Link route='/campaigns/new'>
                <a className='items' style={{padding: '10px', textAlign: 'center', border: 'solid 2px blue', backgroundColor: 'black', color: 'pink'}}> Create New </a>
                </Link>

            </Menu.Menu>
        </Menu>

    );
}