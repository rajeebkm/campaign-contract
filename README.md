# campaign-dapp

Campaign Dapp
-------------------

>> mkdir campaign
>> cd campaign

Make package.json file
>> npm init

Updated install command
----------------------

>> npm install ganache-cli mocha solc fs-extra web3  :-> (updated install command)

(npm install --save ganache-cli mocha solc fs-extra web3@1.0.0-beta.26


>> cd ethereum

>> node compile.js


Test
----------

>> cd ..
>> mkdir test   (root campaign directory)

>> touch test/Campaign.test.js

>> npm run test (In package.json file, update test: "mocha" dependencies)


Deployment to Rinkeby network
-----------------------------

Install HDWallet provier
>> npm install @truffle/hdwallet-provider

>> node deploy.js

> Note down the contract address of CampaignFactory contract


Fronted App
-----------------

Next.js
--------
- Wraps of react + associated tools into one package.
- Lots of fancy features included out of box (Routing, Server Side rendering, Hot module reload)
- Makes it really, really easy to use react to make a multi-page application

Repo: https://github.com/vercel/next.js

Installing dependencies
-----------------------
Go to campaign directory and run this command

>> npm install next react react-dom

> create pages folder and create show.js and newcampaign.js files

Go to package.json and add "dev"
-----------------------
"scripts": {
    "test": "mocha",
    "dev": "next dev"
  },

Run
----

>> npm run dev

>> pages/index.js is the root route of home page. Next will asume it's the root route.

To Do's
--------
Steps:

- Configure web3 with a provider from metamask
- Tell web3 that a deployed copy of the 'CampaignFactory' exists
- Use Factory instance to retrieve a list of deployed campaigns
- Use React to show something about each campaign


- Configure web3 with a provider from metamask
create new instance of web3
---------------------------

>> touch ethereum/web3.js


- Tell web3 that a deployed copy of the 'CampaignFactory' exists
create factory.js file
--------------
>> touch ethereum/factory.js

- Use Factory instance to retrieve a list of deployed campaigns
Using Remix-IDE, get deployed instance of campaign from CampaignFactory instance.

- Use React to show something about each campaign

import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCompaigns().call();
        console.log(campaigns);

    }

    render() {
        return <div>Campaign Index!</div>
    }
}


export default CampaignIndex;

-----------------------

If we run the npm run dev, we will get an error, window is not defined.

---------------------------------

When we were using Create React app, that server or that process that we were running inside of our terminal took all of the React code that we wrote and then surfed it up into our browser.

So all Create React app did for us was take all the JavaScript code that we wrote and made it available to the browser.

Our browser downloaded all that code as the React app. It then executed that code, our React application boot up and it displayed some amount of content on the screen.

The key there is that the Create React app server, its entire purpose was just to serve up some JavaScript code and it had no idea what it was really doing or what it was serving.

It just knew, Hey, here's some JavaScript files. Take it if you want it.

Next.js Server side rendering
----------------------------
Next.js makes use of a process called server side rendering.

The idea of server side rendering is that whenever someone accesses our next JS server, the server is going to take our React application and rather than just send all that JavaScript down to the browser, next.js is going to try to render the entire React app itself.

In other words, all of our JavaScript code is being executed on the next server. That server builds up an HTML document and then it takes that HTML document and it sends it down to the browser. The benefit to this approach is that our users end up seeing content on the screen much, much, much more quickly than when we were using Create React app.

With the server side rendering approach, because the next server is sending down a completely rendered HTML document, our content is going to appear on our user screen much more quickly, especially if our users are on a mobile device.

After the next server sends our down our HTML document to be rendered on the screen, it does shortly later send down all of our JavaScript code as well.

After this JavaScript code is loaded up into the browser, the React app inside this code then boots up and takes over inside the browser. So eventually the React app is booted up inside the browser.

window variable:
--------------
window is a global variable that is available only inside the browser.

Window is not available on Node.js, which is where our server is currently running.

It's because whenever the next server is attempting to render our application, we don't have access to that variable.

