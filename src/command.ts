import * as fs from 'fs';

export class BatsCommand {
    constructor(tests: string) {
        if (!tests || !fs.existsSync(tests)) {
            throw new Error();
        }
    }
}
