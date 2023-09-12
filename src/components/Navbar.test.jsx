import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar";
describe("Navbar", () => {
  test("should render icon, login and register links", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByText("LOGIN")).toBeDefined();
    expect(screen.getByText("REGISTER")).toBeDefined();
    expect(screen.getByText("Fit Track")).toBeDefined();

  });
});
