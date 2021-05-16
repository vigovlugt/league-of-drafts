import CompType from "./CompType";
import Role from "./Role";
import IStats from "./IStats";
import Class from "./Class";

export default interface IChampionData {
    id: string;
    key: string;
    name: string;

    class: Class;

    strengthByComp: { [key in CompType]: number };

    statsByRole: { [key in Role]?: IStats };
}
