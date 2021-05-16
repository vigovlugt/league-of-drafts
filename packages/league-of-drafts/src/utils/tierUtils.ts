export const TIERS = ["S", "A", "B", "C", "D", "E", "F"];

export function tierToNumber(rank: string) {
    let number = 0;

    for (let i = 0; i < TIERS.length; i++) {
        const char = TIERS[TIERS.length - 1 - i];

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

export function numberToTier(num: number) {
    let tier = "F";

    for (let i = 0; i < TIERS.length - 1; i++) {
        const char = TIERS[TIERS.length - 2 - i];

        if (num >= 0.699) {
            tier = char;
            num -= 1;
        }
    }

    if (num > 0) {
        while (num >= 0.299) {
            tier += "+";
            num -= 0.3;
        }
    } else if (num < 0) {
        while (num <= -0.299) {
            tier += "-";
            num += 0.3;
        }
    }

    return tier;
}
