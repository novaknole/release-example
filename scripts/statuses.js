
module.exports = async ({ github, context, core }) => {
  const state = await getState({ github, context, core });

  function setOutput(key, value) {
    core.info(`State ${key} = ${value}`);
    core.setOutput(key, value);
  }

  // Jobs to trigger
  setOutput('start', shouldRunStart(state));
  setOutput('promote', shouldRunPromote(state));
  setOutput('changesets', shouldRunChangesets(state));
  setOutput('publish', shouldRunPublish(state));
  setOutput('merge', shouldRunMerge(state));

  // Global Variables
  setOutput('is_prerelease', state.prerelease);
};