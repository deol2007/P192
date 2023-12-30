AFRAME.registerComponent("markerHandler", {
  schema: {
    piecesArray: {
      type: "array",
      default: {},
    },
  },
  
  init: async function () { 
    var works = await this.getPieces();

    this.el.addEventListener("markerFound", () => {
      var pieceName = this.el.getAttribute("piece_name");
      var barcodeValue = this.el.getAttribute("barcode_value");
      piecesArray.push({
        piece_name: pieceName,
        barcode_value: barcodeValue,
      });

      var work = document.querySelector(`#${pieceName}-${barcodeValue}`);
      work.setAttribute("visible", true);
    });

    this.el.addEventListener("markerLost", () => {
      var pieceName = this.el.getAttribute("piece_name");
      var index = piecesArray.findIndex((x) => x.piece_name === pieceName);
      if (index > -1) {
        piecesArray.splice(index, 1);
      }
    });
  },

  getPieces: function () {
    return fetch("js/collectionList.json")
      .then((res) => res.json())
      .then((data) => data);
  },
});
