let scanner = new Instascan.Scanner({ video: document.getElementById('preview'),
   continuous: true,
   mirror: true,
   captureImage: true,
   backgroundScan: true,
   refractoryPeriod: 10000,
   scanPeriod: 15 
});

scanner.addListener('scan', function (content) {
   alert(content)
});
 
let cameraList = []; 
 
Instascan.Camera.getCameras().then(function (cameras, image) {
   this.cameraList = cameras;
   cameras.forEach(element => {
      let cameraList = document.getElementById("cameras");
      let option = document.createElement("option");
      option.text = element.id;
      option.value = element.id;
      cameraList.add(option);
      scanner.start(cameras[0])
   });
}).catch(() => console.error(e));
 
document.getElementById("cameras").addEventListener("change", event => {
   scanner.start(this.cameraList.find(c => c.id == event.target.value));
})
