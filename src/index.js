const verifyRight = ({
	value,
	index, //index[0] for rows, index[1] for columns
	state,
	flip,
	checkIndex,
	endIndex
}) => {
	const {turn,board} = state;
	if (flip === false){
		console.log('entered false');
		//if the contigous cell to the right is not equal to the current turn value
		if (board[index[0]][checkIndex] != turn){ 
			//call the function with checkIndex + 1 and do not flip anything
			verifyRight({
				value, 
				index, 
				state, 
				flip: false, 
				checkIndex: checkIndex+1,
			});
		}
		// if the contigous cell to the right is equal to the current turn value
		else if (board[index[0]][checkIndex] == turn){
			const final = checkIndex;
			//call the function with checkIndex = originalIndex+1 and flip = true
			verifyRight({
				value, 
				index, 
				state, 
				flip: true, 
				checkIndex: index[1]+1, 
				endIndex: final
			});
		}
	}
	else if (flip === true){
		console.log('entered true');
		board.map((row, rowIndex) => {
			if (rowIndex == index[0]){
				// console.log(row);
				// console.log(rowIndex);
				// console.log('index[1]', index[1]);
				// console.log('endIndex', endIndex)
				row.map((cellValue, colIndex) => {
					if(colIndex > index[1] && colIndex < endIndex){
						console.log('Se tiene que convertir');
						console.log(colIndex);
						if (turn === false){
							row[colIndex] = 0;
						} else {
							row[colIndex] = 1;
						}
					}
				});
			}
		});
		console.log(board[3]);
		
	}
};
const renderCell = ({
	value,
	index,
	state,
}) => {
	const cell = document.createElement('div')
	cell.style.backgroundColor = '#009067'
	cell.style.borderColor = 'black'
	cell.style.borderStyle = 'solid'
	cell.style.borderWidth = 'thin'
	cell.style.display = 'flex'
	cell.style.alignItems = 'center'
	cell.style.justifyContent = 'center'
	cell.style.width='73px'
	cell.style.height='73px'
	const disc = document.createElement('button')
	disc.style.borderRadius = '50%'
	disc.style.width = '85%'
	disc.style.height = '85%'
	disc.style.borderStyle = 'none'

	if(value===-1){
		disc.style.backgroundColor = '#009067'
	}
	else if(value===0){
		disc.style.backgroundColor = 'white'
	}
	else if(value===1){
		disc.style.backgroundColor = 'black'
	}

	disc.onclick = () => {
		const { board } = state;
		console.log('wohooo')
		// verify if it is allowed to put disc in clicked cell
		// update state, filling with a 0 for white or 1 for black in the board
		board[index[0]][index[1]] = (state.turn) ? 1 : 0;
		console.log(verifyRight({
			value: value,
			index: index,
			state: state,
			flip: false,
			checkIndex: index[1] + 1,
			endIndex: 0
		}));

		// check discs in right
				
		state.turn = !state.turn;		
		root.innerHTML = '';
		render(root, state);//Restart the game
	};

	cell.appendChild(disc)
	return cell
	
}

