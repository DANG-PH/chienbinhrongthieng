if (!localStorage.getItem("demoDataLoaded")) {
    const demoUsers = [
    {
    username: "👑 Dang Hai",
    email: "admin",
    password:"1",
    kimcuong:9999999,
    history: [
        {
        "time": "2006-09-27T17:00:00.315Z",
        "zeni": 9999999,
        "vnd": 0,
        }
    ],
    "thanhTich": [
        "rongvang",
        "vipmax",
        "hunter10",
        "hunter17",
        "login5",
        "login15"
    ],
    "items": [
        {
        "id": "halo1",
        "code": "DANGHAI1",
        "gia": 20000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "shield1",
        "code": "DANGHAI2",
        "gia": 30000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "skinKaioken",
        "code": "DANGHAI3",
        "gia": 50000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "petRong",
        "code": "DANGHAI4",
        "gia": 80000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "startHP",
        "code": "DANGHAI5",
        "gia": 100000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "emoVIP",
        "code": "DANGHAI6",
        "gia": 25000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "skinVegetaBlue",
        "code": "DANGHAI7",
        "gia": 70000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "x2Zeni48h",
        "code": "DANGHAI8",
        "gia": 20000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip1gift",
        "code": "DANGHAIvip1",
        "gia": 0,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip2gift",
        "code": "DANGHAIvip2",
        "gia": 0,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip3gift",
        "code": "DANGHAIvip3",
        "gia": 0,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip4gift",
        "code": "DANGHAIvip4",
        "gia": 30000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip5gift",
        "code": "DANGHAIvip5",
        "gia": 50000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip6gift",
        "code": "DANGHAIvip6",
        "gia": 80000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip7gift",
        "code": "DANGHAIvip7",
        "gia": 100000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip8gift",
        "code": "DANGHAIvip8",
        "gia": 150000,
        "time": "00:00:00 28/9/2006"
        },
        {
        "id": "vip10gift",
        "code": "ChienBinhRongThieng",
        "gia": 300000,
        "time": "00:00:00 28/9/2006"
        }
    ]
    },
    {
    username: "Dũnggg",
    email: "vip2@demo.cbrt",
    history: [{ zeni: 50000 }],
    },
    {
    username: "Saidepchiu",
    email: "vip3@demo.cbrt",
    history: [{ zeni: 158250 }],
    },

    {
    username: "LD Thànhh",
    email: "vip4@demo.cbrt",
    history: [{ zeni: 200000 }],
    },
    {
    username: "Huy Quang",
    email: "vip5@demo.cbrt",
    history: [{ zeni: 327500 }],
    },
    {
    username: "LQC-Nopee",
    email: "vip6@demo.cbrt",
    history: [{ zeni: 482750 }],
    },
    {
    username: "Hẹ Hẹ Hẹ",
    email: "vip7@demo.cbrt",
    history: [{ zeni: 32250 }],
    },
    {
    username: "chillboy",
    email: "vip8@demo.cbrt",
    history: [{ zeni: 124250 }],
    },
    {
    username: "admin",
    email: "vip9@demo.cbrt",
    history: [{ zeni: 1250 }],
    },
];

const Users = JSON.parse(localStorage.getItem("users")) || [];
const allUsers = [...Users, ...demoUsers];
localStorage.setItem("users", JSON.stringify(allUsers));
localStorage.setItem("demoDataLoaded", "true"); 
}