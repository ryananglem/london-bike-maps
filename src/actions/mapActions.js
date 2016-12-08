
export const recenterMap = (coords) => ({
    type: "RECENTER_MAP",
    coords
});

export const zoomMap = (zoom) => ({
    type: "ZOOM_MAP",
    zoom
});
