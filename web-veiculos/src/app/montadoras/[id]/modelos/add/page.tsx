"use client"
import { redirect } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ModeloFormData {
    nome: string;
}

interface ModeloProps {
    params: Promise<{ id: number }>;
}

const AddModeloPage: React.FC<ModeloProps> =  ({ params }) => {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<ModeloFormData>();

    const onSubmit = async (data: ModeloFormData) => {

        const mutation = `
            mutation {
                criarModelo(nome : "${data.nome}", idMontadora: ${id}) {
                    id
                }
            }
        `

        try {
            const response = await fetch('http://localhost:4000/graphql',{
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({query: mutation}),
            }
            );

            if (!response.ok) {
                throw new Error('Erro ao cadastrar modelo');
            }
            alert('modelo cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar modelo');
        }
    };

    if (isSubmitSuccessful) {
        redirect(`/montadoras/${id}/modelos`);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Cadastrar Modelo</h1>   
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                    id="nome"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    {...register('nome', { required: 'Nome é obrigatório' })}
                />
                {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cadastrar</button>
            </form>
            </div>
        </div>
    );
};

export default AddModeloPage;