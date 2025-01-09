// app/detail/[id]/page.tsx

"use client"
import { notFound } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface PropsDetail {
    thoughtDetail: any;
}

const baseURL = 'http://localhost:3000/api'
export default  function Detail(context: { params: { id: string } }) {
    const [thoughtDetail, setThoughtDetail] = useState<PropsDetail>({ thoughtDetail: {} });

    const {id} =  context.params

    const [loading, setLoading] = useState<boolean>(true)

    async function getThoughtDetail() {
        try {
            const response = await fetch(`${baseURL}/thought/${id}`);

            if (!response.ok) {
                throw new Error("Erro ao carregar pensamento!");
            }
            const data = await response.json();
            setThoughtDetail({ thoughtDetail: data });

        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    } 

    useEffect(() => {
        if (id) {
            getThoughtDetail();
        }
    }, [id]);

    return (

            <div>
                {
                    loading ? <p className='text-center mt-40 pt-40 text-white'>Carregando...</p> :(
                        <div className="w-1/2 m-auto mt-40">
                <h1 className="text-3xl font-semibold text-primary-800 mb-4">{thoughtDetail.thoughtDetail.title}</h1>
                <p>{thoughtDetail.thoughtDetail.description}</p>
            </div>
                    )
                }
            </div>

    );
}
