import React from "react"
import { Solution } from "../interfaces"
import { References } from "../References"
import { AsinoGroupReference } from "../types/Group";

export const drawGroup = (groups: (AsinoGroupReference | undefined)[], references: References, solution: Solution, key: string): JSX.Element => {
  return <g key={key}>

  </g>;
}
