import { fireEvent, getByRole, getByTestId, render } from "@testing-library/react";
import { ProfileComponent } from "./profileComponent";
import Login from "./profileComponent";

//still in progress
/*requires following packages: 
    "axios": "^0.27.2",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "mv": "^2.1.1",
    "mysql2": "^2.3.3",
    "sequelize": "^6.23.2"
*/

describe(ProfileComponent, () => {
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
})