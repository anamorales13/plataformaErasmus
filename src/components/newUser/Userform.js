import React, {Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import ConForm from './ConForm';


export class Useform extends Component{

    state={
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
    }

    //Proceed to the next step

    nextStep = () =>{
        const {step} = this.state;
        this.setState({
            step:step+1
        });
    }

    // back to the previus step
    prevStep = () =>{
        const {step} = this.state;
        this.setState({
            step:step-1
        });
    }

    //Handle fields change
handleChange = input => e =>{
    this.setState({[input]: e.target.value});
}

    render(){
        const {step} =this.state;
        const {firstName, lastName, email} = this.state;
        const values= {firstName, lastName, email}

        switch(step){
            case 1: 
            return(
                <FormUserDetails
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                />
            );
            case 2: 
            return(
                <FormPersonalDetails
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
            />
            )
            case 3:
                return(
                    <ConForm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    
                    values={values}
                />
                )
            case 4:
                return(
                    <h1>Success</h1>
                )
        }

            
    }
}

export default Useform;