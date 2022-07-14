
let scanner = new Instascan.Scanner({ video: document.getElementById('preview'),
//Eldeki görüntüde sürekli QRCode taraması yapılıp yapılmamasını belirler.
continuous: true,
mirror: true,
//Tarama neticesinde okunan QRCode verisinin görüntüsünü sonuca dahil
//ederek ikinci paramere(image) iletir. Varsayılan false değerindedir.
captureImage: true,
backgroundScan: true,
//Taranan bir QRCode'un bulunduğu görüntüde kaç saniye aralıkla
//tekrar taranacağını belirtir. Burada 10 saniye olarak belirlenmiştir.
refractoryPeriod: 10000,
//Tarama görüntüsünde kaç karenin taranacağını belirler.
scanPeriod: 15 });

scanner.addListener('scan', function (content) {
   //Barkod okunduğunda veriyi burası yakalayacaktır.
   alert(content)
});
 
let cameraList = []; //Tüm kameraları tutacağımız liste.
 
Instascan.Camera.getCameras().then(function (cameras, image) {
   //PC'de ki tüm kameraları algılayarak bizlere getirecektir.
   this.cameraList = cameras;
   cameras.forEach(element => {
      //Gelen kameralar select elementinde listelenmektedir.
      let cameraList = document.getElementById("cameras");
      let option = document.createElement("option");
      option.text = element.id;
      option.value = element.id;
      cameraList.add(option);
      scanner.start(cameras[0])
   });
}).catch(() => console.error(e));
 
document.getElementById("cameras").addEventListener("change", event => {
   //Select elementinde seçilen kamerayı qr code scanner olarak belirleyen olaydır.
   scanner.start(this.cameraList.find(c => c.id == event.target.value));
})
