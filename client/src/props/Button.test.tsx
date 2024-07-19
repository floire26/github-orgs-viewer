import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Button from "./Button";

describe("Testing Button", () => {
    it('Should be able to render the component', () => {
        const { container } = render(
               <Button value={""} sortType={""} selectedButton={null} onClick={() => {}}  />
        );
        expect(container).toBeInTheDocument();
    })
})