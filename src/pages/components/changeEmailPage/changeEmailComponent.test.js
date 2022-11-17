import React from "react";
import {getRoles, within} from '@testing-library/dom'
import { render, screen, fireEvent, getByRole, getByTestId  } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { mount } from 'enzyme';
import { useNavigate } from "react-router-dom";
import { ChangeEmailComponent } from "./changeEmailComponent";
import { ProfileComponent } from "../profilePage/profileComponent";
import { filePath } from "../loginPage/loginComponent";

const mockLogin = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockLogin,
}));

//edge cases to test for:
// test 1: email and confirm email fields do not match
// test 2: new email already exists in database
// test 3: click submit after new email and confirm email match and do not 
//         exist in database
// test 4: not clicking submit after inputting matching email fields and email
//         doesn't already exist in DB
// test 5: user tries to change a student email to an admin email

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

    /*it("should be able to change input fields", () => {
        render(<Router><ChangeEmailComponent/></Router>);
        const emailField = screen.getByPlaceholderText("Email");
        const emailConfirm = screen.getByPlaceholderText("Confirm Email");
        fireEvent.change(emailField, { target: { value: "a@gmail.com"}})
        fireEvent.change(emailConfirm, { target: { value: "a@gmail.com"}})
        expect(emailField.value).toBe("a@gmail.com");
        expect(emailConfirm.value).toBe("a@gmail.com");
    });*/

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

    it("test when email field is empty and submit button is pressed", () => {
        render(<Router><ChangeEmailComponent/><ProfileComponent/></Router>);
        const emailField = screen.getByPlaceholderText("Email");
        const emailConfirm = screen.getByPlaceholderText("Confirm Email");
        const submitButton = screen.getByTestId("emailSubmit");
        const emailError = screen.getByTestId("emailError");
        const matchingError = screen.getByTestId("matchingError");

        fireEvent.click(submitButton);
        expect(emailField.value).toBe("");
        expect(emailConfirm.value).toBe("");
        expect(matchingError.textContent).toBe("");
        expect(emailError.textContent).toBe("");
    });
});

/*describe(ProfileComponent, () => {
    it("profile page's profile pic should be initialized to blank profile image", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const profilePic = getByTestId(container, "profilePic");
        const blankPic = "/img/profile-blank-whitebg.png";

        expect(profilePic).toBeInTheDocument;
        expect(profilePic.src).toContain(blankPic);
        console.log("Initialized profile pic url: " + profilePic.src);
    });
});  

describe(ProfileComponent, () => {
    it("profile page's name and email data are initialized to 'N/A'", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const firstName = getByTestId(container, "firstName");
        const lastName = getByTestId(container, "lastName");
        const profileEmail = getByTestId(container, "profileEmail");

        expect(firstName.textContent).toEqual("N/A");
        expect(lastName.textContent).toEqual("N/A");
        expect(profileEmail.textContent).toEqual("N/A");
        console.log("Initialized first name: " + firstName.textContent);
        console.log("Initialized last name: " + lastName.textContent);
        console.log("Initialized email: " + profileEmail.textContent);
    });
});

describe(ProfileComponent, () => {
    it("Logout button should set profile name and email data to 'N/A'", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const firstName = getByTestId(container, "firstName");
        const lastName = getByTestId(container, "lastName");
        const profileEmail = getByTestId(container, "profileEmail");
        const logOut = getByTestId(container, "logOut");

        fireEvent.click(logOut);
        expect(firstName.textContent).toEqual("N/A");
        expect(lastName.textContent).toEqual("N/A");
        expect(profileEmail.textContent).toEqual("N/A");
    });
});  */



