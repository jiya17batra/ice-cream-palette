const flavors = [
    { 
        name: "Vanilla", 
        image: "van.png", 
        desc: "A smooth, creamy, and delicately sweet classic.", 
        bg: "#fdf5e6", 
        accent: [243, 229, 171] 
    },
    { 
        name: "Pistachio", 
        image: "pi.png", 
        desc: "A creamy, nutty, and refreshingly smooth.", 
        bg: "#f0fff0", 
        accent: [208, 232, 208] 
    },
    { 
        name: "Blueberry", 
        image: "bl.png", 
        desc: "A juicy, vibrant scoop bursting with fruit flavor.", 
        bg: "#f0f0ff", 
        accent: [209, 209, 249] 
    },
    { 
        name: "Strawberry", 
        image: "st.png", 
        desc: "A sweet, juicy, and delightfully fresh.", 
        bg: "#fff0f3", 
        accent: [252, 220, 226] 
    },
    { 
        name: "Chocolate", 
        image: "ch.png", 
        desc: "A rich, smooth, and deeply indulgent.", 
        bg: "#f5ebe0", 
        accent: [213, 189, 175] 
    }
];

let points = [];
let currentAccent = flavors[0].accent;

function setup() {
    createCanvas(windowWidth, windowHeight);
    resetPoints();
    initUI();
}

function draw() {
    stroke(currentAccent[0], currentAccent[1], currentAccent[2], 80);
    strokeWeight(4);
    noFill();
    beginShape();
    points.forEach(p => {
        vertex(p[0], p[1]);
        p[1] += noise(frameCount / 100 + p[0] / 50) * 3;
    });
    endShape();
}

function resetPoints() {
    points = [];
    for (let i = 0; i < width; i += 4) points.push([i, -20]);
}

function initUI() {
    const container = document.getElementById('thumb-container');
    flavors.forEach((f, i) => {
        const box = document.createElement('div');
        box.className = 'thumb-box' + (i === 0 ? ' active' : '');
        box.id = `thumb-${i}`;
        
        const img = document.createElement('img');
        // FIXED: Now uses the 'image' property from your array
        img.src = f.image; 
        
        box.onclick = () => updateUI(i);
        box.appendChild(img);
        container.appendChild(box);
    });
}

function updateUI(index) {
    const f = flavors[index];
    
    document.getElementById('flavor-title').innerText = f.name;
    document.getElementById('flavor-desc').innerText = f.desc;
    
    // FIXED: Now uses the 'image' property from your array
    document.getElementById('main-scoop').src = f.image; 
    
    document.body.style.backgroundColor = f.bg;
    
    document.querySelectorAll('.thumb-box').forEach(box => box.classList.remove('active'));
    document.getElementById(`thumb-${index}`).classList.add('active');
    
    clear();
    currentAccent = f.accent;
    resetPoints();
}