import web3 from './web3';

import CamapignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CamapignFactory.interface), '0x83Cb1577888D2EEDE829F8eB3Cc53804E9b7e02d');

export default instance;