/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {FlatList, Keyboard, StyleSheet, TextInput, View} from 'react-native';

import ToDoItem from '../components/TodoComponents/TodoItem';
import ButtonComponent from '../components/general/ButtonComponent';
import {RichText} from '../components/general/RichText';
import Row from '../components/general/Row';
import {Colors, SCREEN, ScreenNames} from '../constants/general';
import Wrapper from '../components/general/Wrapper';
import {useManageTasks} from '../redux/hooks';
import {useNavigation} from '@react-navigation/native';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const {
    tasks,
    addToDoItem,
    deleteToDoItem,
    markCompleted,
    setTextInput,
    textInput,
    editTodoItem,
  } = useManageTasks();
  return (
    <Wrapper>
      <Row styling={styles.heading}>
        <RichText.Head color={Colors.GRAY_60}> Todo Work </RichText.Head>
      </Row>
      <Row styling={{}}>
        <TextInput
          onBlur={() => Keyboard.dismiss()}
          value={textInput ?? ''}
          onChangeText={setTextInput}
          placeholder="Enter your task "
          placeholderTextColor={Colors.GRAY_60}
          style={styles.textInput}
        />
        <ButtonComponent
          styling={styles.addButton}
          customChild={<RichText.Regular>Add</RichText.Regular>}
          onPressAction={() => {
            addToDoItem();
            Keyboard.dismiss();
          }}
          bouncy
        />
      </Row>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={tasks}
        style={styles.flatlistStyle}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={({item, index}) => (
          <ToDoItem
            key={`${index}`}
            item={item}
            toggleDone={markCompleted}
            deleteToDoItem={deleteToDoItem}
            index={index}
            editTodoItem={editTodoItem}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />

      <ButtonComponent
        styling={styles.seeAllButton}
        customChild={<RichText.Head>See All</RichText.Head>}
        //@ts-ignore
        onPressAction={() => navigation.navigate(ScreenNames.SEE_ALL)}
        bouncy
      />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  seeAllButton: {
    backgroundColor: Colors.PRIMARY_100,
    padding: 12,
    borderRadius: 12,
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
  },
  flatlistContainer: {gap: 12, paddingBottom: 100, paddingTop: 8},
  flatlistStyle: {marginTop: 8},
  addButton: {
    backgroundColor: Colors.PRIMARY_100,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  textInput: {
    backgroundColor: Colors.ACCENT_PRIMARY_100,
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: Colors.BLACK,
    flex: 1,
    borderColor: Colors.ACCENT_PRIMARY_DIM,
    borderWidth: 1,
  },
  heading: {paddingVertical: 12},
});
