// Types
import { DisplayColumnType } from "@shared/types/table.type";

export interface DisplayColumn {
    key      : string;
    name     : string;
    sortable?: boolean;
    type?    : DisplayColumnType;
}
