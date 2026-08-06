import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { WorkInProgress } from "@/components/WorkInProgress";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";
import {
  getSite,
  getProjects,
  getWipProjects,
  getExperience,
  getSkills,
} from "@/lib/content";

export default function Home() {
  const site = getSite();
  const projects = getProjects();
  const wipProjects = getWipProjects();
  const experience = getExperience();
  const skills = getSkills();

  return (
    <>
      <main className="flex-1">
        <Hero site={site} />
        <About site={site} />
        <ProjectsGrid projects={projects} />
        <WorkInProgress items={wipProjects} />
        <Experience entries={experience} />
        <Skills groups={skills} />
      </main>
      <Footer site={site} />
    </>
  );
}
