import React from "react";
import { mount } from 'enzyme';
import { useNavigate } from "react-router-dom";
import { render, screen, fireEvent, getByRole, getByTestId  } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ResetPasswordComponent } from "./resetPasswordComponent";
import { filePath } from "../loginPage/loginComponent";
import userEvent from '@testing-library/user-event';
import {getRoles, within} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';


const mockLogin = jest.fn();
window.alert = jest.fn(); //Solution so that Windows.Alert in JSX Does not give testing error.
//Under EACH test enter "window.alert.mockClear();" to clear the alert Error.


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockLogin,
}));

const MockChangePassword = () => {
    return (
        <Router>
            <ResetPasswordComponent/>
            <ProfileComponent/>
        </Router>
    )
}

describe(ResetPasswordComponent, () => {

    it("Pass/Confirm Pass Fields & Submit Button Render Correctly", () => {
        render(<Router><ResetPasswordComponent/></Router>);
        const passwordField = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByTestId("passwordSubmit");
        expect(passwordField).toBeVisible();
        expect(passwordConfirm).toBeVisible();
        expect(submitButton).toBeVisible();
        window.alert.mockClear();
    });

    it("Both fields are left empty results in ERROR", () => {
        render(<Router><ResetPasswordComponent/></Router>);
        const passwordField = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByTestId("passwordSubmit");
        const passwordError = screen.getByTestId("passwordError");
        const matchingError = screen.getByTestId("matchingError");
        const passwordConfirmError = screen.getByTestId("passwordConfirmError");

        fireEvent.click(submitButton);
        expect(passwordField.value).toBe("");
        expect(passwordConfirmError.textContent).toBe("No confirmation password provided");
        expect(matchingError.textContent).toBe("");
        expect(passwordError.textContent).toBe("Please provide a password");
        window.alert.mockClear();
    });

    it("Password fields do NOT match results in ERROR", () => {
        render(<Router><ResetPasswordComponent/></Router>);
        const passwordField = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByTestId("passwordSubmit");
        const matchingError = screen.getByTestId("matchingError");
        
        fireEvent.change(passwordField, { target: { value: "TestTest123"}})
        fireEvent.change(passwordConfirm, { target: { value: "TestTest1234"}})
        fireEvent.click(submitButton);
        expect(matchingError).toBeVisible();
        expect(matchingError.textContent).toBe("Password and confirmation password do not match");
        window.alert.mockClear();
    });

    it("Confirm password field left empty results in ERROR", () => {
        render(<Router><ResetPasswordComponent/></Router>);
        const passwordField = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByTestId("passwordSubmit");
        const passwordError = screen.getByTestId("passwordError");
        const matchingError = screen.getByTestId("matchingError");
        const passwordConfirmError = screen.getByTestId("passwordConfirmError");
        
        fireEvent.change(passwordField, { target: { value: "TestTest1234"}})
        fireEvent.change(passwordConfirm, { target: { value: ""}})
        fireEvent.click(submitButton);
        expect(matchingError).toBeVisible();
        expect(passwordConfirmError.textContent).toBe("No confirmation password provided");
        window.alert.mockClear();
    });

    it("Only lowercase letters are used results in ERROR", () => {
        render(<Router><ResetPasswordComponent/></Router>);
        const passwordField = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByTestId("passwordSubmit");
        const matchingError = screen.getByTestId("matchingError");
        
        fireEvent.change(passwordField, { target: { value: "testtest"}})
        fireEvent.change(passwordConfirm, { target: { value: "testtest"}})
        fireEvent.click(submitButton);
        expect(passwordError).toBeVisible();
        expect(passwordError.textContent).toBe("Password must contain at least one uppercase letter");
        window.alert.mockClear();
    });

    it("Only uppercase letters are used results in ERROR", () => {
        render(<Router><ResetPasswordComponent/></Router>);
        const passwordField = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByTestId("passwordSubmit");
        const matchingError = screen.getByTestId("matchingError");
        
        fireEvent.change(passwordField, { target: { value: "TESTTEST"}})
        fireEvent.change(passwordConfirm, { target: { value: "TESTTEST"}})
        fireEvent.click(submitButton);
        expect(passwordError).toBeVisible();
        expect(passwordError.textContent).toBe("Password must contain at least one lowercase letter");
        window.alert.mockClear();
    });

    it("Less than 8 Char results in ERROR", () => {
        render(<Router><ResetPasswordComponent/></Router>);
        const passwordField = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByTestId("passwordSubmit");
        const matchingError = screen.getByTestId("matchingError");
        
        fireEvent.change(passwordField, { target: { value: "Test123"}})
        fireEvent.change(passwordConfirm, { target: { value: "Test123"}})
        fireEvent.click(submitButton);
        expect(passwordError).toBeVisible();
        expect(passwordError.textContent).toBe("Password must be 8 characters or greater in length");
        window.alert.mockClear();
    });

    it("Passwords DO match = Successful change of password", () => {
        render(<Router><ResetPasswordComponent/></Router>);
        const passwordField = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByTestId("passwordSubmit");
        const matchingError = screen.getByTestId("matchingError");
        
        fireEvent.change(passwordField, { target: { value: "TestTest123"}})
        fireEvent.change(passwordConfirm, { target: { value: "TestTest123"}})
        fireEvent.click(submitButton);
        expect(matchingError.textContent).toBe("Passwords Match");
        window.alert.mockClear();
    });

});
