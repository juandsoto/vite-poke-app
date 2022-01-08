import { Pokemon } from '../interfaces/pokemon.interface';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Evolution } from '../interfaces/evolution.interface';

interface Props {
	pokemon: Pokemon;
	close: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Img = ({ sprites }: { sprites: any }) => {
	const [index, setIndex] = useState(0);

	const toggleImage = () => {
		if (index === sprites.length - 1) {
			setIndex(0);
			return;
		}
		setIndex(index + 1);
	};
	return <Image onClick={toggleImage} src={sprites[index]} alt={'pokemon image'} />;
};

export const PokemonDetails = ({ pokemon, close }: Props) => {
	const sprites: string[] = [pokemon.sprites.front_default, pokemon.sprites.back_default];

	return (
		<>
			<Layout>
				<Details>
					<Item>
						<List>
							<h1>{pokemon.name}</h1>
							<Img sprites={sprites} />
						</List>
					</Item>

					<Container>
						<Item>
							<List>
								<h2>Types</h2>
								{pokemon.types.map(({ type }, typeIdx) => (
									<ListItem key={typeIdx}>{type.name}</ListItem>
								))}
							</List>
						</Item>
						<Item>
							<List>
								<h2>Abilities</h2>
								{pokemon?.abilities.map(({ ability }, abilityIdx) => (
									<ListItem key={abilityIdx}>{ability.name}</ListItem>
								))}
							</List>
						</Item>
						<Item>
							<List>
								<h2>Main Attacks</h2>
								{pokemon.moves.slice(0, 5).map(({ move }, moveIdx) => (
									<ListItem key={moveIdx}>{move.name}</ListItem>
								))}
							</List>
						</Item>
					</Container>
					<Close onClick={() => close(false)}>x</Close>
				</Details>
			</Layout>
		</>
	);
};

const Layout = styled.div`
	position: fixed;
	overflow-y: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	&::before {
		content: '';
		background-color: var(--main-color);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0.6;
	}
`;

const Details = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 8rem;
	width: 60vw;
	min-height: 75vh;
	color: #000;
	z-index: 9;
	@media screen and (max-width: 768px) {
		width: 90vw;
		height: 90vh;
		gap: 0.5rem;
	}
`;

const Item = styled.div`
	display: flex;
	flex-shrink: 0;
	align-items: start;
	justify-content: center;
	border-radius: 0.5rem;
	padding: 3rem 1.5rem;
	background-color: rgba(255, 255, 255, 0.9);
`;

const Image = styled.img`
	border-radius: 40%;
	width: 9rem;
	height: 9rem;
	cursor: pointer;
	animation: spin 3s forwards infinite;
	@keyframes spin {
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: start;
	gap: 4rem;
	@media screen and (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	text-transform: capitalize;
	padding: 0 0.8rem;
	text-transform: capitalize;
	color: var(--main-color);
	gap: 0.5rem;
`;

const ListItem = styled.li``;

const Close = styled.button`
	position: absolute;
	font-size: 3rem;
	background-color: transparent;
	top: 0rem;
	right: 1rem;
	cursor: pointer;
`;
