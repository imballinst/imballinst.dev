const { Octokit } = require('@octokit/rest');
const { writeFile } = require('fs-extra');
const path = require('path');

const octokit = new Octokit();

(async () => {
  const response = await octokit.activity.listPublicEventsForUser({
    username: 'imballinst'
  });
  const activities = {};
  const repoNames = Array.from(
    new Set(
      response.data
        .filter((el) => el.type === 'PushEvent')
        .map((el) => el.repo.name)
    )
  );

  for (const repoName of repoNames) {
    const [owner, repo] = repoName.split('/');
    const repoResponse = await octokit.repos.get({
      owner,
      repo
    });

    activities[repo] = {
      name: repo,
      url: repoResponse.data.html_url,
      description: repoResponse.data.description,
      lastUpdate: response.data.find((el) => el.repo.name === repoName)
        .created_at
    };
  }

  await writeFile(
    path.join(__dirname, '../src/static/activity.json'),
    JSON.stringify(Object.values(activities), null, 2)
  );
})();
