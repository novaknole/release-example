const { execSync } = require("child_process");
const path = require('path')
const fs = require("fs-extra")

// console.log(path)
const workspacesInfo = JSON.parse(
    JSON.parse(execSync('yarn --silent --json workspaces info').toString()).data
)

let ll = workspacesInfo['@glagh/giorgi-contracts-monorepo'].location

let oo = path.join(ll, 'package.json')

async function awesome() {
  const dd = await fs.readFile(oo,'utf8')

console.log(dd)
}

awesome()


// Problems:

// Assuming we did pre-release of packageA and once done, we merged it to main and removed changeset-release/main branch. This caused
// pre.json to end up on main branch.

// Case 1: 
// Option A:
//    Now, we want to do normal release of packageB. 
//    When we trigger workflow from main, it will create a changeset-release/main branch but will include both in the changesets,
//    packageA and packageB both when in reality, only packageB must be included.
// Option B:
//    Now, we want to do pre release of packageB.
//    When we trigger workflow from main, it will create a changeset-release/main branch, but the PR will be empty for some reason.

// Case 2:
// Now, we want do another pre-release of packageA. So we trigger workflow from main, it creates changeset-release/main and successfully 
// shows in PR only the packageA changes and version is upgraded to alpha.1
// Option A:
//  If we now decide not to release it yet, but release packageB's pre-release(triggering workflow), the PR  gets updated wrongly as 
//  it doesn't contain anything anymore. Empty PR.
// Option B:
//  If we now decide not to release it yet, but release packageB's normal release(triggering workflow), the PR gets updated such that
//  it now includes the release of packageA without pre-release(normal) + packageB as well without pre-release(normal)

