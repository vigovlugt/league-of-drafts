import { Role } from "@league-of-drafts/league-of-drafts";
import TopIcon from "../components/icons/roles/TopIcon";
import JungleIcon from "../components/icons/roles/JungleIcon";
import MidIcon from "../components/icons/roles/MidIcon";
import BottomIcon from "../components/icons/roles/BottomIcon";
import SupportIcon from "../components/icons/roles/SupportIcon";

export function getRoleIconByRole(role) {
    return {
        [Role.Top]: TopIcon,
        [Role.Jungle]: JungleIcon,
        [Role.Mid]: MidIcon,
        [Role.Bottom]: BottomIcon,
        [Role.Support]: SupportIcon,
    }[role];
}
