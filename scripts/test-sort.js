
const desiredOrder = [
    "Frontend",
    "Core Frontend Concepts",
    "Languages",
    "Databases & Cache",
    "Tools & Platforms"
];

const keys = [
    "Frontend",
    "Languages",
    "Core Frontend Concepts",
    "Databases & Cache",
    "Tools & Platforms"
];

console.log("Original keys:", keys);

const sorted = keys.sort((a, b) => {
    const normalize = (s) => s.toLowerCase().trim();
    const indexA = desiredOrder.findIndex(order => normalize(order) === normalize(a));
    const indexB = desiredOrder.findIndex(order => normalize(order) === normalize(b));

    console.log(`Comparing '${a}' (${indexA}) vs '${b}' (${indexB})`);

    // If both are in the list, sort by index
    if (indexA !== -1 && indexB !== -1) {
        console.log(`Both in list: ${indexA} - ${indexB} = ${indexA - indexB}`);
        return indexA - indexB;
    }
    // If one is in the list, the one in the list comes first
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    // If neither is in the list, sort naturally
    return a.localeCompare(b);
});

console.log("Sorted keys:", sorted);
