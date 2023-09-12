import os from 'os'

/**
 * Get the local IP address of the machine.
 * @returns {string|null} The local IP address or null if it cannot be determined.
 */
export function getLocalIpAddress(): string | null {
    const networkInterfaces = os.networkInterfaces()
    let localIpAddress = null

    // Iterate through all network interfaces
    for (const key in networkInterfaces) {
        const networkInterface = networkInterfaces[key]
        for (const entry of networkInterface ?? []) {
            if (entry.family === 'IPv4' && !entry.internal) {
                localIpAddress = entry.address
                break
            }
        }
        if (localIpAddress) {
            break
        }
    }

    return localIpAddress
}
