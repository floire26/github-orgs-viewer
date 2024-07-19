import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SortSection from "./SortSection";

describe("Testing SortSection", () => {
    it('Should be able to render the component', () => {
        const { container } = render(
               <SortSection sortType={""} selectedButton={null} onClick={() => {}} />
        );
        expect(container).toBeInTheDocument();
    })

    it('Should be able to render all of the sort metrics', () => {
        const lastMetric = "Created At";
        render(
               <SortSection sortType={""} selectedButton={null} onClick={() => {}} />
        );
        const lastSortButton = screen.getByText(lastMetric);
        expect(lastSortButton).toBeInTheDocument();
    })
})