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
    {
        name: "Магазин в Питере",
        address: "г. Санкт-Петербург ул. Ленина 10",
        time: "Пн-Пт 09:00-18:00",
        coordinates: [60.000000, 30.000000]
    }
]

// функция принимает координаты юзера и возвращает объект с адресом
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
    // состояние для хранения координат партнеров
    const [coordinates, setCoordinates] = useState<ICoordinates[]>([]);

    // состояние для хранения координат и адреса пользователя полученых от API
    const [userLocation, setUserLocation] = useState({
        coordinates: { lat: 0, lng: 0 },
        address: "",
        state: ''
    });

    // состояние для хранения координат пользователя полученых от браузера
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
    });

    // состояние для хранения координать центра карты
    const [center, setCenter] = useState<[number, number]>([43.811423, 131.950684]);

    // первая отрисовка страницы
    useEffect(() => {
        if (!("geolocation" in navigator)) return;

        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                loaded: true,
                coordinates: { lat: position.coords.latitude, lng: position.coords.longitude }
            });
        });
    }, []);

    useEffect(() => { setCoordinates(coordinatesData) }, [coordinates]);

    // функция обработчик нажатия на кнопку и получение координат пользователя
    const handleButtonClick = async () => {
        if (!location.loaded) {
            alert("Геолокация не поддерживается вашим браузером или не включена");
            return;
        };

        const userLocation = await getUserLocation(location.coordinates.lat, location.coordinates.lng);
        setUserLocation({
            coordinates: { lat: userLocation.lat, lng: userLocation.lon },
            address: userLocation.address.city,
            state: userLocation.address.state
        });
    }

    // Функция для обработки изменения выбора магазина
    const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStoreName = event.target.value;
        if (selectedStoreName) {
            const selectedStore = coordinates.find(store => store.name === selectedStoreName);
            if (selectedStore) {
                setCenter([selectedStore.coordinates[0], selectedStore.coordinates[1]]);
            }
        }
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Наши партнеры</h2>
            <p>Ознакомьтесь с нашими партнерами и найдите ближайший к вам магазин</p>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => handleButtonClick()}
                    className={styles.button}
                >
                    {location.loaded ? "Найти ближайший магазин" : "Геолокация не включена"}
                </button>

                {userLocation?.address && (
                    <p>Определенна локация: {userLocation.state}, {userLocation.address}</p>
                )}
            </div>
            <div className="flex items-center gap-4">
                <select
                    className={styles.button}
                    onChange={handleStoreChange}
                    defaultValue=""
                >
                    <option value="">Выбрать магазин вручную</option>
                    {coordinates.map((item) => (
                        <option
                            key={item.name}
                            value={item.name}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <MapComponent coordinates={coordinates} center={center} />

            {/* {location.loaded && (
                <div>
                    <p>Latitude: {location.coordinates.lat}</p>
                    <p>Longitude: {location.coordinates.lng}</p>
                </div>
            )} */}
        </section>
    );
};