import React, { useEffect, useState } from "react";
const { kakao } = window;

function Map(x, y, mapId) {
  useEffect(() => {

    const container = document.getElementById(mapId);
    const option = {
      center: new kakao.maps.LatLng(x, y), 
      level: 3,
    };
    const map = new kakao.maps.Map(container, option);
    const markerPosition = new kakao.maps.LatLng(x, y);

    const zoomControl = new kakao.maps.ZoomControl();
    
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });

    // const iwContent = `<div style="padding:5px 21px;text-align:center">${loctionInfo}</div>`,
      
    // iwPosition = new kakao.maps.LatLng(x, y); 

    // const infowindow = new kakao.maps.InfoWindow({
    //     position : iwPosition, 
    //     content : iwContent 
    // });

    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    map.setZoomable();
    marker.setMap(map);

    // infowindow.open(map, marker);
  }, [])

  return (
    <>
      <div id={mapId} className="kakaoMap"></div>
    </>
  )
}

export default Map;