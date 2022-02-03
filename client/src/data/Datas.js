const continent = [
    {key:1, _id:1, value:"Africa", name:"Africa"},
    {key:2, _id:2, value:"Europe", name:"Europe"},
    {key:3, _id:3, value:"Asia", name:"Asia"},
    {key:4, _id:4, value:"NorthAmerica", name:"NorthAmerica"},
    {key:5, _id:5, value:"SouthAmerica", name:"SouthAmerica"},
    {key:6, _id:6, value:"Austraila", name:"Austraila"},
    {key:7, _id:7, value:"Antarctica", name:"Antarctica"}
];

const price = [
    {_id:0, name:"Any"                , array:[]},
    {_id:1, name:"￦1 ~ 20,000"       , array:[     1, 20000]},
    {_id:2, name:"￦20,000 ~ 50,000"  , array:[ 20000, 50000]},
    {_id:3, name:"￦50,000 ~ 80,000"  , array:[ 50000, 80000]},
    {_id:4, name:"￦80,000 ~ 120,000" , array:[ 80000,120000]},
    {_id:5, name:"￦120,000 ~ 180,000", array:[120000,180000]},
    {_id:6, name:"￦180,000 ~"        , array:[180000,     0]}
];

const switches = [
    {key:1, _id:1, name:"청축", value:"blue"},
    {key:2, _id:2, name:"갈축", value:"brown"},
    {key:3, _id:3, name:"적축", value:"red"},
    {key:4, _id:4, name:"흑축", value:"black"},
    {key:5, _id:5, name:"기타", value:"etc"}
];

const connects = [
    {key:1, _id:1, name:"유선"  , value:"wired"},
    {key:2, _id:2, name:"무선"  , value:"bluetooth"},
    {key:3, _id:3, name:"유무선", value:"both"}
];

const contacts = [
    {key:1, _id:1, name:"기계식"  , value:"mechanical"},
    {key:2, _id:2, name:"멤브레인", value:"membrane"},
    {key:3, _id:3, name:"무접점"  , value:"noContact"}
];

export {
    continent,
    price,
    switches,
    connects,
    contacts
}