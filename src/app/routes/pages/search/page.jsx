'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';

export default function SearchResultsPage() {
    return (
        <Suspense>
            <SearchResultsContent />
        </Suspense>
    )
}

function SearchResultsContent() {
    const [dataList, setDataList] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    console.log('dataList', dataList);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!query) return;

                let tempText = query
                let tempLetter = `${tempText[0]}`.toUpperCase()
                tempText = tempLetter + tempText.slice(1)

                const fetchSearch = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_SEARCH}?filters[$and][0][stock][$gte]=1&filters[$and][1][title][$startsWith]=${tempText.replaceAll(" ", "")}&sort[0]=title:asc`, {
                    headers: {
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`
                    }
                })
                const result = await fetchSearch.json();
                setDataList(result?.data);

            } catch (error) {
                console.error('Ошибка в работе поиска:', error);
            }
        };

        fetchData();
    }, [query]);

    return (
        <section>
            <div className="container">
                <h1>Результаты поиска для: {query}</h1>

            </div>
        </section>
    );
}