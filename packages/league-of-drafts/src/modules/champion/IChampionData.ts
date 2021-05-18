import CompType from "../comptype/CompType";
import Role from "./Role";
import IStats from "../common/models/IStats";
import Class from "./Class";

export default interface IChampionData {
    readonly id: string;
    readonly key: string;
    readonly name: string;

    readonly class: Class;

    readonly strengthByComp: { [key in CompType]: number };

    readonly statsByRole: { [key in Role]?: IStats };
}
