// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFzc2FubWFrMjkiLCJhIjoiY2t4Z25ncHM3MXU1azJvcGRicWs5aDUzaSJ9.c4PNr8Oz3SkiPt5oQRfeiA";

const Map = ({ tour }) => {
  const locations = tour.locations;

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/hassanmak29/ckxgo6rad4fxb14oexkpe9lxl",
      scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      // Create marker
      const el = document.createElement("div");
      el.className = "marker";

      //   Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(loc.coordinates)
        .addTo(map.current);

      // Add popup
      new mapboxgl.Popup({
        offset: 30,
        focusAfterOpen: false,
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map.current);

      //   Exrtend the map bounds to include the current location
      bounds.extend(loc.coordinates);
    });

    map.current.fitBounds(bounds, {
      padding: {
        top: 180,
        bottom: 100,
        left: 100,
        right: 100,
      },
    });
  });
  return (
    <section className="section-map">
      <div ref={mapContainer} className="map-container"></div>
    </section>
  );
};

export default Map;
