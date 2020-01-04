
export interface Converter<T, U> {    
    convertInbound?: (dtoObject: T) => U;
    convertInboundCollection?: (dtoObject: T[]) => U[];
    convertOutbound?: (businessObject: U) => T;
    convertOutboundCollection?: (businessObject: U[]) => T[];
}