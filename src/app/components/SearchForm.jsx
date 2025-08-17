'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'
import {useMain, useStater} from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import styles from '@/app/css/search.module.css'
import Link from 'next/link'
import {useGetProductsQuery} from "@/redux/api/products.api";

export const SearchForm = ({}) => {

    const [text, setText] = useState('')
    const [results, setResults] = useState([]);
    const [showInput, setShowInput] = useState(false);

    const {widthScreen, mobile} = useMain('main');

    const [loading, setLoading] = useState(false) //пока на будущее

    async function getResults() {

        if (text.length < 2) {
            setResults([]);
            return;
        }
        if(!loading) {

           let tempText = text
           let tempLetter = `${tempText[0]}`.toUpperCase()
               tempText = tempLetter + tempText.slice(1)

           if(!tempText) {
               setLoading(false)
               setResults([])
               return
           }

            setLoading(true)
            const fetchSearch = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_SEARCH}?filters[$and][0][stock][$gte]=1&filters[$and][1][title][$startsWith]=${tempText.replaceAll(" ", "")}&sort[0]=title:asc`, {
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`
                }
            })
            const result = await fetchSearch.json();

            if(await result) {
                if(text) {
                    setResults(await result.data)
                    setLoading(false)
                }
            }
        }
    }

    function goToResult() {
        setTimeout(() => {
            setResults([]);
            setText('');
        },100)
    }

    useEffect(() => {},[results])

    useEffect(() => {
        getResults();
    },[text])

    if(!mobile) {
        return(
            <section className = {`${styles.searchContainer}`}>
                <div className={`${styles.searchForm}`}>
                    <div className = {`${styles.searchIcon}`} >
                        <Image unoptimized src = {'/graySearchIcon.svg'} alt = {'Иконка поиска'} fill />
                    </div>
                    <input type = 'text' placeholder = 'Введение название товара...' value = {text} onChange={(e) => {
                        setText(e.target.value)
                        getResults();
                    }} />
                </div>

                {
                    (results && Array.isArray(results) && typeof results[0] != "undefined") ?
                        <section className = {`${styles.searchResultsContainer}`}>
                            {
                                results.map( (item, index) => {
                                    return(
                                        <Link key = {`resultSearch_key_${index}_${item.id}`} onClick = {() => goToResult()} className = {`${styles.resultItem}`} href = {`/routes/shop/products/${item.id}`}>
                                            <h3>{item.attributes.title}</h3>
                                            <p>{(item.attributes.price) ? item.attributes.price : 'Нет цены'}</p>
                                        </Link>
                                    )
                                })
                            }
                        </section>
                        : null
                }
            </section>
        )
    } else {
        return(
            <section className = {`${styles.searchContainer}`}>
                <div
                    onClick = {() => {
                        setShowInput(!showInput)
                    }}
                    className={`${styles.searchForm}`}>
                    <div className = {`${styles.searchIcon}`} >
                        <Image unoptimized src = {'/graySearchIcon.svg'} alt = {'Иконка поиска'} fill />
                    </div>
                </div>
                <article className={`${styles.inputMobileContainer} ${(showInput) ? styles.showInputMobile : styles.hideInputMobile}`}>
                    <input type = 'text' placeholder = 'Введение название товара...' value = {text} onChange={(e) => {
                        setText(e.target.value)
                    }} />
                    {
                        (results && Array.isArray(results) && typeof results[0] != "undefined") ?
                            <section className = {`${styles.searchResultsContainer}`}>
                                {
                                    (results) ?
                                        results.map( (item, index) => {
                                            return(
                                                <Link key = {`resultSearch_key_${index}_${item.id}`} onClick = {() => goToResult()} className = {`${styles.resultItem}`} href = {`/routes/shop/products/${item.id}`}>
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
