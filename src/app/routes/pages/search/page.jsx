'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

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

    return (
        <section>
            <div className="container">
                <h1>Результаты поиска для: {query}</h1>

            </div>
        </section>
    );
}