"use client"

export default async function ButtonRemover({id_montadora}: {id_montadora: number}){

    async function removerMontadora(){
        let mutationRMV = `
        mutation{
            deletarMontadora (id: ${id_montadora}){
                id
            }
        }
        `
        const response = await fetch('http://localhost:4000/graphql',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({query: mutationRMV}),
        });

        if (!response.ok) {
            throw new Error('Erro ao apagar montadoras');
        }
    }
    
    return (
        <button onClick = {removerMontadora}>Remover Montadora</button>
    )
}