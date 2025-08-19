"use client";

import React, { useEffect, useState } from 'react'
import styles from "./style.module.css";
import { MapComponent } from '../Map/MapComponent';

interface ICoordinates {
    name: string;
    coordinates: [number, number];
    address: string;
    time: string;
}

const coordinatesData: ICoordinates[] = [
    {
        name: "Магазин №1",
        address: "г. Уссурийск ул. Володарского 9",
        time: "Пн-Пт 09:00-18:00",
        coordinates: [43.791280, 131.939303]
    },
    {
        name: "Магазин №2",
        address: "г. Уссурийск ул. Кирова 18",
        time: "Пн-Пт 09:00-18:00",
        coordinates: [43.811423, 131.950684]
    },
]

// функция получает координаты и возвращает объект с адресом
async function getUserLocation(lat: number, lon: number) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const Partners = () => {
    const [coordinates, setCoordinates] = useState<ICoordinates[]>([]); // состояние для хранения координат партнеров
    const [userLocation, setUserLocation] = useState({
        coordinates: { lat: 0, lng: 0 },
        address: "",
        state: ''
    }); // состояние для хранения координат и адреса пользователя

    useEffect(() => { setCoordinates(coordinatesData) }, [coordinates]);

    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
    });

    useEffect(() => {
        if (!("geolocation" in navigator)) return;

        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                loaded: true,
                coordinates: { lat: position.coords.latitude, lng: position.coords.longitude }
            });
        });
    }, []);

    // функция обработчик нажатия на кнопку и получение координат пользователя
    const handleButtonClick = async () => {
        const userLocation = await getUserLocation(location.coordinates.lat, location.coordinates.lng);
        setUserLocation({
            coordinates: { lat: userLocation.lat, lng: userLocation.lon },
            address: userLocation.address.city,
            state: userLocation.address.state
        });
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Наши партнеры</h2>
            <p>Ознакомьтесь с нашими партнерами и найдите ближайший к вам магазин</p>

            <button
                onClick={() => handleButtonClick()}
                className={styles.button}
            >
                Найти ближайший магазин
            </button>

            {userLocation?.address && (
                <div>
                    <p>Вы находитесь в месте: </p>
                    <p>Город: {userLocation.address}</p>
                    <p>Регион/область: {userLocation.state}</p>
                </div>
            )}

            <MapComponent coordinates={coordinates} />

            {location.loaded && (
                <div>
                    <p>Latitude: {location.coordinates.lat}</p>
                    <p>Longitude: {location.coordinates.lng}</p>
                </div>
            )}
        </section>
    );
};