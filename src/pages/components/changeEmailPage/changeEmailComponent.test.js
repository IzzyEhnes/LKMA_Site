import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { ChangeEmailComponent } from "./changeEmailComponent";
import { ProfileComponent } from "../profilePage/profileComponent";

const mockLogin = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockLogin,
}));

const MockChangeEmail = () => {
    return (
        <Router>
            <ChangeEmailComponent/>
            <ProfileComponent/>
        </Router>
    )
}

describe(ChangeEmailComponent, () => {
    it("should render Email & Confirm Email input fields and submit button", () => {
        render(<Router><ChangeEmailComponent/></Router>);
        const emailField = screen.getByPlaceholderText("Email");
        const emailConfirm = screen.getByPlaceholderText("Confirm Email");
        const submitButton = screen.getByTestId("emailSubmit");
        expect(emailField).toBeVisible();
        expect(emailConfirm).toBeVisible();
        expect(submitButton).toBeVisible();
    });

    it("test when email and confirm email fields do not match", () => {
        render(<Router><ChangeEmailComponent/></Router>);
        const emailField = screen.getByPlaceholderText("Email");
        const emailConfirm = screen.getByPlaceholderText("Confirm Email");
        const submitButton = screen.getByTestId("emailSubmit");
        const matchingError = screen.getByTestId("matchingError");
        
        fireEvent.change(emailField, { target: { value: "a@gmail.com"}})
        fireEvent.change(emailConfirm, { target: { value: "b@gmail.com"}})
        fireEvent.click(submitButton);
        expect(matchingError).toBeVisible();
        expect(matchingError.textContent).toBe("Email and confirmation email do not match");
    });

    it("test when email and confirm email fields match", () => {
        render(<Router><ChangeEmailComponent/></Router>);
        const emailField = screen.getByPlaceholderText("Email");
        const emailConfirm = screen.getByPlaceholderText("Confirm Email");
        const submitButton = screen.getByTestId("emailSubmit");
        const matchingError = screen.getByTestId("matchingError");
        
        fireEvent.change(emailField, { target: { value: "a@gmail.com"}})
        fireEvent.change(emailConfirm, { target: { value: "a@gmail.com"}})
        fireEvent.click(submitButton);
        expect(matchingError.textContent).toBe("");
    });

    it("test when user clicks submit button while email field is invalid", () => {
        render(<Router><ChangeEmailComponent/></Router>);
        const emailField = screen.getByPlaceholderText("Email");
        const emailConfirm = screen.getByPlaceholderText("Confirm Email");
        const submitButton = screen.getByTestId("emailSubmit");
        const emailError = screen.getByTestId("emailError");
        
        
        fireEvent.change(emailField, { target: { value: "ad"}})
        fireEvent.change(emailConfirm, { target: { value: "ad"}})

        fireEvent.click(submitButton);
        expect(emailError).toBeVisible();
        expect(emailError.textContent).toBe("Please enter a valid email");
    });
});