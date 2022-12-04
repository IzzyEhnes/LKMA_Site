import React from "react";
import { render, fireEvent, getByTestId  } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { SignUpComponent } from "../signUpPage/signUpComponent";

const mockLogin = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockLogin,
}));

describe(SignUpComponent, () => {
    it("Pressing 'Sign in' after inputting login credentials sends info", async () => {
        const { container } = render(<Router><SignUpComponent 
            functions={mockLogin}/></Router>);
        const setState = jest.fn();

        const testEmail = "a@gmail.com";
        const testPassword = "Tester12";
        const testFirstName = "John";
        const testLastName = "Smith";
        
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