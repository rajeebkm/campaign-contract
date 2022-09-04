import React, { Component } from "react";
import { Form, Checkbox, Button, Input, Message, Loading } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class CamapignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    // onSubmit() {
        // if we use this syntax with an event handler, the value of this inside of that method will not be set correctly unless we do some function binding when we pass in the event handler to our form tag.
    // }

    onSubmit = async (event) => {
        //To prevent the browser from automatically attempting form submittal.
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution).send({
            from: accounts[0]
        });

        Router.pushRoute('/');

        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        
        this.setState({ loading: false });

    };

    render() {
        return (
            <Layout>
             <h3>Create a Campaign</h3>
             <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        label="wei" 
                        labelPosition="right" 
                        value={this.state.minimumContribution}
                        onChange={event => this.setState({ minimumContribution: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field>
                <Message error header="Oops!!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>Create!!</Button>

             </Form>
            </Layout>
        );
    }
}

export default CamapignNew;