We need to think about how we can make our application work for all those people who are not making use of Metamask. So the big idea behind using next.js is, when our code is taken and
rendered on the next server, on the next server, we are going to reach out to the Ethereum network
and do some initial calls.
- We're going to do some data fetching.
- We're going to try to get a list of our campaigns.
- We're going to find out details about each of those campaigns.
- We're going to load up how many votes, how many requests, all that kind of stuff.
- We're going to execute all of those requests from our server.

And that means when we produce our HTML document right here to send down to the user's browser, it
doesn't matter whether or not our users are using metamask, it doesn't matter whether or not they even have access to an Ethereum network because we have already taken care of all that data fetching for them and we are going to send them an HTML document with all that information already contained inside of it.

So if our code ends up going crazy and saying, Hey, Metamask isn't here, I have no idea what to do.

It doesn't matter one bit because we already wrote all of that data fetching logic to be executed on the server.

So all of our users out there who are not using Metamask are going to very easily see some information on the screen. And as far as they are aware, they don't even know that Metamask or Ethereum or Rinkeby or whatever exist.

They don't have to care one bit. So again, like I said, I know this React stuff and the next gen stuff is a little bit annoying, probably

unexpected in this course, however, really good reason that we're using it right here.

This is why we are using it because we cannot assume that our users are making use of metamask.

web3.js
-----

import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider); //Assume that MetaMask has already injected web3 instances
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/https://rinkeby.infura.io/v3/12828434f45b4b759851ae73c37cfb5d"
  );
  web3 = new Web3(provider);
}
 
export default web3;

------------------------

Get Initial props
--------------------
Unfortunately next.js does not execute the componentDidMount method on the server.

So in other words when our application is being rendered by next.js on the server, componentDidMount will not be executed, not one line of it.

So, getInitialP	rops method is used in order to make sure that data fetching process occurs on the server.

It is a lifecycle method that is defined exclusively and used exclusively by next.js. So get initial props is not used in traditional react.



Processes:
--
So let's imagine that some browser tries to visit the root route of our application.

Next is going to boot up and it's going to say, Oh, okay, we need to show the campaign index component.

The next server is going to look at that component and it's going to find the getInitialProps function tied to it.

Next is going to execute just that function (getInitialProps)

So it's not going to attempt to render the component yet. It's going to just render this function right here.

After calling that function, we're going to return some initial data.

So this will be any data we care about. It could be our list of campaigns. It can be the number of contributors on an individual campaign, whatever we want it to be.

Next, we'll then take this initial data right here and provide it to the actual campaign index component as props on the server.

This component will be rendered on the server.

We'll then take that components HTML that is produced and send it down to our browser.

So in other words, if we want to make use of these server side rendering stuff, we have to do our
initial data loading inside of this getInitialProps function.

So let's define this function.

We're going to do our data loading or our data call over to our factory contract inside there and then we will be able to make use of that initial data inside of our campaign index component.

------------------------------

class CampaignIndex extends Component {
static getInitialProps() {

}
}
static defines a class function. with a static keyword, the function is not assigned to instances of the class. Instead, the function is assigned to the class itself.
(CampaignIndex.getInitialProps()), we don't have to create a instance.


Next wants to be able to retrieve this initial data without attempting to actually render our component.
Rendering a component is a very computationally expensive process. So by skipping any initial rendering here and just directly calling that function next is able to make the entire server side rendering process much more efficient. So that's why we are using that static keyword.

Whenever our component is rendered, get initial props is called, we fetch our list of campaigns,
we return the object {}. This object is provided to our component as props. And now inside of our component, we can freely reference this.props.campaigns.


Semantic UI React
----------------------

React component kit: Semantic UI React

This is a library that comes with a bunch of pre created components that we can very easily get access to and use inside of our application.

The benefit of all these components is that they come with styling already placed on them.

Install semantic UI React
-----------------
project root directory
>> npm install --save semantic-ui-react

Documentation: https://react.semantic-ui.com/

Sematic ui css
-------------
>> npm install --save semantic-ui-css

After adding, import in files as: import 'semantic-ui-css/semantic.min.css';

Rendering Card Groups
--------------------

