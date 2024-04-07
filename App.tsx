import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert } from 'react-native';

const emptyBoard = Array.from(Array(3), () => Array(3).fill(''));

const X_IMAGE = require('./assets/x_image.png');
const O_IMAGE = require('./assets/o_image.png');

const App = () => {
  const [board, setBoard] = useState<string[][]>(emptyBoard);
  const [player, setPlayer] = useState<'X' | 'O'>('X');

  const checkWinner = (board: string[][]): string | null => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return board[i][0];
      }
    }

    for (let i = 0; i < 3; i++) {
      if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        return board[0][i];
      }
    }

    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return board[0][2];
    }

    return null;
  };

  const handleCellPress = (row: number, col: number) => {
    if (board[row][col] === '') {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = player;
      setBoard(newBoard);

      const winner = checkWinner(newBoard);
      if (winner) {
        Alert.alert(`${winner} wins!`, 'Play again?', [{ text: 'OK', onPress: resetGame }]);
      } else if (newBoard.flat().every(cell => cell !== '')) {
        Alert.alert('Draw!', 'Play again?', [{ text: 'OK', onPress: resetGame }]);
      } else {
        setPlayer(player === 'X' ? 'O' : 'X');
      }
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setPlayer('X');
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity key={`${rowIndex}-${colIndex}`} style={styles.cell} onPress={() => handleCellPress(rowIndex, colIndex)}>
                {cell === 'X' && <Image source={X_IMAGE} style={styles.image} />}
                {cell === 'O' && <Image source={O_IMAGE} style={styles.image} />}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.playerText}>{`Player ${player}'s turn`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  board: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  image: {
    width: 50,
    height: 50,
  },
  playerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
