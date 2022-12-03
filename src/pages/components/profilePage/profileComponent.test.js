import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { ProfileComponent } from "./profileComponent";


describe(ProfileComponent, () => {
    it("profile page's profile pic should be initialized to blank profile image", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const profilePic = getByTestId(container, "profilePic");
        const blankPic = "/img/profile-blank-whitebg.png";

        expect(profilePic).toBeInTheDocument;
        expect(profilePic.src).toContain(blankPic);
    });

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

    it("profile page's name and email data are initialized to 'N/A'", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const firstName = getByTestId(container, "firstName");
        const lastName = getByTestId(container, "lastName");
        const profileEmail = getByTestId(container, "profileEmail");

        expect(firstName.textContent).toEqual("N/A");
        expect(lastName.textContent).toEqual("N/A");
        expect(profileEmail.textContent).toEqual("N/A");
    });
});

describe(ProfileComponent, () => {
    it("Should Render 'Enter new phone' input field & Update Phone Button", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const phone = getByTestId(container, "phone");
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");

        expect(phone).toBeVisible();
        expect(phoneField).toBeVisible();
        expect(updatePhone).toBeVisible();
    });

    it("Expect No Error when valid phone is given", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");
        const phoneError = screen.getByTestId("phoneError");
        
        fireEvent.change(phoneField, { target: { value: "9168675309"}})
        fireEvent.click(updatePhone);
        expect(phoneError.textContent).toBe("");
    });

    it("Expect Error when phone < 10 digits is given", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");
        const phoneError = screen.getByTestId("phoneError");
        
        fireEvent.change(phoneField, { target: { value: "21"}})
        fireEvent.click(updatePhone);
        expect(phoneError.textContent).toBe("Phone number must be 10 digits (Include area code)");
    });

    it("Expect Error when phone > 10 digits is given", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");
        const phoneError = screen.getByTestId("phoneError");
        
        fireEvent.change(phoneField, { target: { value: "11223344556677889900"}})
        fireEvent.click(updatePhone);
        expect(phoneError.textContent).toBe("Phone number must be 10 digits (Include area code)");
    });

    it("Expect Error when phone has invalid digits (non-numerical)", () => {
        const { container } = render(<Router><ProfileComponent/></Router>);
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");
        const phoneError = screen.getByTestId("phoneError");
        
        fireEvent.change(phoneField, { target: { value: "abc8675309"}})
        fireEvent.click(updatePhone);
        expect(phoneError.textContent).toBe("Phone number must contain only numbers.");
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
