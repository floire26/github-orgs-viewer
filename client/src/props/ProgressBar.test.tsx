import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ProgressBar from "./ProgressBar";

describe("Testing ProgressBar", () => {
    it('Should be able to render the component', () => {
        const { container } = render(
               <ProgressBar />
        );
        expect(container).toBeInTheDocument();
    })
})