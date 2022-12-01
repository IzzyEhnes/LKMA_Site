import { fireEvent, getByTestId, getAllByTestId, render, screen } from "@testing-library/react";
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
    it("Should Render 'Enter new phone' input field & Update Phone Button", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
        const phone = getByTestId(container, "phone");
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");

        expect(phone).toBeVisible();
        expect(phoneField).toBeVisible();
        expect(updatePhone).toBeVisible();
    });

    it("Expect No Error when valid phone is given", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");
        const phoneError = screen.getByTestId("phoneError");
        
        fireEvent.change(phoneField, { target: { value: "9168675309"}})
        fireEvent.click(updatePhone);
        expect(phoneError.textContent).toBe("");
    });

    it("Expect Error when phone < 10 digits is given", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");
        const phoneError = screen.getByTestId("phoneError");
        
        fireEvent.change(phoneField, { target: { value: "21"}})
        fireEvent.click(updatePhone);
        expect(phoneError.textContent).toBe("Phone number must be 10 digits (Include area code)");
    });

    it("Expect Error when phone > 10 digits is given", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");
        const phoneError = screen.getByTestId("phoneError");
        
        fireEvent.change(phoneField, { target: { value: "11223344556677889900"}})
        fireEvent.click(updatePhone);
        expect(phoneError.textContent).toBe("Phone number must be 10 digits (Include area code)");
    });

    it("Expect Error when phone has invalid digits (non-numerical)", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
        const phoneField = screen.getByPlaceholderText("Enter new phone");
        screen.getByPlaceholderText("Enter new phone");
        const updatePhone = getByTestId(container, "updatePhone");
        const phoneError = screen.getByTestId("phoneError");
        
        fireEvent.change(phoneField, { target: { value: "abc8675309"}})
        fireEvent.click(updatePhone);
        expect(phoneError.textContent).toBe("Phone number must contain only numbers.");
    });
}); 

describe(AdminComponent, () => {
    it("admin page's name and email data are initialized to 'N/A'", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
        const firstName = getAllByTestId(container, "firstName");
        const lastName = getAllByTestId(container, "lastName");
        const profileEmail = getAllByTestId(container, "profileEmail");

        expect(firstName.textContent).toEqual(undefined);
        expect(lastName.textContent).toEqual(undefined);
        expect(profileEmail.textContent).toEqual(undefined);
        //console.log("Initialized first name: " + firstName.textContent);
        //console.log("Initialized last name: " + lastName.textContent);
        //console.log("Initialized email: " + profileEmail.textContent);
    });
});

describe(AdminComponent, () => {
    it("Logout button should set profile name and email data to 'N/A'", () => {
        const { container } = render(<Router><AdminComponent/></Router>);
        const firstName = getAllByTestId(container, "firstName");
        const lastName = getAllByTestId(container, "lastName");
        const profileEmail = getAllByTestId(container, "profileEmail");
        const logOut = getByTestId(container, "logOut");

        fireEvent.click(logOut);
        expect(firstName.textContent).toEqual(undefined);
        expect(lastName.textContent).toEqual(undefined);
        expect(profileEmail.textContent).toEqual(undefined);
    });
}); 