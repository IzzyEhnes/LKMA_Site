import React from "react";
import { render, screen, fireEvent, getByRole, getByTestId  } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { mount } from 'enzyme';
import { useNavigate } from "react-router-dom";
import { ProfileComponent, logOut, loggedIn } from "./profileComponent";
import { filePath } from "../loginPage/loginComponent";

const mockLogin = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockLogin,
}));

describe(ProfileComponent, () => {
    it("Uploading an image updates the profile picture", () => {
        
        const { container } = render(<Router><ProfileComponent/></Router>);
        const user = userEvent.setup();
        const exampleFile = new File(['hello world'], 'hello-world.png', 
            { type: 'image/png'});

        const imageValue = getByTestId(container, "uploadFile");
        const imageSubmit = getByTestId(container, "uploadSubmit");
        const profilePic = getByTestId(container, "profilePic");

        fireEvent.click(imageSubmit);
        userEvent.upload(imageValue, exampleFile);
        expect(profilePic.textContent).toEqual(imageValue.textContent);
    });
});

describe(ProfileComponent, () => {
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
});  


//edge cases to test for:
// test 1: login, then sign up for a new account and see if the profile info changes
// test 2: sign up, then log in to a different account and see if profile info changes
// test 3: test if profile picture Upload button works and changes profile pic
// test 4: test if profile info changes when navigating to other pages and back
// test 5: test Log out button to see if it resets the profile info
// test 6: check if profile info loads back up after logging out and then 
// 		   logging back into that account
// test 7: test if profile pic loads if user signs up for an account, logs out
//		   without setting a profile picture, then logs back in
// test 8: check if pressing Upload Image button without choosing a file causes
//		   an error to appear
// test 9: check if user can choose a new file to upload after pressing Upload
//		   Image without choosing a file
// test 10: check if cancelling out of Choose File causes profile pic to disappear
// test 11: test if profile info appears when signing up and logging in
