// nextjs handler

import { NextApiRequest, NextApiResponse } from "next";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { Octokit } from "@octokit/core";

import { env } from "~/env.mjs";

type TodoistTask = Parameters<TodoistApi["addTask"]>[0];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  //  fetch all PRs from a repo that are open and have the target user as a reviewer
  const octokit = new Octokit({
    auth: env.GITHUB_TOKEN,
  });

  const { data } = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner: "coinvise",
    repo: "coinvise",
    state: "open",
    per_page: 100,
    sort: "created",
    direction: "desc",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const prs = data.filter((pr) => {
    return pr.requested_reviewers?.some((reviewer) => {
      return reviewer.login === env.GITHUB_TARGET_REVIEWER;
    });
  });

  // fetch all tasks from Todoist with label "PR"
  const todoistAPI = new TodoistApi(env.TODOIST_TOKEN);
  const prTasks = await todoistAPI.getTasks({
    label: "PR",
  });

  const tasksToBeAdded = prs
    .map((pr) => {
      const prTaskTitle = `Review PR #${pr.number} - ${pr.title}`;
      const hasTask = prTasks.some((task) => task.content === prTaskTitle);
      if (!hasTask) {
        const task: TodoistTask = {
          content: prTaskTitle,
          description: pr.html_url,
          labels: ["PR"],
          projectId: env.TODOIST_PROJECT,
        };

        return task;
      } else {
        return null;
      }
    })
    .filter((task): task is TodoistTask => task !== null);

  const addedTasks = await Promise.all(
    tasksToBeAdded.map((task) => todoistAPI.addTask(task)),
  );
  return res.status(200).json(addedTasks);
}
