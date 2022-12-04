import React from "react";
import { render, fireEvent, getByTestId  } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginComponent } from "../loginPage/loginComponent";

 const mockLogin = jest.fn();

describe(LoginComponent, () => {
    it("Clicking 'Sign in' button without filling email or password fields", async () => {
        const { container } = render(<Router><LoginComponent/></Router>);

        const loginSubmit = getByTestId(container, "loginSubmit");
        const passwordError = getByTestId(container, "passwordError");
        const errorMessage = "Incorrect login info. Please enter the correct email and password.";

        fireEvent.click(loginSubmit);
        expect(passwordError.textContent).toBe(errorMessage);
    });

    it("Clicking 'Sign in' button with email field filled in", async () => {
        const { container } = render(<Router><LoginComponent/></Router>);

        const inputEmail = getByTestId(container, "inputEmail");
        const loginSubmit = getByTestId(container, "loginSubmit");
        const passwordError = getByTestId(container, "passwordError");
        const errorMessage = "Incorrect login info. Please enter the correct email and password.";
        const testEmail = "a@gmail.com";

        fireEvent.change(inputEmail, {
            target: { value: testEmail },
        });
        fireEvent.click(loginSubmit);
        expect(passwordError.textContent).toBe(errorMessage);
    });

    it("Clicking 'Sign in' button with password field filled in", async () => {
        const { container } = render(<Router><LoginComponent/></Router>);
        
        const inputPassword = getByTestId(container, "inputPassword");
        const loginSubmit = getByTestId(container, "loginSubmit");
        const passwordError = getByTestId(container, "passwordError");

        const errorMessage = "Incorrect login info. Please enter the correct email and password.";
        const testPassword = "Tester12";

        fireEvent.change(inputPassword, {
            target: { value: testPassword },
        });
        fireEvent.click(loginSubmit);
        expect(passwordError.textContent).toBe(errorMessage);
    });

    it("Clicking 'Sign in' button with both email and password fields filled in", async () => {
        const { container } = render(<Router><LoginComponent/></Router>);
        
        const inputEmail = getByTestId(container, "inputEmail");
        const inputPassword = getByTestId(container, "inputPassword");
        const loginSubmit = getByTestId(container, "loginSubmit");
        const passwordError = getByTestId(container, "passwordError");

        const testEmail = "a@gmail.com";
        const testPassword = "Tester12";
        
        fireEvent.change(inputEmail, {
            target: { value: testEmail },
        });
        fireEvent.change(inputPassword, {
            target: { value: testPassword },
        });
        fireEvent.click(loginSubmit);
        expect(passwordError.textContent).toBe("");
    });

    it("Clicking 'Sign in' button with invalid email", async () => {
        const { container } = render(<Router><LoginComponent/></Router>);
        
        const inputEmail = getByTestId(container, "inputEmail");
        const inputPassword = getByTestId(container, "inputPassword");
        const loginSubmit = getByTestId(container, "loginSubmit");
        const emailError = getByTestId(container, "emailError");
        const passwordError = getByTestId(container, "passwordError");
        const testEmail = "a";
        const testPassword = "Tester";
        
        fireEvent.change(inputEmail, {
            target: { value: testEmail },
        });
        fireEvent.change(inputPassword, {
            target: { value: testPassword },
        });
        fireEvent.click(loginSubmit);
        expect(emailError.textContent).toBe("Please enter a valid email");
        expect(passwordError.textContent).toBe("Incorrect login info. Please enter the correct email and password.");
    });
});
