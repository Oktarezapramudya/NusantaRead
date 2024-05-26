// import { View, Text } from 'react-native';

// const Home = () => {
//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   );
// };

// export default Home;
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, SafeAreaView, FlatList } from 'react-native';
import { styles } from './style';
import { textView } from '../../ui/textView';
import SearchBar from './SearchItems/index';
import DetailItem from './DetailItems/index';
import * as string from '../../resources/string';
import ItemsType from './itemsType/index';

const index = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [visible, setVisible] = useState(false);
  const [detailItem, setDetailItem] = useState({});
  const [typeName, setTypeName] = useState('');

  const getTypeValue = (value) => {
    setTypeName(value);
  };

  const getSearchItemResult = (searchItems) => {
    setSearchResult(searchItems);
  };

  console.disableYellowBox = true;
  const openModal = (item) => {
    setVisible(true);
    setDetailItem(item);
  };

  const dissmissModal = () => {
    setVisible(false);
  };

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.storeItem}
        onPress={() => openModal(item)}
      >
        <View style={styles.columnFlex}>
          <Image
            style={styles.imageNewFeed}
            source={item.imageLinks !== undefined ? { uri: item.imageLinks.thumbnail } : require('../../resources/assets/chooseimage.jpg')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.columnFlex}>
          <Text style={textView.txtinfoSecond}>Title: {item.title}</Text>
          <Text style={textView.txtinfoSecond}>Author: {item.authors !== undefined || item.authors > 0 ? item.authors : string.NO_INFO}</Text>
          <Text style={textView.txtinfoSecond}>Page: {item.pageCount !== undefined ? item.pageCount : string.NO_INFO}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <SearchBar
        callBackSearchResult={getSearchItemResult}
        typeName={typeName}
      />
      <View>
        <DetailItem
          isVisible={visible}
          item={detailItem}
          dissmiss={dissmissModal}
        />
        <ItemsType setTypeName={getTypeValue} />
        <FlatList
          style={styles.itemList}
          data={!(searchResult === undefined || searchResult.length === 0) ? searchResult : []}
          keyboardShouldPersistTaps="handled"
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default index;
