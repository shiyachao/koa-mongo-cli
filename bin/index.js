#!/usr/bin/env node
const program = require("commander");
const download = require("download-git-repo");
const handlebars = require("handlebars");
const fs = require("fs");
const { version } = require("../package.json");
program.version(version);

program
  .command("create <project>")
  .description("create a koa project")
  .action((projectName) => {
    const url = "github:shiyachao/koa-init#cli";
    console.log("loading template...");
    download(url, projectName, { clone: true }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("template dowload successfully");
        const packagePath = `${projectName}/package.json`;
        const packageContent = fs.readFileSync(packagePath, "utf-8");
        const packageRepResult = handlebars.compile(packageContent)({
          name: projectName,
        });
        fs.writeFileSync(packagePath, packageRepResult);
        console.log("Project creation completed");
      }
    });
  });
program.parse(process.argv);
