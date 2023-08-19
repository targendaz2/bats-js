import * as cp from 'child_process';

export function bats(path: string): string {
    const result = cp.spawnSync('npx bats ' + path, {
        'cwd': '.',
        'shell': true
    });
    return result.stdout.toString();
}
