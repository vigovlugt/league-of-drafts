const RANKS = ["S", "A", "B", "C", "D", "E", "F"];

export function rankToNumber(rank: string) {
    let number = 0;

    for (let i = 0; i < RANKS.length; i++) {
        const char = RANKS[RANKS.length - 1 - i];

        if (rank.includes(char)) {
            number += i;
        }
    }

    const pluses = rank.split("+").length - 1;
    const minuses = rank.split("-").length - 1;

    number += pluses * 0.3;
    number -= minuses * 0.3;

    return number;
}
