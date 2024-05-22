const generateArray = (n: number): number[] => {
    const array: number[] = [];
    for (let i = 1; i <= n; i++) {
        array.push(i);
    }
    return array;
}

export default generateArray;