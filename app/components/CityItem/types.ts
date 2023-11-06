import { City } from "../types"

export type CityItemProps = {
    area: City
    onSelect: (name: string) => void
    onDeselect: (name: string) => void
}