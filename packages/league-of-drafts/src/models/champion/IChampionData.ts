import CompType from "../CompType";
import Role from "../Role";
import IStats from "./IStats";

export default interface IChampionData {
    id: string;
    key: string;
    name: string;

    class: string;

    strengthByComp: { [key in CompType]: number };

    statsByRole: { [key in Role]?: IStats };
}
