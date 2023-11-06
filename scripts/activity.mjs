// @ts-check
import { Octokit } from '@octokit/rest';
import { writeFile } from 'fs/promises';
import path from 'path';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

(async () => {
  const response = await octokit.activity.listPublicEventsForUser({
    username: 'imballinst'
  });
  /** @type {any} */
  const activities = {};
  const repoNames = Array.from(
    new Set(
      response.data
        // Exclude non-push events and events for this repository.
        .filter(
          (el) =>
            el.type === 'PushEvent' &&
            el.repo.name !== `imballinst/imballinst.dev`
        )
        .map((el) => el.repo.name)
    )
  );

  for (const repoName of repoNames) {
    const [owner, repo] = repoName.split('/');

    try {
      const repoResponse = await octokit.repos.get({
        owner,
        repo
      });

      activities[repo] = {
        name: repo,
        url: repoResponse.data.html_url,
        description: repoResponse.data.description,
        lastUpdate: response.data.find((el) => el.repo.name === repoName)
          ?.created_at
      };
    } catch (err) {
      console.error(err);
    }
  }

  console.info('activities', activities);

  await writeFile(
    path.join(process.cwd(), '/src/static/activity.json'),
    JSON.stringify(Object.values(activities), null, 2)
  );
})();