import { Card } from 'semantic-ui-react';


renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />
    }


Adding Button
---------------
 <Button 
  content="Create Campaign"
  icon="add circle"
  primary={true}
  
/>

The Layout Component
----------------------

root project directory

>> mkdir components
>> touch components/Layout.js

** Campaign Lists should be a child of Layout


Assembling Header
----------------
>.touch components/Header.js

import React from 'react';
import { Menu } from 'semantic-ui-react';

export default () => {
    return (
        <Menu>
            <Menu.Item>
                CrowdCoin
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>
                    Campaigns
                </Menu.Item>
                <Menu.Item>
                    +
                </Menu.Item>

            </Menu.Menu>
        </Menu>

    );
}

Contraining content width
------------------------
import { Container } from 'semantic-ui-react';


Two Column Layout
----------------
<Button 
   floated='right'
   content="Create Campaign"
   icon="add circle"
   primary={true}
 />

Nested Routing
--------------
creating new directory 'campaigns' inside 'pages' directory and 'new.js' file inside of it


Fixing CSS by modifying Layout.js file
-------------
Layout.js:
----

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
                    href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" 
                />
            </Head>
            
            <Header />
            {props.children}
            {/* <Footer /> */}
        </Container>
    );

};

Form Creation
--------------
import { Form, Checkbox, Button, Input } from "semantic-ui-react";
 
   <Layout>
             <h3>Create a Campaign</h3>
             <Form>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input label="wei" labelPosition="right" />
                </Form.Field>
                <Form.Field>
                    <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field>
                <Button primary>Create!!</Button>

             </Form>
            </Layout>

Input Change Handlers
----------------------

state = {
        minimumContribution: ''
    };

<Input 
   label="wei" 
   labelPosition="right" 
   value={this.state.minimumContribution}
   onChange={event => this.setState({ minimumContribution: event.target.value })}
/>


Form Submittal
--------------

onSubmit = async (event) => {
        //To prevent the browser from automatically attempting form submittal.
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.minimumContribution).send({
            from: accounts[0]
        });

    };

Form Error Handling
---------------------

<Message error header="Oops!!" content={this.state.errorMessage} />

Button Spinners
--------------
<Button loading={this.state.loading} primary>Create!!</Button>

Next.route library
------------------
For dynamic routing helper for Next.js:
https://github.com/fridays/next-routes

If you see some error like ERESOLVE unable to resolve dependency tree errors, you'll need to pass the --legacy-peer-deps flag:

npm install next-routes --legacy-peer-deps

Next route setup
-------------------
https://github.com/fridays/next-routes

Create files in root project directory:

routes.js : Defines our different routes

server.js: Boot up next app, tell next.js to use routes.js

routes.js
--------------
const routes = require('next-routes')(); //require statements returns a function, the function is immediately involked after we require it into this file.

module.exports = routes;

module.exports, export some helpers that's going to eventually allow us to automatically navigate users around our application.

server.js
----------
The purpose of server.js file is to make sure that we can manually boot up our next application and specifically tell it to use our routes.js file.

// server.js
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

// With express
const express = require('express')
app.prepare().then(() => {
  express().use(handler).listen(3000)
})

// Without express
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000)
})

-------
package.json

"scripts": {
    "test": "mocha",
    "dev": "node server.js"
  },

Automatic Navigation
--------------------
new.js:

import { Link, Router } from '../../routes';

This link object right here is a react component that allows us to render anchor tags into our React components and navigate around the application.

The router object allows us to programmatically redirect people from one page to another page inside of our app.

So this is what we want to use after we create a campaign. So once a user creates a campaign, we're going to automatically redirect them back to the root root of our application. Here, we will use only Router object and we aren't using any Link object.

Router.pushRoute('/');

Header Naviagtion
-------------------
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

Route Mappings
---------------

create a component show.js in pages diectory

then setup routing rules in routes.js file.


So we're now going to use this Roots Helper right here to set up a new route and say that if a user
ever goes to something that looks like If a user ever goes to campaigns/0xbs28318....,
We want to show that campaigns show.js component.

routes.add()

