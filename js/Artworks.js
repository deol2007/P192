AFRAME.registerComponent("works", {
  init: async function () {
    var collection = await this.getCollection();

    var barcodes = Object.keys(collection);

    barcodes.map((barcode) => {
      var piece = collection[barcode];
      this.createPieces(piece);
    });
  },
  getCollection: function () {
    return fetch("js/collectionList.json")
      .then((res) => res.json())
      .then((data) => data);
  },

  createPieces: async function (piece) {
    var pieceName = piece.piece_name;
    var fileName = piece.file_name;
    var barcodeValue = piece.barcode_value;

    var scene = document.querySelector("a-scene");

    var marker = document.createWork("a-marker");

    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("piece_name", pieceName);
    marker.setAttribute("file_name", fileName);
    marker.setAttribute("value", barcodeValue);

    scene.appendChild(marker);

    var work = document.createWork("a-entity");
    work.setAttribute("id", `${pieceName}-${barcodeValue}`);
    marker.appendChild(work);

    var card = document.createWork("a-entity");
    card.setAttribute("id", `card-${pieceName}`);
    card.setAttribute("description", `card-${description}`)
    card.setAttribute("geometry", {
      primitive: "plane",
      width: 1,
      height: 1,
    });

    card.setAttribute("material", {
      src: `./assets/artwork_cards/${fileName}`,
    });
    card.setAttribute("position", { x: 0, y: 0, z: 0 });
    card.setAttribute("rotation", { x: 0, y: 0, z: 0 });

    work.appendChild(card);
  },
});