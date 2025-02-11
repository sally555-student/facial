async function setup() {
    // Charger les modèles face-api.js
    await faceapi.nets.ssdMobilenetv1.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights');
    console.log("Modèle chargé !");

    // Activer la webcam
    const video = document.getElementById('videoElement');
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => console.error("Erreur de caméra : " + err));

    // Détecter les visages dans la vidéo
    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
            canvas?.clear();
            canvas?.render(detections);
        }, 100);
    });
}

setup();