So the add() function is how we define a new route mapping. The first argument to this is going to be the pattern that we want to look for (campaigns/wildcard)

To indicate a wildcard, we place a colon and then the name of this wildcard property or this kind
of variable, this variable is going to eventually get passed into our component, so we can actually
reference whatever campaign address the user is trying to visit.

This little wildcard right here is supposed to represent a campaign address.

Now, one thing to really take note of here, we've got the colon (:), and that's specifically what says, hey, this part of the URL (:address) is going to be a wildcard or a variable of sorts.

Now, the second argument to this function right here is, which route inside of our pages directory we want this thing ('/campaigns/:address') to show whenever someone goes to this.

So in other words, the arguments that we're passing to the add() function are if a user goes to this route right here ('/campaigns/:address'), what component do we want to show from our pages directory. So for us, we want to show the component ('/campaigns/show').

If we click on Create Campaign, you'll notice that now that link (http://localhost:3000/campaigns/new) is completely broken. This should be showing us our form to make a new campaign.
So essentially what's going on here is the routing library that we are using thinks that the word new right here is a campaign address, ('/campaigns/new') instead of ('/campaigns/:address') and it automatically gets redirected over to '/campaigns/show'. 

However, we're going to add on another route mapping that's just going to fix and specifically say
if anyone goes to campaign/new, then show this component '/campaigns/new'.

Planning Campaign Show
------------------------
import React, { Component } from "react";
import Layout from "../../components/Layout";


class CampaignShow extends Component {
    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>
            </Layout>
        );
    }
}


export default CampaignShow;

Redeploying CampaignFactory
-----------------------

Add these functions to contract Campaign

function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (contract(this).balance, minimumContribution, requests.length, approversCount, manager);
    }

    function getRequestsCount() public view returns(uint) {
        return requests.length;
    }

>> cd ethreum
>> node compile.js
>> node deploy.js


CampaignShow's GetInitialProps
-------------------------------


Now there is going to be one distinct difference between the code that we had written previously inside of getInitialProps and what we have to do now. So this time around, we are trying to show information about one very particular campaign on the screen. And the campaign that we actually care about is going to have its address in the URL bar or in the address bar of our browser.

So our roots file (routes.js) is going to parse the URL and it's going to look for that wildcard, which it's going to call the address property or the address parameter, because we specifically call this thing address right here (.add('campaigns/:address', '/campaigns/show')).

So because we did all this root stuff right here. Our get initial function right here is going to be called with a props object of its own.

So this is a separate prop object than the one that ends up inside of our actual component instance. This prop object has a property called query.

And one property on this query thing right here is that token out of the URL that we asked our routing library for and it's available as address like so. This thing right here (props.query.address) is the actual address of the campaign that we're trying to show to our user on this page or in this component.

Accessing a Campaign
----------------------
campaign.js:

import web3 from './web3';
import Campaign from './build/Campaign.json';


export default (address) => {
    return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};

show.js
-------
import Campaign from "../../ethereum/campaign";

const campaign = Campaign(props.query.address);
const summary = await campaign.methods.getSummary().call();

Summary Transalation Layer
-----------------------
class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            balance: summary[0],
            minimumContribution: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };

    }

Custom Card Groups
--------------------
renderCard() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            }
        ];

        return <Card.Group items={items} />;
    }


The contribute form
-------------------
touch components/ContributeForm.js

import Reactm, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

class ContributeForm extends Component {
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        label="ether" labelPosition='right'
                    />
                </Form.Field>
                <Button primary>
                    Contribute!
                </Button>
            </Form>

        );
    }
}

export default ContributeForm;

Grid Layout
-----------

  <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCard()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm />
                    </Grid.Column>
                </Grid>
        
            </Layout>

Form State
-------------

onSubmit = (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
    };


Making a contribution
-----------------------


Listing Requests
------------------


Grid vs Columns
------------------


Request Creation Form
---------------------


Creating a Request
----------------------


Requests one by one
-----------------------


Rendering a Table
------------------


Request Row Component
--------------------

>> touch components/RequestRow.js


Request Row Content
----------------------


