import * as cp from 'child_process';

interface Bats {
    (path: string): string;
    count(path: string): number;
    version: string;
}

function getVersion(): string {
    const result = cp.spawnSync('npx bats --version', {
        'cwd': '.',
        'shell': true
    });
    return result.stdout.toString();
}

function getBats(): Bats {
    const bats = function (path: string) {
        const result = cp.spawnSync('npx bats ' + path, {
            'cwd': '.',
            'shell': true
        });
        return result.stdout.toString();
    } as Bats;

    bats.count = function (path: string): number {
        const result = cp.spawnSync('npx bats ' + path + ' -c', {
            'cwd': '.',
            'shell': true
        });
        return parseInt(result.stdout.toString());
    };

    bats.version = getVersion();

    return bats;
}

export const bats = getBats();
