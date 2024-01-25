import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {getHeight, getWidth} from '../util';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface DropdownProps {
  users: object[];
  setSelectedUserF: () => void;
}

const Dropdown = ({users, setSelectedUserF}: DropdownProps) => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [showFlatlist, setShowFlatList] = useState(false);

  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setShowFlatList(false));
  };

  const toggleFlatList = () => {
    setShowFlatList(!showFlatlist);
    if (!showFlatlist) {
      fadeIn();
    } else {
      fadeOut();
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedUser(item);
        setSelectedUserF(item);
        toggleFlatList();
      }}
      style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (showFlatlist) {
      fadeIn();
    }
  }, [showFlatlist]);

  return (
    <View
      style={[
        styles.main,
        {height: showFlatlist ? getHeight(38) : getHeight(10)},
      ]}>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          onPress={toggleFlatList}
          style={styles.selectedUserContainer}>
          <Text style={styles.selectedUserText}>{selectedUser.name}</Text>
          {showFlatlist ? (
            <Icon name="chevron-up" size={getHeight(3)} color="#a86140" />
          ) : (
            <Icon name="chevron-down" size={getHeight(3)} color="#a86140" />
          )}
        </TouchableOpacity>
        {showFlatlist && (
          <Animated.View
            style={[styles.flatListContainer, {opacity: fadeAnimation}]}>
            <FlatList
              style={styles.flatList}
              data={users.filter(item => item !== selectedUser)}
              renderItem={renderItem}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: getWidth(100),
  },
  dropdownContainer: {
    alignItems: 'center',
    paddingTop: getHeight(1),
  },
  selectedUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: getWidth(2),
    width: getWidth(96),
    alignSelf: 'center',
    padding: getHeight(1.5),
    borderColor: '#a86140',
    backgroundColor: 'rgba(168, 97, 64, 0.3)',
  },
  selectedUserText: {
    fontSize: getWidth(5),
    color: 'rgba(168, 97, 64, 1)',
  },
  flatListContainer: {
    marginTop: getHeight(1),
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: getWidth(96),
    alignSelf: 'center',
    paddingVertical: getHeight(1.5),
    marginBottom: getHeight(0.5),
    borderRadius: getWidth(2),
    borderColor: '#a86140',
  },
  itemText: {
    fontSize: getWidth(5),
    color: 'rgba(168, 97, 64, 0.7)',
  },
});

export default Dropdown;
