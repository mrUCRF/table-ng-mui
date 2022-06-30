export type PartitionData = {
    value: number | string
    // dateRelease: string
}

export interface TestDataType {
    [region: string]: {
        G: {
            [year: number]: {
                XX: PartitionData;
                YY: PartitionData;
                ZZ: PartitionData;
            }}}}
