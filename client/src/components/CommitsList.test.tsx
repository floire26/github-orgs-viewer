import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CommitsList from "./CommitsList";
import { Commit } from "../types/Commit";

describe("Testing CommitsList", () => {
    it('Should be able to render the component', () => {
        const { container } = render(
               <CommitsList project="" commits={[]} projectUrl=""/>
        );
        expect(container).toBeInTheDocument();
    })

    it('Should render the progress bar if commits are empty', () => {
        render(
               <CommitsList project="" commits={[]} projectUrl=""/>
        );

        const progressBar = screen.getByTestId("progress-bar");
        expect(progressBar).toBeInTheDocument();
    })


    it('Should display the commit name if the passed commit prop is not an empty string', () => {
        const testInput = "test"
        render(
               <CommitsList project={testInput} commits={[]} projectUrl=""/>
        );

        const commitTitle = screen.getByText(testInput);
        expect(commitTitle).toBeInTheDocument();
    })

    it('Should display the commit name if the passed commit prop is not an empty string', () => {
        const testInput = "test"
        render(
               <CommitsList project={testInput} commits={[]} projectUrl=""/>
        );

        const commitTitle = screen.getByText(testInput);
        expect(commitTitle).toBeInTheDocument();
    })

    it('Should display the commit card if the passed commits prop is not an empty array', () => {
        const testInput = "test"
        const testCommits: Commit[] = [{
            sha: "test",
            author: {
                avatar_url: "test",
                html_url: "test"
            },
            commit: {
                message: "test",
                author: {
                    name: "test",
                    email: "test",
                    date: new Date()
                }
            },
            html_url: "test"
        }]
        render(
               <CommitsList project={testInput} commits={testCommits} projectUrl=""/>
        );

        const commitCardId = screen.getByTestId("commit-card-1");
        expect(commitCardId).toBeInTheDocument();
    })
})