import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Pokemon } from './Pokemon';

export const Pokemons = () => {
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
	const [loading, setLoading] = useState(true);
	const [pokemons, setPokemons] = useState({
		count: 0,
		next: '',
		previous: '',
		results: []
	});

	const getData = async () => {
		const res = await axios.get(url);
		setPokemons(prev => {
			return {
				...res.data,
				results: [...prev.results, ...res.data.results]
			};
		});
		setLoading(false);
	};

	const loadMore = () => {
		setLoading(true);
		setUrl(pokemons.next);
	};

	useEffect(() => {
		getData();
	}, [url]);

	return (
		<>
			<Container>
				<PokemonList>
					{pokemons.results.map(({ url }, i) => (
						<Pokemon key={i} url={url} />
					))}
				</PokemonList>
				<LoadMore onClick={loadMore}>Load More</LoadMore>
			</Container>
			{loading && <Loading />}
		</>
	);
};

const Loading = () => {
	return (
		<LoadingPokemons>
			Loading more pokemons
			<br />
			Please wait...
		</LoadingPokemons>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem 10rem;
	gap: 2rem;
	transition: padding 0.2s linear;
	@media screen and (max-width: 1200px) {
		padding: 2rem 5rem;
	}
	@media screen and (max-width: 768px) {
		padding: 2rem 2rem;
	}
`;

const PokemonList = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	gap: 0.8rem;
	align-items: stretch;
`;

const LoadingPokemons = styled.div`
	position: fixed;
	right: 2rem;
	bottom: 1rem;
	background-color: var(--main-color);
	border-radius: 5px;
	color: white;
	font-size: 1.2rem;
	padding: 1rem 2rem;
	animation: 0.4s slideLeft;
	@keyframes slideLeft {
		from {
			right: -18rem;
		}
		to {
			right: 2rem;
		}
	}
`;

const LoadMore = styled.button`
	padding: 0.8rem;
	border-radius: 10px;
	border: 2px solid white;
	cursor: pointer;
	font-size: 1.1rem;
	transition: all 0.2s linear;
	&:hover {
		background-color: transparent;
		color: white;
	}
	@media screen {
	}
`;
