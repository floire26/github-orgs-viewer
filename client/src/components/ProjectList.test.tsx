import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ProjectList from "./ProjectList";
import { Project } from "../types/Project";

describe("Testing ProjectList", () => {
    it('Should be able to render the component', () => {
        const { container } = render(
               <ProjectList projects={[]} onSelectProject={() => {}}/>
        );
        expect(container).toBeInTheDocument();
    })

    it('Should display project cards if projects props is not an empty array', () => {
        const testProjects: Project[] = [
            {
                id: 0,
                name: "test",
                description: "test",
                stargazers_count: 0,
                forks_count: 0,
                open_issues_count: 0,
                watchers_count: 0,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]
        
        render(
            <ProjectList projects={testProjects} onSelectProject={() => {}}/>
        );

        const projectCardId = screen.getByTestId("project-card-1");
        expect(projectCardId).toBeInTheDocument();
    })
})