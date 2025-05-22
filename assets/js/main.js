const swiper = new Swiper(".swiper", {
  spaceBetween: 20,
  direction: "horizontal",
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  slidesPerView: "auto",
  freeMode: true,
});

initMap();

async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } =
    ymaps3;

  const { YMapDefaultMarker } = await ymaps3.import(
    "@yandex/ymaps3-markers@0.0.1"
  );

  fetch("/assets/maps.json")
    .then((response) => response.json())
    .then((data) => {
      const map = new YMap(
        document.getElementById("contacts__map"),
        {
          location: {
            center: [27.758805, 53.931276],
            zoom: 16,
          },
        },
        [
          new YMapDefaultSchemeLayer({
            customization: data,
          }),
          new YMapDefaultFeaturesLayer({}),
        ]
      );

      const container = document.createElement("div");
      container.className = "image-container";
      const image = document.createElement("img");
      image.className = "image";
      image.src =
        "data:image/png;base64,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";
      image.alt = "Маркер на карте";
      container.appendChild(image);

      map.addChild(
        new YMapMarker(
          {
            coordinates: [27.758805, 53.931276],
            draggable: false,
            mapFollowsOnDrag: true,
          },
          container
        )
      );

      map.addChild(new YMapDefaultSchemeLayer({ customization: data }));
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}
