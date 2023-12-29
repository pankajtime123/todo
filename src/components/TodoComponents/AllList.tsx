import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {TypeToDoItem} from '../../redux/hooks';
import Row from '../general/Row';
import {RichText} from '../general/RichText';
import {Colors} from '../../constants/general';
import RNVectorIcons from '../general/RNVectorIcons';

const AllList = ({list}: {list: TypeToDoItem[]}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={list}
      style={styles.flatlistStyle}
      contentContainerStyle={styles.flatlistContainer}
      renderItem={({item, index}: {item: TypeToDoItem; index: number}) => (
        <LisItem key={`${index}`} item={item} />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default AllList;

const LisItem = ({item}: {item: TypeToDoItem}) => {
  const isDone = item?.done;

  return (
    <View style={styles.listItem}>
      <Row styling={styles.listItemRow}>
        <RichText.Medium color={Colors.PRIMARY_500}>
          {item?.text}
        </RichText.Medium>
        <RNVectorIcons
          iconSet={isDone ? 'AntDesign' : 'MaterialIcons'}
          iconCode={isDone ? 'checkcircle' : 'pending-actions'}
          iconSize={20}
          iconColor={Colors.PRIMARY_100}
        />
      </Row>
      <Row styling={styles.listItemRow}>
        {[
          new Date(item?.time).toDateString(),
          isDone ? 'completed' : 'active',
        ].map(value => {
          return (
            <RichText.Regular fontSize={12} color={Colors.GRAY_70}>
              {value}
            </RichText.Regular>
          );
        })}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistStyle: {marginTop: 16},
  flatlistContainer: {gap: 12, paddingBottom: 20},
  listItem: {
    backgroundColor: Colors.ACCENT_PRIMARY_50,
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  listItemRow: {justifyContent: 'space-between'},
});
