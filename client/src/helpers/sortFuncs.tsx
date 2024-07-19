const sortTypeFunc = (a: any, b: any, sortType: string) => sortType === "asc" ? b - a : a - b;
const sortTypeStringFunc = (a: string, b: string, sortType: string) => sortType === "asc" ? b.localeCompare(a) : a.localeCompare(b);

export {
    sortTypeFunc, 
    sortTypeStringFunc
}