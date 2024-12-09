module.exports = async ({ github, context, core }) => {
  function setOutput(key, value) {
    core.info(`State ${key} = ${value}`);
    core.setOutput(key, value);
  }

  const refName = process.env.GITHUB_REF_NAME;
  const eventName = context.eventName;
  const botRun = process.env.TRIGGERING_ACTOR === "github-actions[bot]";
  const isWorkflowDispatch = eventName == "workflow_dispatch";
  const isReleaseBranch = refName.startsWith("release-");

  function shouldRunStart() {
    return refName == "main" && isWorkflowDispatch;
  }

  function shouldRunChangesets() {
    return (
      (isReleaseBranch && isWorkflowDispatch && botRun) ||
      process.env.PULL_REQUEST_MERGED == "true"
    );
  }

  function shouldRunPromote() {
    return isReleaseBranch && isWorkflowDispatch && !botRun;
  }

  core.info(`State ${refName}`);
  core.info(`State ${eventName}`);
  core.info(`State ${botRun}`);
  core.info(`State ${process.env.PULL_REQUEST_MERGED}`);

  // Jobs to trigger
  setOutput("start", shouldRunStart());
  setOutput("changesets", shouldRunChangesets());
  setOutput("promote", shouldRunPromote());

  console.log("coming 123");
};
