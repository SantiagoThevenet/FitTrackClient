import { MemoryRouter } from "react-router-dom";
import RoutinePage from "./RoutinePage";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { fetchWorkouts } from "../api/wgerApi";

describe("<RoutinePage />", () => {
  it('should render with the text "Your routines"', () => {
    const wrapper = render(
      <AuthProvider>
        <MemoryRouter>
          <RoutinePage />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(wrapper.getByText("Your routines")).exist;
  });

  it("should import the routines correctly", () => {
    const mockFetchWorkouts = vi.mock(fetchWorkouts, {
      return: [
        {
          id: 1,
          description: "Rutina 1",
        },
        {
          id: 2,
          description: "Rutina 2",
        },
      ],
    });

    const wrapper = render(
      <AuthProvider>
        <MemoryRouter>
          <RoutinePage />
        </MemoryRouter>
      </AuthProvider>,
      {
        context: {
          workouts: mockFetchWorkouts,
        },
      }
      );
      
      expect(wrapper.getByText('Rutina 1')).exist;
      expect(wrapper.getByText('Rutina 2')).exist;
    });
});
