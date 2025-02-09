import prisma from "@/lib/prisma";
import { Suspense } from "react";
import ProjectCard from "./project-card";

export default function ProjectList() {
  return (
    <Suspense fallback={null}>
      <ProjectListRSC />
    </Suspense>
  );
}

async function ProjectListRSC() {
  const projects = await prisma.project.findMany({
    where: {
      verified: true,
    },
    orderBy: {
      stars: "desc",
    },
  });

  return (
    <div className="mx-5 grid grid-cols-1 gap-4 md:mx-0 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
