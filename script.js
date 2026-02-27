class Experience {
  constructor(containerId, buttonId) {
    this.container = document.querySelector(containerId);
    this.button = document.getElementById(buttonId);
    
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    this.camera.position.z = 120;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(400, 300);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.mouse = new THREE.Vector2();
    this.targetMouse = new THREE.Vector2();

    this.init();
  }

  init() {
    this.addLights();
    this.addMeshes();
    this.bindEvents();
    this.animate();
  }

  addLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambient);
    const point = new THREE.PointLight(0xffffff, 1);
    point.position.set(50, 50, 50);
    this.scene.add(point);
  }

  addMeshes() {
    // Ice cream color palette: Peach/Cream
    const material = new THREE.MeshPhongMaterial({
      color: 0xffe4d1,
      shininess: 80,
      transparent: true,
      opacity: 0
    });

    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(18, 32, 32), material);
    this.torus = new THREE.Mesh(new THREE.TorusGeometry(14, 5, 16, 100), material);
    this.cone = new THREE.Mesh(new THREE.ConeGeometry(10, 20, 32), material);

    this.scene.add(this.sphere, this.torus, this.cone);
    this.resetShapes();
  }

  resetShapes() {
    TweenMax.set([this.sphere.scale, this.torus.scale, this.cone.scale], { x: 0, y: 0, z: 0 });
  }

  updatePosition() {
    const rect = this.button.getBoundingClientRect();
    // Centers the 400x300 canvas on the button
    const x = rect.left + rect.width / 2 - 200;
    const y = rect.top + rect.height / 2 - 150;
    this.container.style.transform = `translate(${x}px, ${y}px)`;
  }

  bindEvents() {
    this.button.addEventListener("mouseenter", () => {
      this.updatePosition();
      this.animateIn();
    });

    this.button.addEventListener("mouseleave", () => this.animateOut());

    window.addEventListener("mousemove", (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("resize", () => this.updatePosition());
  }

  animateIn() {
    const dur = 0.5;
    TweenMax.to([this.sphere.material, this.torus.material, this.cone.material], dur, { opacity: 0.9 });
    
    // Animate to scattered positions around the button
    TweenMax.to(this.sphere.position, dur, { x: -70, y: -40, ease: Back.easeOut });
    TweenMax.to(this.sphere.scale, dur, { x: 1, y: 1, z: 1 });

    TweenMax.to(this.torus.position, dur, { x: 70, y: 45, ease: Back.easeOut });
    TweenMax.to(this.torus.scale, dur, { x: 1, y: 1, z: 1 });

    TweenMax.to(this.cone.position, dur, { x: -50, y: 50, ease: Back.easeOut });
    TweenMax.to(this.cone.scale, dur, { x: 1, y: 1, z: 1 });
  }

  animateOut() {
    const dur = 0.4;
    TweenMax.to([this.sphere.material, this.torus.material, this.cone.material], dur, { opacity: 0 });
    TweenMax.to([this.sphere.position, this.torus.position, this.cone.position], dur, { x: 0, y: 0 });
    TweenMax.to([this.sphere.scale, this.torus.scale, this.cone.scale], dur, { x: 0, y: 0, z: 0 });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smoothing mouse rotation
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;

    this.camera.position.x = this.mouse.x * 20;
    this.camera.position.y = this.mouse.y * 20;
    this.camera.lookAt(this.scene.position);

    // Constant rotation for flavor
    this.torus.rotation.y += 0.01;
    this.sphere.rotation.x += 0.01;
    
    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when the script loads
new Experience(".btn-3d-container", "exploreBtn"); 