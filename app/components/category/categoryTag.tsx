import { CATEGORY_DEFAULT_COLOR } from "@/app/help/constants";
import { getCategoryBgColorAndColor } from "@/app/lib/utils";
import { Chip } from "@mui/joy";


export default function CategoryTag({name, color}: {name?: string, color?: string}) {

    return (
        <Chip sx={{fontSize: "12px", bgcolor: getCategoryBgColorAndColor(color ?? CATEGORY_DEFAULT_COLOR).bgcolor, color: getCategoryBgColorAndColor(color ?? CATEGORY_DEFAULT_COLOR).color }}>{name}</Chip>
    );
} 