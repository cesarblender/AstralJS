import chalk from 'chalk'
import { getLocalIpAddress } from '@utils/getLocalIp'

/**
 * Generate a message indicating that the server is running.
 *
 * @param {number} port - The port on which the server is running.
 * @returns {string} A formatted message with server information.
 */
export function runningMessage(port: number): string {
    const ipAddress = getLocalIpAddress()

    const messages = [
        chalk.greenBright.bold(`🚀 Server running`),
        chalk.gray(
            `Local: ${chalk.underline.bold(`http://localhost:${port}/`)}`,
        ),
    ]

    // Add the network message only if a local IP address has been determined
    if (ipAddress) {
        messages.push(
            chalk.gray(
                `Network: ${chalk.underline.bold(
                    `http://${ipAddress}:${port}/`,
                )}`,
            ),
        )
    }

    return messages.join('\n')
}

export const envErrorMessages = {
    noDefaultValue: (key: string) =>
        chalk.bgYellowBright(`❌ Failed to load env variable ${key}. No default value was defined.`),
    usingDefaultValue: (key: string) =>
        chalk.bgYellowBright(`⚠ Using default value for ${key} env variable.`),
    notDefinedInEnv: (key: string) =>
        chalk.bgYellowBright(`⚠ The variable ${key} is not defined in environment variables.`),
}
