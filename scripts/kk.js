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
