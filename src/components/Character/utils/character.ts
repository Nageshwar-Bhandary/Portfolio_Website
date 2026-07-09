import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const nameLower = child.name.toLowerCase();
                const matNameLower = (child.material?.name || "").toLowerCase();

                // Only color skin and dress:
                // 1. Skin (User requested #E5b887)
                if (nameLower.includes("skin") || nameLower.includes("face") || nameLower.includes("head") || nameLower.includes("arm") || nameLower.includes("hand") || nameLower.includes("body") || matNameLower.includes("skin") || matNameLower.includes("face")) {
                  child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#E5b887"),
                    roughness: 0.6,
                    metalness: 0.0,
                  });
                }
                // 2. Shirt / Dress Top (Navy Blue #02075D)
                else if (nameLower.includes("shirt") || nameLower.includes("cloth") || nameLower.includes("top") || nameLower.includes("torso") || matNameLower.includes("shirt") || matNameLower.includes("cloth") || matNameLower.includes("top")) {
                  child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#02075D"),
                    roughness: 0.65,
                    metalness: 0.05,
                  });
                }
                // 3. Pants / Dress Bottom (Black #000000)
                else if (nameLower.includes("pant") || nameLower.includes("leg") || nameLower.includes("bottom") || matNameLower.includes("pant") || matNameLower.includes("leg")) {
                  child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#000000"),
                    roughness: 0.7,
                    metalness: 0.02,
                  });
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
