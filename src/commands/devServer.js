#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const nodemon = require('nodemon')
const chalk = require('chalk')

nodemon({
    script: 'src/server.ts',
    ext: 'ts',
    watch: ['src'],
    exec: 'ts-node',
    delay: 1000,
})

nodemon.on('start', () => {
    console.clear()
    console.log(chalk.bgMagentaBright.black.bold('Starting AstralJS Server'))
})

nodemon.on('crash', () => {
    console.log(chalk.bgRedBright('AstralJS Server crashed.'))
})

nodemon.on('restart', (files) => {
    console.log(
        chalk.green(
            `AstralJS Server restarted ${
                files ? `due to changes in: ${files.join(', ')}` : ''
            }`,
        ),
    )
})
