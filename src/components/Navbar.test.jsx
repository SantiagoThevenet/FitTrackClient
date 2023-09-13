import { describe, expect, it } from "vitest";
import { AuthProvider } from "../context/AuthContext";
import TestRenderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";



describe("Navbar", () => {
  it("should test the children inside my NavBar component", () => {
    const navBar = TestRenderer.create(<AuthProvider><MemoryRouter><Navbar /></MemoryRouter></AuthProvider>).toJSON();

    expect(navBar.children[0].props.href).toBe("/")
    expect(navBar.children[1].children[0].children[0].props.href).toBe("/login")
    expect(navBar.children[1].children[1].children[0].props.href).toBe("/register")
  });
});
