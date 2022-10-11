export interface TableHeader {
    id: string |'sl'|'action', //'name' | 'code' | 'population' | 'size' | 'density'
    label: string,
    minWidth?: number,
    headerAlign?: 'center'|'right'
    dataAlign?: 'center'|'right'
    format?: (value: number) => string
  }

 