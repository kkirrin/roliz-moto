'use client'

import React, { useEffect, useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './style.module.css';

interface ICoordinates {
    name: string;
    coordinates: [number, number];
    address: string;
    time: string;
}

interface MapComponentProps {
    coordinates: ICoordinates[];
    center: [number, number];
}

export const MapComponent = ({ coordinates, center }: MapComponentProps) => {
    const [activePortal, setActivePortal] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number]>(center);

    useEffect(() => {
        setMapCenter(center);
    }, [center]);

    console.log('mapCenter', mapCenter);

    return (
        <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YANDEX_KEY, load: 'package.full' }}>
            <div className={styles.map}>
                <Map
                    defaultState={{ center: mapCenter, zoom: 12 }}
                    style={{ height: "100%" }}
                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                >
                    {coordinates.map((item, index) => (
                        <Placemark
                            key={index}
                            defaultGeometry={item.coordinates}
                            options={
                                {
                                    // preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                                    // iconColor: 'green', // цвет иконки, можно также задавать в hex
                                }}
                            properties={
                                {
                                    iconContent: '', // пару символов помещается
                                    hintContent: `<span> ${item.name} </span>`,
                                    // создаём пустой элемент с заданными размерами
                                    balloonContent: `<div id="driver-2" class="driver-card">
                                            <h3> ${item.name} </h3>
                                            <p> ${item.address} </p>
                                            <p> ${item.time} </p>
                                        </div>`,
                                }}
                            onClick={() => {
                                // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                                setTimeout(() => { setActivePortal(true) }, 0)
                            }}
                        />
                    ))}
                </Map>
            </div>
        </YMaps >
    )
}