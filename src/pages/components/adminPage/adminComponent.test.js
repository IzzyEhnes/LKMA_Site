import { fireEvent, getByTestId, render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminComponent } from "./adminComponent";

//edge cases to test for:
// test 1: login to admin account and see if account info is displayed
// test 2: test Log out button and check admin account to see if profile info is reset
// test 3: check if profile info loads back up after logging out and then 
// 		   logging back into that account
// test 4: login to student account, logout, then login to admin to see if admin
//         info is displayed
// test 5: test if change email feature succesfully changes displayed email
// test 6: test if change password feature redirects to change password page 
// test 7: test if see student info feature correctly displays table of student info

describe(AdminComponent, () => {
    it("admin page's name and email data are initialized to 'N/A'", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
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

describe(AdminComponent, () => {
    it("Logout button should set profile name and email data to 'N/A'", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
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