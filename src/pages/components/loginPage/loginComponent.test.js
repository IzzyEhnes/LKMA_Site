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
import { render, screen, fireEvent, getByRole, getByTestId  } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { mount, shallow } from 'enzyme';
import { LoginComponent, filePath } from "../loginPage/loginComponent";

const mockLogin = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockLogin,
}));


describe(LoginComponent, () => {
    it("Pressing 'Sign in' after inputting login credentials sends info", async () => {
        const { container } = render(<Router><LoginComponent 
            MoveToProfile={mockLogin} /></Router>);
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, "useState");
        useStateSpy.mockImplementation((initialState) => [initialState, setState]);
        const wrapper = mount(<Router><LoginComponent/></Router>);

        const testEmail = "a@gmail.com";
        const testPassword = "Tester12";

        const emailContainer = wrapper.find(".emailInput").simulate("change", 
            { target: { value: testEmail } });
        emailContainer.update();

        expect(emailContainer.length).toEqual(1);
        expect(setState).toHaveBeenCalled;

        const passwordContainer = wrapper.find(".passwordInput").simulate("change", 
            { target: { value: testPassword } });
        passwordContainer.update();

        expect(passwordContainer.length).toEqual(1);
        expect(setState).toHaveBeenCalled;
        
        const inputEmail = getByTestId(container, "inputEmail");
        const inputPassword = getByTestId(container, "inputPassword");
        const loginSubmit = getByTestId(container, "loginSubmit");

        fireEvent.change(inputEmail, {
            target: { value: testEmail },
        });

        fireEvent.change(inputPassword, {
            target: { value: testPassword },
        });

        fireEvent.click(loginSubmit);
        expect(setState).toHaveBeenCalled;
        expect(inputEmail.value).toBe(testEmail);
        expect(inputPassword.value).toBe(testPassword);
    });
});
