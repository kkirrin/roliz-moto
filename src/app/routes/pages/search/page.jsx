'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { ProductCard } from '@/app/components/shop/ProductCard';
import { Loader } from '@/app/components/micro/Loader';
import Breadcrumbs from '@/app/components/micro/Breadcrumbs';
import styles from '@/app/css/search.module.css';

export default function SearchResultsPage() {
    return (
        <Suspense>
            <SearchResultsContent />
        </Suspense>
    )
}

function SearchResultsContent() {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!query) return;

                setIsLoading(true);
                let tempText = query
                let tempLetter = `${tempText[0]}`.toUpperCase()
                tempText = tempLetter + tempText.slice(1)

                const fetchSearch = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_SEARCH}?filters[$and][0][stock][$gte]=1&filters[$and][1][title][$startsWith]=${tempText.replaceAll(" ", "")}&sort[0]=title:asc`, {
                    headers: {
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`
                    }
                })
                const result = await fetchSearch.json();
                setDataList(result?.data || []);
            } catch (error) {
                console.error('Ошибка в работе поиска:', error);
                setDataList([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [query]);

    if (isLoading) {
        return (
            <section className={styles.searchResultsSection}>
                <div className="container mx-auto px-4 py-8">
                    <Loader />
                </div>
            </section>
        );
    }

    return (
        <section className={styles.searchResultsSection}>
            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs />

                <h1 className="text-3xl font-semibold mb-6">
                    Результаты поиска для: {query}
                </h1>

                {dataList.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            По вашему запросу &ldquo;{query}&rdquo; ничего не найдено
                        </p>
                        <p className="text-gray-400 mt-2">
                            Попробуйте изменить поисковый запрос
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-6">
                            Найдено товаров: {dataList.length}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[30px]">
                            {dataList.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    viewMode="grid"
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}