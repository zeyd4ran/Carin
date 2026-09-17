import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  CreateCareerProfileBody,
  CreateCareerProfileResponse,
  GetCareerProfileParams,
  GetCareerProfileResponse,
  UpdateCareerProgressBody,
  UpdateCareerProgressParams,
} from "@workspace/api-zod";
import { careerProfilesTable, type CareerProfile } from "@workspace/db/schema";

const router: IRouter = Router();
const memoryProfiles = new Map<string, CareerProfile>();

function usesMemoryStorage() {
  return process.env.CARIN_STORAGE === "memory";
}

async function getDatabase() {
  const databaseModule = await import("@workspace/db");
  return databaseModule.db;
}

async function findProfile(profileId: string) {
  if (usesMemoryStorage()) {
    return memoryProfiles.get(profileId);
  }

  const db = await getDatabase();
  const [profile] = await db
    .select()
    .from(careerProfilesTable)
    .where(eq(careerProfilesTable.id, profileId))
    .limit(1);
  return profile;
}

const baseMatches = [
  {
    role: "Product Researcher",
    company: "Consumer technology · people-first",
    score: 84,
    reason:
      "Your user research and cognitive science background point to strong pattern-spotting. Add experiment design to make the story more complete.",
  },
  {
    role: "Climate Data Analyst",
    company: "Climate technology · evidence-led",
    score: 68,
    reason:
      "Your SQL foundation is useful here. The stretch is stronger statistics and learning how to explain a model to non-technical teammates.",
  },
  {
    role: "UX Content Strategist",
    company: "Digital products · clarity obsessed",
    score: 79,
    reason:
      "You already translate complexity for people. Build a small content system to show how you think beyond a single screen.",
  },
];

const baseSkillGaps = [
  { name: "Curiosity & inquiry", current: 88, required: 82, label: "strong" },
  { name: "Research practice", current: 76, required: 84, label: "growing" },
  { name: "Technical fluency", current: 61, required: 74, label: "next" },
  { name: "Experiment design", current: 42, required: 70, label: "next" },
];

const roadmap = [
  {
    week: "WEEK 01",
    title: "Find the pattern",
    detail: "Run five interviews around one campus friction.",
  },
  {
    week: "WEEK 02",
    title: "Make it legible",
    detail: "Learn the SQL joins behind a clean evidence set.",
  },
  {
    week: "WEEK 03",
    title: "Test a hunch",
    detail: "Design a lightweight experiment and read the result.",
  },
  {
    week: "WEEK 04",
    title: "Tell the story",
    detail: "Turn your work into a portfolio case study.",
  },
];

const projects = [
  {
    id: "heatmap",
    name: "The Bus Stop Heat Map",
    detail: "Map cooling access across Seattle neighborhoods",
    skills: "Python · data viz",
    time: "6–8 hours",
    level: "Warm-up",
  },
  {
    id: "interview",
    name: "Five Conversations, One Pattern",
    detail: "Find the friction inside a campus service",
    skills: "Research · synthesis",
    time: "4–5 hours",
    level: "Best next",
  },
  {
    id: "content",
    name: "The Plain-Language Rewrite",
    detail: "Turn a complex climate report into a useful guide",
    skills: "Writing · systems",
    time: "3 hours",
    level: "Quick win",
  },
];

const interviewChecklist = [
  {
    id: "research",
    title: "Explain one research decision",
    detail: "Use your campus service interviews to show how you moved from signal to insight.",
  },
  {
    id: "story",
    title: "Prepare a 90-second project story",
    detail: "Practice the context, your contribution, the trade-off, and what changed.",
  },
  {
    id: "experiment",
    title: "Describe a failed hypothesis",
    detail: "Recruiters want to see how you learn when the first idea is not the right one.",
  },
  {
    id: "role",
    title: "Bring two role-specific questions",
    detail: "Ask how this team decides what to learn before deciding what to build.",
  },
];

