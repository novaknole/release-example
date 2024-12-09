
module.exports = async ({ github, context, core }) => {

    function setOutput(key, value) {
        core.info(`State ${key} = ${value}`);
        core.setOutput(key, value);
    }

    const refName = process.env.GITHUB_REF_NAME;
    const eventName = context.eventName;
    const botRun = process.env.TRIGGERING_ACTOR === 'github-actions[bot]';
    
    core.info(`State ${refName}`);
    core.info(`State ${eventName}`);
    core.info(`State ${botRun}`);
    core.info(`State ${Object.keys(github)}`);
    core.info(`State ${Object.keys(context)}`);
    
    // Jobs to trigger
    setOutput('start', () => {
        return refName == 'main' && eventName == 'workflow_dispatch'
    })

    setOutput('changesets', () => {
        return (refName.startsWith('release-') && eventName == 'workflow_dispatch' && botRun) || github.event.pull_request.merged
    })

    setOutput('promote', () => {
        return refName.startsWith('release-') && eventName == 'workflow_dispatch' && !botRun
    })

};

