import { Pokemon } from '../interfaces/pokemon.interface';
import styled from 'styled-components';
import { useState } from 'react';

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
						<List as='div'>
							<Title>
								<H1>{pokemon.name}</H1>
								<Img sprites={sprites} />
							</Title>
						</List>
						<List>
							<H1 as='h2'>Abilities</H1>
							{pokemon?.abilities.map(({ ability }, abilityIdx) => (
								<Ability key={abilityIdx}>{ability.name}</Ability>
							))}
						</List>
						<List>
							<H1 as='h2'>Main Attacks</H1>
							{pokemon.moves.slice(0, 5).map((item, moveIdx) => (
								<Ability key={moveIdx}>{item.move.name}</Ability>
							))}
						</List>
					</Item>

					{/* <Evolutions>
						<Evolution/>	
					<Evolutions/> */}

					{/* <Pokemon /> */}

					<Close onClick={() => close(false)}>x</Close>
				</Details>
			</Layout>
		</>
	);
};

const Layout = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	&::before {
		content: '';
		background-color: var(--main-color);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0.6;
	}
`;
const Details = styled.div`
	position: relative;
	width: 60vw;
	min-height: 75vh;
	color: #000;
	z-index: 9;
	@media screen and (max-width: 768px) {
		width: 90vw;
		height: 90vh;
	}
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	gap: 0.5rem;
	border-radius: 0.5rem;
	flex-wrap: wrap;
	padding: 3rem 1.5rem;
	background-color: rgba(255, 255, 255, 0.9);
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Image = styled.img`
	/* border: 1px solid var(--main-color); */
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
const List = styled.ul`
	list-style: none;
	text-transform: capitalize;
	padding: 0 0.8rem;
`;
const Ability = styled.li``;

const Close = styled.button`
	position: absolute;
	font-size: 3rem;
	background-color: transparent;
	top: 0rem;
	right: 1rem;
	cursor: pointer;
`;

const H1 = styled.h1`
	text-transform: capitalize;
	color: var(--main-color);
	padding-bottom: 0.5rem;
`;
