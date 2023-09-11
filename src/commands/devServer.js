#!/usr/bin/env node
import nodemon from 'nodemon'
import chalk from 'chalk'

nodemon({
    script: 'src/server.ts',
    ext: 'ts',
    watch: ['src'],
    exec: 'ts-node -r tsconfig-paths/register',
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
