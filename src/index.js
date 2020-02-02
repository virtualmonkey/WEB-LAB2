// const renderLuz = ({
//     color,
//     size = 200,
//     isTurnedOn = false,
// }) => {
//     const luz = document.createElement('div');
//     luz.style.width = `${size}px`;
//     luz.style.height = `${size}px`;
//     luz.style.borderRadius = `${size / 2}px`;
//     luz.style.backgroundColor = color;
//     luz.style.opacity = isTurnedOn ? 1.0 : 0.25;
//     return luz;
// }


// const render = (mount, state) => {
//     const { turnedOnIndex } = state;

//     const semaforo = document.createElement('div');
//     semaforo.style.backgroundColor = 'black';
//     semaforo.style.width = '200px';
//     semaforo.style.padding = '25px';
//     [
//         'red',
//         'yellow',
//         'green'
//     ].map(
//         (color, index) => renderLuz({
//             color,
//             isTurnedOn: index === turnedOnIndex,
//         }),
//     ).forEach(
//         luz => semaforo.appendChild(luz),
//     );

//     const boton = document.createElement('button');
//     boton.style.width = '250px';
//     boton.style.fontSize = '20px';
//     boton.innerText = 'Siguiente';

//     boton.onclick = () => {
//         state.turnedOnIndex = (state.turnedOnIndex + 1) % 3;
//         root.innerHTML = '';
//         render(root, state);
//     };

//     mount.appendChild(semaforo);
//     mount.appendChild(boton);
// };


const render = (mount, state) => {
    const header = document.createElement('div');
    header.style.backgroundColor='#222222';
	header.style.minWidth = '330px';
	header.style.height = '100px';
	header.style.display = 'flex';
    header.style.flexDirection = 'row'
	header.style.justifyContent = 'center';
	header.style.alignItems = 'center';
    header.style.overflow = 'auto';
    

    const game_name = document.createElement('h1');
	const name_tag = document.createTextNode('OTHELLO')
    game_name.appendChild(name_tag)
    

	game_name.style.backgroundColor = '#222222'
	game_name.style.color = 'white'
	game_name.style.fontSize = '30px';
	game_name.style.marginBottom = '15px';
	header.appendChild(game_name)

	const stage = document.createElement('div');
	stage.style.backgroundColor = '#222222'
	stage.style.minWidth = '330px';
	stage.style.height = '1075px'
	stage.style.display = 'flex';
    stage.style.justifyContent = 'top';
    stage.style.flexDirection = 'column';
    stage.style.alignItems = 'center'

    const game_info = document.createElement('div');
    game_info.style.backgroundColor = '#303030';
    game_info.style.height = '125px';
    game_info.style.width = '600px';
    game_info.style.borderStyle = 'solid';
    game_info.style.borderColor = 'white';
    game_info.style.borderRadius = '4px';


	const board = document.createElement('div');
	board.style.backgroundColor = '#009067'
	board.style.width = '600px';
	board.style.height = '600px';
	board.style.marginTop = '10px';
    board.style.overflow = 'auto'

    stage.appendChild(game_info)
    stage.appendChild(board)

    mount.appendChild(header);
    
    mount.appendChild(stage);
    
}

const APP_STATE = {
    turn: true, // true for player 1, false for player 0
    board: [[0,0,0,0,0,0,0,0], // -1 for white, 0 for blank, 1 for black
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,-1,0,0,0],
			[0,0,0,-1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
		]
};

const root = document.getElementById('root');

render(root, APP_STATE);

