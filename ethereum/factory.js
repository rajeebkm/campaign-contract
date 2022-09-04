import web3 from './web3';

import CamapignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CamapignFactory.interface), '0x09a4d1B2488B4cbF83e0EcfA1D8BD415644dc8Ad');

export default instance;