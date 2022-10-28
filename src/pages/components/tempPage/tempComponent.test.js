import { fireEvent, getByRole, getByTestId, render } from "@testing-library/react";
import { TempComponent } from "./tempComponent";
import Login from "./tempComponent";

/*requires following packages: 
    "axios": "^0.27.2",
    "cors": "^2.8.5",
    "detect-file": "^1.0.0",
    "express": "^4.18.1",
    "mv": "^2.1.1",
    "mysql2": "^2.3.3",
    "sequelize": "^6.23.2"
*/

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

/*describe(TempComponent, () => {
    it("login button logs in user and displays email address", () => {

        const email = "";
        const password = "";

        const mockLogin = jest.fn();
        
        const {getByTestId} = render(<ProfileComponent onSubmit={mockLogin(email,password)} />);
        const loginEmail = getByTestId("loginEmail").textContent;
        const loginPassword = getByTestId("loginPassword").textContent;
        
        const loginBtn = getByTestId("loginSubmit");
        const submitBtn = getByTestId("uploadSubmit");
        const displayEmail = getByTestId("displayEmail");
        fireEvent.click(loginBtn);  
    });
})*/

describe(TempComponent, () => {
    it("placeholder test", () => {
    });
});