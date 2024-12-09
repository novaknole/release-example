module.exports = async ({ github, context, core }) => {
  function setOutput(key, value) {
    core.info(`State ${key} = ${value}`);
    core.setOutput(key, value);
  }

  const eventName = context.eventName;

  // If it's a PR, gather all information we need for making decisions.
  const prRequest = {
    isPR: eventName == "pull_request",
    merged: process.env.PULL_REQUEST_MERGED == "true",
    sourceBranchName: process.env.HEAD_REF,
    targetBranchName: process.env.BASE_REF,
  };

  const refName = process.env.GITHUB_REF_NAME;
  const botRun = process.env.TRIGGERING_ACTOR === "github-actions[bot]";
  const isWorkflowDispatch = eventName == "workflow_dispatch";
  const isReleaseBranch = refName.startsWith("release-");

  core.info(`State ${refName}`);
  core.info(`State ${eventName}`);
  core.info(`State ${botRun}`);
  core.info(`State ${process.env.PULL_REQUEST_MERGED}`);
  core.info(`State ${process.env.HEAD_REF}`);
  core.info(`State ${process.env.BASE_REF}`);
  core.info(`State ${isReleaseBranch}`);

  function shouldRunStart() {
    return refName == "main" && isWorkflowDispatch;
  }

  // Changeset(which updates the PR) should only run in 2 cases:
  // 1. we manually triggered the workflow on `release-*` branch
  // 2. The PR was merged to it.
  function shouldRunChangesets() {
    return (
      (isReleaseBranch && isWorkflowDispatch && botRun) ||
      (prRequest.isPR && prRequest.merged)
    );
  }

  
  // By default, our starting process of release makes release candidate(not the final version).
  // Manually triggering the workflow from `release-*` branch will cause the below to be true
  // which exits the pre-release, runs the changeset job again.
  function shouldRunPromote() {
    return isReleaseBranch && isWorkflowDispatch && !botRun;
  }

  // We only publish if the changeset-release/release-* branch is merged into `release-*`.
  // If some other branch is merged into `release-*`, that means we should update the PR, but
  // not publish yet.
  function shouldRunPublish() {
    return (
      prRequest.isPR &&
      prRequest.merged &&
      prRequest.sourceBranchName ==
        `changeset-release/${prRequest.targetBranchName}`
    );
  }

  // Jobs to trigger
  setOutput("start", shouldRunStart());
  setOutput("changesets", shouldRunChangesets());
  setOutput("promote", shouldRunPromote());
  setOutput("publish", shouldRunPublish());

  console.log("coming 123");
};
