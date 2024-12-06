const { execSync } = require("child_process");

const workspacesInfo = JSON.parse(
    JSON.parse(execSync('yarn --silent --json workspaces info').toString()).data
  )

  console.log(workspacesInfo['@glagh/giorgi-contracts-monorepo'].location)