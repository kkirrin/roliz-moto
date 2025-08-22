'use client'

import Image from 'next/image'

import { useEffect, useState, useRef } from 'react'
import { useMain, useStater } from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import { useRouter } from 'next/navigation';

import styles from '@/app/css/search.module.css'
import Link from 'next/link'
import { useGetProductsQuery } from "@/redux/api/products.api";

export const SearchForm = ({ }) => {

    const [text, setText] = useState('');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(false)

    const { widthScreen, mobile } = useMain('main');

    const router = useRouter();
    const debounceTimeout = useRef(null);


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') return;
        // Редирект
        router.push(`/routes/pages/search?query=${encodeURIComponent(text.trim())}`);

        setIsFocused(false);
    };

    const handleKeyUp = (e) => {
        e.preventDefault();

        if (e.key === "Enter") {
            // Редирект
            router.push(`/routes/pages/search?query=${encodeURIComponent(text.trim())}`);
            setIsFocused(false);
        }
    }

    function goToResult() {
        setTimeout(() => {
            setResults([]);
            setText('');
        }, 100)
    }

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
        }

        if (text.trim() === '') {
            setResults([])
            return
        }

        let tempText = text
        let tempLetter = `${tempText[0]}`.toUpperCase()
        tempText = tempLetter + tempText.slice(1)
        // console.log("tempText", tempText)

        setLoading(true);
        debounceTimeout.current = setTimeout(async () => {
            try {
                const fetchSearch = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_SEARCH}?filters[$and][0][stock][$gte]=1&filters[$and][1][title][$startsWith]=${tempText}&sort[0]=title:asc`, {
                    headers: {
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`
                    }
                })
                const result = await fetchSearch.json();

                setResults(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка загрузки Объектов:', error)
                setLoading(false);
            }
        }, 1000)

        return () => clearTimeout(debounceTimeout.current)

    }, [text])

    if (!mobile) {
        return (
            <section className={`${styles.searchContainer}`}>
                <div className={`${styles.searchForm}`}>
                    <input
                        type='text'
                        onKeyUp={handleKeyUp}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 1000)} // задержка, чтобы кликнуть по элементу
                        placeholder='Введение название товара...'
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                    />

                    <button className={styles.submit} type="submit" onClick={handleSearchSubmit}>
                        <Image
                            src={'/graySearchIcon.svg'}
                            alt={'Иконка поиска'}
                            width={30}
                            height={30}
                        />
                    </button>
                </div>

                {
                    isFocused && (
                        <ul className={`${styles.searchResultsContainer}`}>
                            {text.trim() === '' && <li>Начните печатать</li>}
                            {loading && <span className="loader loader-search">Загрузка...</span>}
                            {!loading && results.length === 0 && text.trim() !== '' && (
                                <li>Ничего не найдено</li>
                            )}
                            {
                                !loading &&
                                results.map((item, index) => {
                                    return (
                                        <li key={`resultSearch_key_${index}_${item.id}`}>
                                            <Link key={`resultSearch_key_${index}_${item.id}`} onClick={() => goToResult()} className={`${styles.resultItem}`} href={`/routes/shop/products/${item.id}`}>
                                                <h3>{item.attributes.title}</h3>
                                                <p>{(item.attributes.price) ? item.attributes.price : 'Нет цены'}</p>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </section>
        )
    } else {
        return (
            <section className={`${styles.searchContainer}`}>
                <div
                    onClick={() => {
                        setShowInput(!showInput)
                    }}
                    className={`${styles.searchForm}`}>
                    <div className={`${styles.searchIcon}`} >
                        <Image unoptimized src={'/graySearchIcon.svg'} alt={'Иконка поиска'} fill />
                    </div>
                </div>
                <article className={`${styles.inputMobileContainer} ${(showInput) ? styles.showInputMobile : styles.hideInputMobile}`}>
                    <input type='text' placeholder='Введение название товара...' value={text} onChange={(e) => {
                        setText(e.target.value)
                    }} />
                    {
                        (results && Array.isArray(results) && typeof results[0] != "undefined") ?
                            <section className={`${styles.searchResultsContainer}`}>
                                {
                                    (results) ?
                                        results.map((item, index) => {
                                            return (
                                                <Link key={`resultSearch_key_${index}_${item.id}`} onClick={() => goToResult()} className={`${styles.resultItem}`} href={`/routes/shop/products/${item.id}`}>
                                                    <h3>{item.attributes.title}</h3>
                                                    <p>{(item.attributes.price) ? item.attributes.price + " ₽" : 'Нет цены'}</p>
                                                </Link>
                                            )
                                        })
                                        : null
                                }
                            </section>
                            : null
                    }
                </article>

            </section>
        )
    }

}
