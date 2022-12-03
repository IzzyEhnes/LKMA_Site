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


