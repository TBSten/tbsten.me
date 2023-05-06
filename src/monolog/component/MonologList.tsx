import { FC } from "react";
import { Monolog, UpdateMonolog } from "../type";
import MonologListItem from "./MonologListItem";

interface MonologListProps {
    monologList: Monolog[]
    editable?: boolean
    onChange?: (slug: string, input: UpdateMonolog) => void
    changingSlug?: string | undefined
    onDelete?: (slug: string) => void
    deletingSlug?: string | undefined
}
const MonologList: FC<MonologListProps> = ({
    monologList, editable = false,
    onChange, onDelete,
    changingSlug, deletingSlug,
}) => {
    return (
        <div>
            {monologList.map(monolog =>
                <MonologListItem key={monolog.slug}
                    monolog={monolog}
                    editable={editable}
                    onDelete={() => onDelete?.(monolog.slug)}
                    onChange={(input) => onChange?.(monolog.slug, input)}
                    isChanging={changingSlug === monolog.slug}
                    isDeleting={deletingSlug === monolog.slug}
                />
            )}
        </div>
    );
}

export default MonologList;
