import {SxProps} from "@mui/material";

export const filterButtonContainerSX: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

export const getListItemSX = (isDone: boolean): SxProps => ({
    p: 0,
    justifyContent: "space-between",
    alignItems: "center",
    opacity: isDone ? 0.5 : 1
})