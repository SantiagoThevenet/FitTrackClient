import { describe, expect, it } from "vitest";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import TestRenderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { render } from "@testing-library/react";

describe("Navbar", () => {
  it("should render the Navbar component without errors", () => {
    const { getByText } = render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );
    const logoElement = getByText("Fit Track");
    expect(logoElement).exist;
  });

  it("should test the children inside my NavBar component whes user is not authenticated", () => {
    const navBar = TestRenderer.create(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    ).toJSON();

    expect(navBar.children[0].props.href).toBe("/");
    expect(navBar.children[1].children[0].children[0].props.href).toBe(
      "/login"
    );
    expect(navBar.children[1].children[1].children[0].props.href).toBe(
      "/register"
    );
  });

  it("should test the children inside my NavBar component when user is authenticated", () => {
    const isAuthenticated = true;
    const user = { username: "santi" };

    const MockContextProvider = ({ children }) => {
      const mockedValue = { isAuthenticated, user };
      return (
        <AuthContext.Provider value={mockedValue}>
          {children}
        </AuthContext.Provider>
      );
    };

    const navBar = TestRenderer.create(
      <AuthProvider>
        <MemoryRouter>
          <MockContextProvider>
            <Navbar />
          </MockContextProvider>
        </MemoryRouter>
      </AuthProvider>
    ).toJSON();

    expect(navBar.children[0].props.href).toBe("/");
    expect(navBar.children[1].children[2].children[0]).toBe("LOGOUT");
    expect(navBar.children[1].children[1].children[0].props.href).toBe(
      "/routines"
    );
  });  

});
