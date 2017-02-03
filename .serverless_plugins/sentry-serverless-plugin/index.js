'use strict';

const util = require('util');
const SentryAPIClient = require('sentry-api').Client;
const _ = require('lodash');
const clc = require('cli-color');

class Sentry {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    const commonCommandOptions = {
      stage: {
        usage: 'Specify the stage you want',
        shortcut: 's',
        required: true
      },
      org: {
        usage: 'sentry organization slug',
        shortcut: 'o',
        required: true,
      },
      team: {
        usage: 'sentry team slug',
        shortcut: 't',
        required: true,
      },
    };


    this.commands = {
      sentry: {
        commands: {
          info: {
            lifecycleEvents: [
              'default',
            ],
            options: commonCommandOptions,
            usage: 'show info of created sentry project if it exist',
          },
          create: {
            lifecycleEvents: [
              'default',
            ],
            options: commonCommandOptions,
            usage: 'create sentry project',
          },
          remove: {
            lifecycleEvents: [
              'default',
            ],
            options: commonCommandOptions,
            usage: 'remove sentry project',
          }
        }
      },
    };

    this.hooks = {
      'sentry:info:default': () => this.sentryInfo(),
      'sentry:create:default': () => this.sentryCreate(),
      'sentry:remove:default': () => this.sentryRemove(),
    };
  }

  __projectsWithName(name) {
    return this._client.teams.projects(
        this.options.org, this.options.team
      ).then(projects => {
        return Promise.resolve(_.filter(projects, p => p.name == name));
      });
  }

  __clientKeys(slug) {
    return this._client.projects.keys(this.options.org, slug);
  }

  sentryInfo() {
    this.__commandStartLog("Finding Projects...");

    return this.__projectsWithName(this._projectName)
            .then(projects => {
              console.log(
                [
                  "Found Projects:",
                  `${util.inspect(projects, false, null)}`,
                ].join('\n').split('\n').map(s => `       ${s}`).join('\n')
              );

              if (projects.length > 1) {
                return Promise.reject(new Error(`There is multiple projects that has same name ${this._projectName}`));
              } else if (projects.length == 0) {
                console.log(`There is no sentry project yet. create one with sentry create command`);
              } else {
                const project = projects[0];
                return this.__clientKeys(project.slug)
                  .then(keys => {
                    console.log(
                      [
                        "Keys",
                        `${util.inspect(keys, false, null)}`,
                      ].join('\n').split('\n').map(s => `         ${s}`).join('\n')
                    );

                    const key = keys[0];
                    console.log(`
        ${clc.white("PROJECT_URL")} : ${clc.green(`https://sentry.io/${this.options.org}/${project.slug}/`)}
        ${clc.white("RAVEN_KEY")} : ${clc.green(key.dsn.secret)}
                    `);
                  });
              }
            });
  }

  sentryCreate() {
    this.__commandStartLog(`Creating Project : ${this._projectName}...`);

    return this.__projectsWithName(this._projectName)
      .then(projects => {
        if (projects.length > 0) {
          return Promise.reject(new Error("Project already exist."));
        } else {
          return this._client.teams
            .createProject(this.options.org, this.options.team, { name: this._projectName })
            .then(project => {
              return this.__clientKeys(project.slug)
                .then(keys => {
                  const key = keys[0];

                  console.log(`
      ${clc.white("PROJECT_URL")} : ${clc.green(`https://sentry.io/${this.options.org}/${project.slug}/`)}
      ${clc.white("RAVEN_KEY")} : ${clc.green(key.dsn.secret)}
                  `);
                });
            });
        }
      })
  }

  sentryRemove() {
    this.__commandStartLog(`Removing Project : ${this._projectName}...`);

    return this.__projectsWithName(this._projectName)
      .then(projects => {
        if (projects.length === 0) {
          this.serverless.cli.log(`-- Project Not exist. --`);
        } else {
          return Promise.all(
              projects.map(project => {
                this.serverless.cli.log(`Delete Project - ${project.slug}`);
                return this._client.projects.delete(this.options.org, project.slug)
              })
            ).then(() => {
              this.serverless.cli.log(`Project Removed`);
              return Promise.resolve();
            });
        }
      })
  }

  get _client() {
    if (!this.__client) {
      const SENTRY_API_KEY = process.env.SENTRY_API_KEY;
      if (!SENTRY_API_KEY) throw new Error("You must provide SENTRY_API_KEY");

      this.__client = new SentryAPIClient({ token: SENTRY_API_KEY });
    }
    return this.__client;
  }

  get _projectName() {
    const name = `${this.serverless.service.service}-${this.options.stage}`;
    if (name.length > 30) {
      throw new Error("Sentry project name' length should be under 30");
    }
    return name;
  }

  __commandStartLog(message) {
    console.log(`
      =================================
      ${clc.green(message)}
      =================================
    `);
  }
}

module.exports = Sentry;