const render = (mount, state) => {
	// header instance
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
	const name_tag = document.createTextNode('OTHELLO');
	game_name.style.fontFamily = 'Courier New';
	game_name.style.fontSize = 'large';
    game_name.appendChild(name_tag)
    

	game_name.style.backgroundColor = '#222222'
	game_name.style.color = 'white'
	game_name.style.fontSize = '35px';
	game_name.style.marginBottom = '15px';
	header.appendChild(game_name)

	// stage instance, stage has everything but header
	const stage = document.createElement('div');
	stage.style.backgroundColor = '#222222'
	stage.style.minWidth = '330px';
	stage.style.height = '1075px'
	stage.style.display = 'flex';
    stage.style.justifyContent = 'top';
    stage.style.flexDirection = 'column';
    stage.style.alignItems = 'center'

	// game_info is the gray div that shows the state of the game
    const game_info = document.createElement('div');
    game_info.style.backgroundColor = '#303030';
    game_info.style.height = '125px';
    game_info.style.width = '600px';
    game_info.style.borderStyle = 'solid';
    game_info.style.borderColor = 'white';
	game_info.style.borderRadius = '4px';
	game_info.style.display = 'flex'
	game_info.style.flexDirection = 'row'
	game_info.style.flexWrap = 'wrap'
	game_info.justifyContent = 'space-evenly'

	// logic to count the current number of discs of each player
	let whiteCount = 0;
	let blackCount = 0;
	state.board.map((row) => {
		row.map((column) => {
			if(column==0){
				whiteCount += 1;
			}
			else if(column==1){
				blackCount += 1;
			}
		})
	})

	// black_board shows the black_dot circle and the black player count
	const black_board = document.createElement('div');
	black_board.style.backgroundColor = '#303030'
	black_board.style.height = '75px'
	black_board.style.width = '300px'
	black_board.style.display = 'flex'
	black_board.style.flexDirection = 'row'
	black_board.style.justifyContent = 'center'
	black_board.style.alignItems ='center'

	// black_dot is a circular div
	const black_dot = document.createElement('div');
	black_dot.style.backgroundColor = 'black';
	black_dot.style.height = '50px';
	black_dot.style.width = '50px';
	black_dot.style.borderRadius = '50%';

	// black_count shows how many disks the black player has in the board
	const black_count = document.createElement('h1');
	black_count.style.color = 'white'
	black_count.style.margin = '5px'
	black_count.style.fontFamily = 'Courier New'
	const count_textNode_black = document.createTextNode(blackCount);
    black_count.appendChild(count_textNode_black);
	
	black_board.appendChild(black_dot);
	black_board.appendChild(black_count);

	// white_board shows the white_dot circle and the white player count
	const white_board = document.createElement('div');
	white_board.style.backgroundColor = '#303030'
	white_board.style.height = '75px'
	white_board.style.width = '300px'
	white_board.style.display = 'flex'
	white_board.style.flexDirection = 'row'
	white_board.style.justifyContent = 'center'
	white_board.style.alignItems ='center'

	// white_dot is a circular div
	const white_dot = document.createElement('div');
	white_dot.style.backgroundColor = 'white';
	white_dot.style.height = '50px';
	white_dot.style.width = '50px';
	white_dot.style.borderRadius = '50%';

	// white_count shows how many disks the white player has in the board
	const white_count = document.createElement('h1');
	white_count.style.color = 'white'
	white_count.style.margin = '5px'
	white_count.style.fontFamily = 'Courier New'
	const count_textNode_white = document.createTextNode(whiteCount);
	white_count.appendChild(count_textNode_white);
	
	white_board.appendChild(white_dot);
	white_board.appendChild(white_count);
	
	const turn_board = document.createElement('div');
	turn_board.style.backgroundColor = '#303030'
	turn_board.style.height = '50px'
	turn_board.style.width = '600px'
	turn_board.style.display = 'flex'
	turn_board.style.justifyContent = 'center'
	turn_board.style.alignItems = 'center'
	
	const turn_text = document.createElement('h1');
	turn_text.style.color = 'white';
	turn_text.style.fontFamily = 'Courier New'
	turn_text.style.fontSize = 'large'
	const turn = (state.turn) ? 'BLACK' : 'WHITE';
	const turn_textNode = document.createTextNode('TURN: ' + turn);

	turn_text.appendChild(turn_textNode);
	turn_board.appendChild(turn_text);
	
	game_info.appendChild(black_board);
	game_info.appendChild(white_board);
	game_info.appendChild(turn_board);




	const board = document.createElement('div');
	board.style.backgroundColor = '#009067'
	board.style.width = '600px';
	board.style.height = '600px';
	board.style.marginTop = '10px';
	board.style.overflow = 'auto'
	
	
    stage.appendChild(game_info)
    stage.appendChild(board)

	state.board.map((row, rowIndex) =>
		row.map((column,columnIndex) => renderCell({
			value: column,
			index: [rowIndex,columnIndex],
			state: state
		}))).map(singleRow =>{	
			const rowElement = document.createElement('div')
			rowElement.style.display = 'flex'
			rowElement.style.justifyContent = 'center'
			singleRow.map(
				cell => rowElement.appendChild(cell),
			)
			board.appendChild(rowElement)
	});

    mount.appendChild(header);
	mount.appendChild(stage);   
}

const APP_STATE = {
    turn: true, // false for white, true for black
    board: [[-1,-1,-1,-1,-1,-1,-1,-1], // '0 for white, -1 for blank, 1 for black
			[-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,0,1,-1,-1,-1],
			[-1,-1,-1,1,0,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1]
		]
};

const root = document.getElementById('root');

render(root, APP_STATE);

