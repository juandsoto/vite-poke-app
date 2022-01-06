import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { PokemonDetails } from './PokemonDetails';
import { Pokemon as IPokemon } from '../interfaces/pokemon.interface';

interface Props {
	url: string;
	children?: JSX.Element | JSX.Element[];
}

export const Pokemon = ({ url, children }: Props) => {
	const [loading, setLoading] = useState(true);
	const [showDetails, SetShowDetails] = useState(false);
	const [pokemon, setPokemon] = useState<IPokemon>();

	useEffect(() => {
		const getData = async () => {
			const res = await axios.get(url);
			setPokemon(res.data);
			setLoading(false);
		};
		getData();
	}, []);

	return (
		<>
			<Item onClick={() => SetShowDetails(true)}>
				{loading ? (
					<p>loading...</p>
				) : (
					<>
						<div style={{ backgroundColor: 'white' }}>
							<img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
						</div>
						<div style={{ padding: '0.8rem' }}>
							<h2>{pokemon?.name.toUpperCase()}</h2>

							{children}
						</div>
					</>
				)}
			</Item>
			{showDetails && <PokemonDetails pokemon={pokemon!} close={SetShowDetails} />}
		</>
	);
};

const Item = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #333;
	border-radius: 10px;
	overflow: hidden;
	flex-grow: 1;
	flex-basis: 12rem;
	cursor: pointer;
	transition: transform 0.2s linear;
	&:hover {
		transform: scale(1.05);
	}
`;
