//edge cases to test for:
//
// test 1: no email
// test 2: invalid email
// test 3: valid email + invalid password
// test 4: no password
// test 5: less than 8 characters
// test 6: doesn't contain uppercase
// test 7: doesn't contain lowercase
// test 8: valid password + invalid email
// test 9: valid but incorrect login info and then press Sign In
// test 10: input correct login info and then press Profile without clicking Sign In
// test 11: input correct login info and then change it before clicking Sign In
// test 12: correct login info and then press Sign In

import React from "react";
import { render, fireEvent, getByTestId  } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { SignUpComponent } from "../signUpPage/signUpComponent";

const mockLogin = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockLogin,
}));


describe(SignUpComponent, () => {
    it("Pressing 'Sign in' after inputting login credentials sends info", async () => {
        const { container } = render(<Router><SignUpComponent 
            functions={mockLogin} /></Router>);
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, "useState");
        useStateSpy.mockImplementation((initialState) => [initialState, setState]);
        const wrapper = mount(<Router><SignUpComponent/></Router>);

        const testEmail = "a@gmail.com";
        const testPassword = "Tester12";
        const testFirstName = "John";
        const testLastName = "Smith";
        
        const emailContainer = wrapper.find("#email").simulate("change", 
            { target: { value: testEmail } });
        emailContainer.update();
        expect(emailContainer.length).toEqual(1);
        expect(setState).toHaveBeenCalled;

        const passwordContainer = wrapper.find("#password").simulate("change", 
            { target: { value: testPassword } });
        passwordContainer.update();
        expect(passwordContainer.length).toEqual(1);
        expect(setState).toHaveBeenCalled;

        const firstNameCon = wrapper.find("#firstName").simulate("change", 
            { target: { value: testFirstName } });
            firstNameCon.update();
        expect(firstNameCon.length).toEqual(1);
        expect(setState).toHaveBeenCalled;

        const lastNameCon = wrapper.find("#lastName").simulate("change", 
            { target: { value: testLastName } });
            lastNameCon.update();
        expect(lastNameCon.length).toEqual(1);
        expect(setState).toHaveBeenCalled;
        
        const inputFirstName = getByTestId(container, "firstName");
        const inputLastName = getByTestId(container, "lastName");
        const inputEmail = getByTestId(container, "email");
        const inputPassword = getByTestId(container, "password");
        const inputSubmit = getByTestId(container, "submit");

        fireEvent.change(inputFirstName, {
            target: { value: testFirstName },
        });

        fireEvent.change(inputLastName, {
            target: { value: testLastName },
        });

        fireEvent.change(inputEmail, {
            target: { value: testEmail },
        });

        fireEvent.change(inputPassword, {
            target: { value: testPassword },
        });

        fireEvent.click(inputSubmit);
        expect(setState).toHaveBeenCalled;
        expect(inputFirstName.value).toBe(testFirstName);
        expect(inputLastName.value).toBe(testLastName);
        expect(inputEmail.value).toBe(testEmail);
        expect(inputPassword.value).toBe(testPassword);
    });
});