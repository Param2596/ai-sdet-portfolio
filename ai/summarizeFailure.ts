export type FailureSummary = {
    cause: string;
    nextStep: string;
    tags: string[];
};

export function summarizeFailure(log : string): FailureSummary{
    const text = log.toLowerCase();

    if(text.includes('timeout') || text.includes('waiting for ')) {
        return{
          cause: 'Likely timing or locator wait - element not ready in time',
          nextStep: 'Open Playwright trace; check locator; prefer auto-wait over sleep',
          tags: ['timing', 'locator'],
        };
    }

    if (text.includes('tobevisible') || text.includes('not found') || text.includes('strict mode violation')) {
        return {

            cause: 'Likely missing or wrong element/locator',
            nextStep: 'Re-check data-test / getByRole; confirm you navigated to the right page',
            tags: ['locator', 'ui'],
        };
    }

    if(text.includes('net::') || text.includes('econnrefused') || text.includes('enotfound')) {
        return{
            cause: 'Likely network / server unreachable',
            nextStep: 'Check URL, VPN, and whether the API/site is up',
            tags: ['network'],
        };
    }

    return {
        cause: 'Unknown — no clear keyword match',
        nextStep: 'Paste full error + trace; narrow with expect error message',
        tags: ['unknown'],
    };
}