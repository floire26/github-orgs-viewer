import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"
import App from "./App";

describe("Testing App", () => {
    it('Should render the App', () => {
        const { container } = render(
               <App />
        );
        expect(container).toBeInTheDocument();
    })

    it('Should render the App containing the fetch project button', () => {
        render(
               <App />
        );

        const projectList = screen.getByText("Fetch Projects");

        expect(projectList).toBeInTheDocument();
    })

    it('Should render the App containing the search organization input', () => {
        render(
               <App />
        );

        const searchValue = document.getElementById("input-org").value;        

        expect(searchValue).toBe("");
    })
})