import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Pokemon } from './Pokemon';

export const Pokemons = () => {
	const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1118';

	const [loading, setLoading] = useState(true);
	const [term, setTerm] = useState('');
	const [limit, setLimit] = useState(10);
	const [pokemons, setPokemons] = useState({
		count: 0,
		next: '',
		previous: '',
		results: []
	});

	const getData = async () => {
		const res = await axios.get(BASE_URL);
		setPokemons(res.data);
		setLoading(false);
	};

	const loadMore = () => {
		setLoading(true);
		setLimit(prev => prev + 10);
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Head>
				<h1>PokeApi sample</h1>
				<Search autoComplete='off' placeholder='Search...' name='search' onChange={e => setTerm(e.target.value)} />
			</Head>
			<Container>
				<PokemonList>
					{pokemons.results.slice(0, limit).map((pokemon, i) => {
						const { name, url }: { name: string; url: string } = pokemon;
						if (!name.includes(term)) {
							return null;
						}
						return <Pokemon key={i} url={url} />;
					})}
				</PokemonList>
				{!term && <LoadMore onClick={loadMore}>Load More</LoadMore>}
			</Container>
			<GoUp onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>GoUp</GoUp>
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

const GoUp = styled.button`
	position: fixed;
	bottom: 1rem;
	right: 2rem;
	background-color: transparent;
	border: 1px solid white;
	border-radius: 100%;
	padding: 1.2rem;
	color: white;
	font-weight: 700;
	cursor: pointer;
	transition: color 0.2s linear;
	&:hover {
		background-color: white;
		color: #000;
	}
	@media screen and (max-width: 1200px) {
		background-color: white;
		color: #000;
		border-color: var(--main-color);
	}
`;

const Head = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	border-top: 2px solid #1f2127;
`;

const Search = styled.input`
	display: block;
	padding: 0.5rem 1rem;
	font-size: 1.1rem;
	border-radius: 0.5rem;
`;

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
