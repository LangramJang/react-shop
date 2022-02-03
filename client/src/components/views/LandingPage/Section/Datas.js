const continent = [
    {"_id": 1,"name": "Africa"},
    {"_id": 2,"name": "Europe"},
    {"_id": 3,"name": "Asia"},
    {"_id": 4,"name": "NorthAmerica"},
    {"_id": 5,"name": "SouthAmerica"},
    {"_id": 6,"name": "Austraila"},
    {"_id": 7,"name": "Antarctica"}
];

const price = [
    {"_id":0, "name": "Any", "array": []},
    {"_id":1, "name": "$1 ~ $199", "array": [1, 199]},
    {"_id":2, "name": "$200 ~ $399", "array": [200, 399]},
    {"_id":3, "name": "$400 ~ $599", "array": [400, 599]},
    {"_id":4, "name": "$600 ~ $799", "array": [600, 799]},
    {"_id":5, "name": "$800 ~ $999", "array": [800, 999]},
    {"_id":6, "name": "$1000 ~", "array": [1000, 0]}
]

export {
    continent,
    price
}