const jobRoles = [
  {
    role: "Junior UX Researcher",
    detail: "A people-first entry point for your interview and synthesis strengths.",
  },
  {
    role: "Product Operations Associate",
    detail: "A cross-functional role where systems thinking and clear writing compound.",
  },
  {
    role: "Research Coordinator",
    detail: "A practical bridge into research programs, participant ops, and insight work.",
  },
];

function buildDashboard(profile: CareerProfile) {
  const normalizedInterests = profile.interests.map((interest) => interest.toLowerCase());
  const hasClimateInterest = normalizedInterests.some((interest) =>
    interest.includes("climate"),
  );
  const matches = baseMatches.map((match, index) => ({
    ...match,
    score: hasClimateInterest && index === 1 ? match.score + 8 : match.score,
  }));

  return {
    id: profile.id,
    profile: {
      name: profile.name,
      degree: profile.degree,
      school: profile.school,
      skills: profile.skills,
      interests: profile.interests,
      resume: profile.resume,
    },
    matches,
    skillGaps: baseSkillGaps,
    roadmap,
    projects,
    interviewChecklist,
    jobRoles,
    completedPrep: profile.completedPrep,
    savedProjects: profile.savedProjects,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

router.post("/career/profiles", async (req, res) => {
  const parsed = CreateCareerProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please complete the profile before building a path." });
    return;
  }

  try {
    const now = new Date();
    let profile: CareerProfile;
    if (usesMemoryStorage()) {
      profile = {
        id: randomUUID(),
        ...parsed.data,
        completedPrep: [],
        savedProjects: [],
        createdAt: now,
        updatedAt: now,
      };
      memoryProfiles.set(profile.id, profile);
    } else {
      const db = await getDatabase();
      [profile] = await db
        .insert(careerProfilesTable)
        .values({
          ...parsed.data,
          completedPrep: [],
          savedProjects: [],
        })
        .returning();
    }

    const response = CreateCareerProfileResponse.parse(buildDashboard(profile));
    res.status(201).json(response);
  } catch (error) {
    req.log.error({ err: error }, "Could not create career profile");
    res.status(500).json({ error: "We could not save your path. Please try again." });
  }
});

router.get("/career/profiles/:profileId", async (req, res) => {
  const params = GetCareerProfileParams.safeParse(req.params);
  if (!params.success) {
    res.status(404).json({ error: "Career profile not found." });
    return;
  }

  try {
    const profile = await findProfile(params.data.profileId);

    if (!profile) {
      res.status(404).json({ error: "Career profile not found." });
      return;
    }

    res.json(GetCareerProfileResponse.parse(buildDashboard(profile)));
  } catch (error) {
    req.log.error({ err: error }, "Could not load career profile");
    res.status(500).json({ error: "We could not load this path. Please try again." });
  }
});

router.patch("/career/profiles/:profileId/progress", async (req, res) => {
  const params = UpdateCareerProgressParams.safeParse(req.params);
  const body = UpdateCareerProgressBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Progress updates need valid checklist and project IDs." });
    return;
  }

  try {
    let profile: CareerProfile | undefined;
    if (usesMemoryStorage()) {
      const current = memoryProfiles.get(params.data.profileId);
      if (current) {
        profile = {
          ...current,
          completedPrep: body.data.completedPrep,
          savedProjects: body.data.savedProjects,
          updatedAt: new Date(),
        };
        memoryProfiles.set(profile.id, profile);
      }
    } else {
      const db = await getDatabase();
      [profile] = await db
        .update(careerProfilesTable)
        .set({
          completedPrep: body.data.completedPrep,
          savedProjects: body.data.savedProjects,
          updatedAt: new Date(),
        })
        .where(eq(careerProfilesTable.id, params.data.profileId))
        .returning();
    }

    if (!profile) {
      res.status(404).json({ error: "Career profile not found." });
      return;
    }

    res.json(GetCareerProfileResponse.parse(buildDashboard(profile)));
  } catch (error) {
    req.log.error({ err: error }, "Could not update career progress");
    res.status(500).json({ error: "We could not save your progress. Please try again." });
  }
});

export default router;