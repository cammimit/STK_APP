"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catsById = exports.exampleCats = void 0;
exports.exampleCats = [
    {
        id: 1,
        name: 'Tony Iommi',
        breed: 'British Shorthair',
        gender: 'male',
        age: 71
    },
    {
        id: 2,
        name: 'Ozzy Osbourne',
        breed: 'British Semi-longhair',
        gender: 'male',
        age: 70
    },
    {
        id: 3,
        name: 'Geezer Butler',
        breed: 'British Longhair',
        gender: 'male',
        age: 69
    },
    {
        id: 4,
        name: 'Bill Ward',
        breed: 'Burmilla',
        gender: 'male',
        age: 70
    },
    {
        id: 5,
        name: 'Sharon Osbourne',
        breed: 'Bambino',
        gender: 'female',
        age: 66
    }
];
exports.catsById = exports.exampleCats.reduce(function (catzById, currentCat) {
    catzById[currentCat.id] = currentCat;
    return catzById;
}, {});
//# sourceMappingURL=exampleCats.js.map