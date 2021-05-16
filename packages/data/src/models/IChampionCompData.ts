import CompType from "./CompType";

export default interface IChampionCompData {
    name: string;
    class: string;

    strengthByComp: { [key in CompType]: number };
}
